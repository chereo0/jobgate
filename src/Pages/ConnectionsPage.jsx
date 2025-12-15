import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Button,
    TextField,
    InputAdornment,
    Chip,
    CircularProgress,
} from '@mui/material';
import {
    Search as SearchIcon,
    PersonAdd as PersonAddIcon,
    Check as CheckIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import { getSuggestedUsersAPI, sendConnectionRequestAPI } from '../api/ConnectionAPI';
import { toast } from 'react-toastify';

export default function ConnectionsPage() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [pendingRequests, setPendingRequests] = useState(new Set());

    useEffect(() => {
        fetchSuggestedUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchQuery, users]);

    const fetchSuggestedUsers = async () => {
        try {
            const data = await getSuggestedUsersAPI();
            setUsers(data);
            setFilteredUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
            setLoading(false);
        }
    };

    const filterUsers = () => {
        if (!searchQuery.trim()) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.headline && user.headline.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredUsers(filtered);
    };

    const handleSendRequest = async (userId) => {
        try {
            await sendConnectionRequestAPI(userId);
            setPendingRequests(new Set([...pendingRequests, userId]));
            toast.success('Connection request sent');
        } catch (error) {
            console.error('Error sending request:', error);
            toast.error(error.message || 'Failed to send request');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress sx={{ color: '#2FA4A9' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#4A4A4A' }}>
                    My Network
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Connect with professionals and grow your network
                </Typography>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Search people..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#7A7A7A' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        maxWidth: 600,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#FFFFFF',
                            '&:hover fieldset': {
                                borderColor: '#2FA4A9',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#2FA4A9',
                            },
                        },
                    }}
                />
            </Box>

            {/* Stats */}
            <Box sx={{ mb: 3 }}>
                <Chip
                    icon={<PeopleIcon />}
                    label={`${filteredUsers.length} people to connect with`}
                    sx={{
                        backgroundColor: '#AEE3E6',
                        color: '#2FA4A9',
                        fontWeight: 600,
                        px: 1,
                    }}
                />
            </Box>

            {/* User Cards */}
            {filteredUsers.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <PeopleIcon sx={{ fontSize: 64, color: '#E5E7EB', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        {searchQuery ? 'No users found' : 'No suggestions available'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {searchQuery ? 'Try a different search term' : 'Check back later for new connections'}
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredUsers.map((user) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 24px rgba(47, 164, 169, 0.15)',
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                                    {/* Avatar */}
                                    <Avatar
                                        src={user.imageLink}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            margin: '0 auto',
                                            mb: 2,
                                            backgroundColor: '#2FA4A9',
                                            fontSize: '2rem',
                                        }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </Avatar>

                                    {/* Name */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 0.5,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {user.name}
                                    </Typography>

                                    {/* Headline */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 2,
                                            minHeight: 40,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {user.headline || 'Professional'}
                                    </Typography>

                                    {/* Connect Button */}
                                    {pendingRequests.has(user._id) ? (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            disabled
                                            startIcon={<CheckIcon />}
                                            sx={{
                                                borderColor: '#2FA4A9',
                                                color: '#2FA4A9',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Pending
                                        </Button>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<PersonAddIcon />}
                                            onClick={() => handleSendRequest(user._id)}
                                            sx={{
                                                background: 'linear-gradient(135deg, #2FA4A9 0%, #5BC0BE 100%)',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                boxShadow: '0 4px 12px rgba(47, 164, 169, 0.3)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #258A8E 0%, #4AABAD 100%)',
                                                },
                                            }}
                                        >
                                            Connect
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
