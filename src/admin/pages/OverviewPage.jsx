import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    CircularProgress,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    Business as BusinessIcon,
    Work as WorkIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { getAllUsersAPI, getAllCompanies } from '../../api/AuthAPI';
import { toast } from 'react-toastify';

const QuickStatCard = ({ title, value, icon, color, loading }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {title}
                    </Typography>
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <Typography variant="h4" sx={{ fontWeight: 700, color: color || 'primary.main' }}>
                            {value}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        backgroundColor: `${color || '#0f172a'}15`,
                        borderRadius: 2,
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const RecentActivity = ({ activities, loading }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : activities.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        No recent activity
                    </Typography>
                ) : (
                    activities.map((activity, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                py: 1.5,
                                borderBottom: index < activities.length - 1 ? '1px solid #e5e7eb' : 'none',
                            }}
                        >
                            <CheckCircleIcon sx={{ color: 'success.main', fontSize: '1.2rem' }} />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {activity.action}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {activity.time}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </CardContent>
    </Card>
);

export default function OverviewPage() {
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [usersData, companiesData] = await Promise.all([
                    getAllUsersAPI(),
                    getAllCompanies()
                ]);

                setUsers(usersData);
                setCompanies(companiesData);

                // Generate recent activities from latest users
                const activities = [];
                const sortedUsers = [...usersData].sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                ).slice(0, 5);

                sortedUsers.forEach(user => {
                    const timeAgo = getTimeAgo(new Date(user.createdAt));
                    if (user.role === 'company') {
                        activities.push({
                            action: `New company registered: ${user.name}`,
                            time: timeAgo
                        });
                    } else {
                        activities.push({
                            action: `New user registered: ${user.name}`,
                            time: timeAgo
                        });
                    }
                });

                setRecentActivities(activities);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load dashboard data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    const candidatesCount = users.filter(u => u.role === 'candidate').length;
    const companiesCount = companies.length;

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 1, color: 'primary.main' }}>
                Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Welcome to JobGate Admin. Here's what's happening today.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <QuickStatCard
                        title="Total Users"
                        value={users.length.toLocaleString()}
                        icon={<PeopleIcon sx={{ fontSize: 32, color: '#0f172a' }} />}
                        color="#0f172a"
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <QuickStatCard
                        title="Companies"
                        value={companiesCount.toLocaleString()}
                        icon={<BusinessIcon sx={{ fontSize: 32, color: '#3b82f6' }} />}
                        color="#3b82f6"
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <QuickStatCard
                        title="Candidates"
                        value={candidatesCount.toLocaleString()}
                        icon={<PeopleIcon sx={{ fontSize: 32, color: '#10b981' }} />}
                        color="#10b981"
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <QuickStatCard
                        title="Active Jobs"
                        value="0"
                        icon={<TrendingUpIcon sx={{ fontSize: 32, color: '#f59e0b' }} />}
                        color="#f59e0b"
                        loading={false}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Platform Growth
                            </Typography>
                            <Box
                                sx={{
                                    height: 300,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f9fafb',
                                    borderRadius: 2,
                                    mt: 2,
                                }}
                            >
                                <Typography variant="body1" color="text.secondary">
                                    📊 Chart visualization would go here
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <RecentActivity activities={recentActivities} loading={loading} />
                </Grid>
            </Grid>
        </Box>
    );
}
