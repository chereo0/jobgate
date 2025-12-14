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
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { getFeaturedCompaniesAPI } from "../api/AuthAPI";
import { getAllPostsAPI } from "../api/PostAPI";
import { useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import WhatIsJobGate from "./WhatIsJobGate";
import Footer from "./Footer";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: 280,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 32px rgba(47, 164, 169, 0.2)",
          borderColor: "#2FA4A9",
        },
      }}
    >
      <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1 }}>
          {company.imageLink ? (
            <Avatar
              src={company.imageLink}
              sx={{
                width: 60,
                height: 60,
                mb: 1.5,
                border: "3px solid #2FA4A9",
                boxShadow: "0 4px 12px rgba(47, 164, 169, 0.3)",
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mb: 1.5,
                background: "linear-gradient(135deg, #2FA4A9 0%, #5BC0BE 100%)",
                fontSize: "1.5rem",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(47, 164, 169, 0.3)",
              }}
            >
              {company.name?.charAt(0).toUpperCase()}
            </Avatar>
          )}

          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: "#4A4A4A", lineHeight: 1.2 }}>
            {company.name}
          </Typography>

          <Chip
            label={company.category || "Company"}
            size="small"
            sx={{
              mb: 1,
              backgroundColor: "#AEE3E6",
              color: "#2FA4A9",
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 22,
            }}
          />

          {company.location && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
              <LocationIcon sx={{ fontSize: 14, color: "#7A7A7A" }} />
              <Typography variant="caption" sx={{ color: "#7A7A7A", fontWeight: 500 }}>
                {company.location}
              </Typography>
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="small"
          onClick={() => navigate(`/company-profile/${company._id}`)}
          sx={{
            backgroundColor: "#2FA4A9",
            textTransform: "none",
            fontWeight: 600,
            py: 1,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(47, 164, 169, 0.3)",
            "&:hover": {
              backgroundColor: "#258A8E",
              boxShadow: "0 6px 16px rgba(47, 164, 169, 0.4)",
            },
          }}
        >
          View Company
        </Button>
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
        getFeaturedCompaniesAPI(),
        getAllPostsAPI(),
      ]);
      setCompanies(companiesData);
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    fetchData(); // Refresh posts after creating new one
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#2FA4A9" }} />
      </Box>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Featured Companies - Full Width Row */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TrendingUpIcon sx={{ color: "#2FA4A9" }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#4A4A4A" }}>
                Featured Companies
              </Typography>
            </Box>
            <Button
              variant="text"
              onClick={() => navigate('/companies')}
              sx={{ color: "#2FA4A9", textTransform: "none", fontWeight: 600 }}
            >
              View All
            </Button>
          </Box>

          {companies.length === 0 ? (
            <Card sx={{ p: 4, textAlign: "center", borderRadius: 3, border: "1px solid #E5E7EB" }}>
              <BusinessIcon sx={{ fontSize: 48, color: "#E5E7EB", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                No companies available
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {companies.slice(0, 5).map((company) => (
                <Grid item xs={12} sm={6} md={2.4} key={company._id}>
                  <CompanyCard company={company} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Main Feed */}
        <Box>
          {/* Create Post Section */}
          <CreatePost currentUser={currentUser} onPostCreated={handlePostCreated} />

          {/* Posts Feed */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#4A4A4A" }}>
            Recent Posts
          </Typography>

          {posts.length === 0 ? (
            <Card sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No posts yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Be the first to share something!
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    currentUserId={currentUser?._id}
                    onUpdate={fetchData}
                  />
                ))}
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>

      {/* What is JobGate Section - Outside Container for better performance */}
      <WhatIsJobGate />

      {/* Footer - Outside Container */}
      <Footer />
    </Box >
  );
}
