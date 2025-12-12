import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { getFeaturedCompaniesAPI, getAllPostsAPI } from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {company.imageLink ? (
            <Avatar
              src={company.imageLink}
              sx={{ width: 80, height: 80, mb: 2, border: "3px solid #2FA4A9" }}
            />
          ) : (
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mb: 2,
                backgroundColor: "#2FA4A9",
                fontSize: "2rem",
              }}
            >
              {company.name?.charAt(0).toUpperCase()}
            </Avatar>
          )}

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {company.name}
          </Typography>

          <Chip
            label={company.category || "Company"}
            size="small"
            sx={{
              mb: 2,
              backgroundColor: "#AEE3E6",
              color: "#2FA4A9",
              fontWeight: 500,
            }}
          />

          {company.location && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {company.location}
              </Typography>
            </Box>
          )}

          {company.about && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                mb: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {company.about}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(`/company-profile/${company._id}`)}
            sx={{
              mt: 2,
              backgroundColor: "#2FA4A9",
              "&:hover": {
                backgroundColor: "#258A8E",
              },
            }}
          >
            View Company
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {post.authorImage ? (
            <Avatar src={post.authorImage} />
          ) : (
            <Avatar sx={{ backgroundColor: "#0a66c2" }}>
              {post.authorName?.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {post.authorName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.createdAt)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
          {post.description}
        </Typography>

        {post.image && (
          <Box
            component="img"
            src={post.image}
            alt="Post"
            sx={{
              width: "100%",
              maxHeight: 400,
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
            }}
          />
        )}

        <Box sx={{ display: "flex", gap: 3, pt: 2, borderTop: "1px solid #e5e7eb" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ThumbUpIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {post.likes?.length || 0}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CommentIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {post.comments?.length || 0}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function HomeComponent({ currentUser }) {
  const [companies, setCompanies] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [companiesData, postsData] = await Promise.all([
        getFeaturedCompaniesAPI(6),
        getAllPostsAPI(),
      ]);
      setCompanies(companiesData);
      setPosts(postsData.slice(0, 10)); // Show only 10 recent posts
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#0a66c2",
              mb: 2,
            }}
          >
            Welcome to JobGate
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover amazing companies and connect with professionals
          </Typography>
        </Box>

        {/* Featured Companies Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <TrendingUpIcon sx={{ fontSize: 32, color: "#0a66c2" }} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Featured Companies
            </Typography>
          </Box>

          {companies.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: "center", py: 8 }}>
                <BusinessIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No companies available yet
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {companies.map((company) => (
                <Grid item xs={12} sm={6} md={4} key={company._id}>
                  <CompanyCard company={company} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Recent Posts Section */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <CommentIcon sx={{ fontSize: 32, color: "#0a66c2" }} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Recent Posts
            </Typography>
          </Box>

          {posts.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: "center", py: 8 }}>
                <CommentIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No posts available yet
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ position: "sticky", top: 20 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Quick Actions
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate("/register")}
                      sx={{ mb: 2 }}
                    >
                      Join JobGate
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}
