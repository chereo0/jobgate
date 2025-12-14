import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    LinearProgress,
    Avatar,
    CircularProgress,
} from '@mui/material';
import {
    Work as WorkIcon,
    People as PeopleIcon,
    Visibility as VisibilityIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { getDashboardStatsAPI, getTopPerformingJobsAPI, getRecentApplicationsAPI } from '../../api/CompanyAPI';
import { toast } from 'react-toastify';

const StatCard = ({ title, value, subtitle, icon, color }) => (
    <Card
        sx={{
            height: '100%',
            borderRadius: 3,
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(47, 164, 169, 0.15)',
                borderColor: '#2FA4A9',
            }
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: '#7A7A7A',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            letterSpacing: '0.5px',
                            mb: 1,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: color || '#2FA4A9',
                            mb: 0.5,
                            fontSize: '2.25rem',
                        }}
                    >
                        {value}
                    </Typography>
                    {subtitle && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#7A7A7A',
                                fontWeight: 500,
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        background: `linear-gradient(135deg, ${color || '#2FA4A9'}20, ${color || '#2FA4A9'}10)`,
                        borderRadius: 3,
                        p: 2,
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

const RecentActivity = ({ applications, loading }) => {
    const cardStyles = {
        borderRadius: 3,
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        height: '100%',
    };

    if (loading) {
        return (
            <Card sx={cardStyles}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4A4A4A', mb: 2 }}>
                        Recent Applications
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress sx={{ color: '#2FA4A9' }} />
                    </Box>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card sx={cardStyles}>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4A4A4A', mb: 2 }}>
                    Recent Applications
                </Typography>
                <Box>
                    {applications.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                            No recent applications
                        </Typography>
                    ) : (
                        applications.map((app, index) => (
                            <Box
                                key={app._id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    py: 1.5,
                                    borderBottom: index < applications.length - 1 ? '1px solid #e5e7eb' : 'none',
                                }}
                            >
                                <Avatar
                                    src={app.applicant?.imageLink}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        backgroundColor: '#AEE3E6',
                                        color: '#2FA4A9',
                                    }}
                                >
                                    {app.applicantName?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {app.applicantName} applied for {app.jobTitle}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

const JobPerformance = ({ jobs, loading }) => {
    const cardStyles = {
        borderRadius: 3,
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        height: '100%',
    };

    if (loading) {
        return (
            <Card sx={cardStyles}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4A4A4A', mb: 2 }}>
                        Top Performing Jobs
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress sx={{ color: '#2FA4A9' }} />
                    </Box>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card sx={cardStyles}>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4A4A4A', mb: 2 }}>
                    Top Performing Jobs (by Applicants)
                </Typography>
                <Box>
                    {jobs.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                            No active jobs yet
                        </Typography>
                    ) : (
                        jobs.map((job, index) => {
                            const maxApplicants = Math.max(...jobs.map(j => j.applicants || 0));
                            const fillRate = maxApplicants > 0 ? ((job.applicants || 0) / maxApplicants) * 100 : 0;

                            return (
                                <Box
                                    key={job._id}
                                    sx={{
                                        py: 2,
                                        borderBottom: index < jobs.length - 1 ? '1px solid #e5e7eb' : 'none',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {job.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {job.applicants || 0} applicants
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={fillRate}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: '#e5e7eb',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#2FA4A9',
                                            },
                                        }}
                                    />
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                        {job.views || 0} views • {job.location}
                                    </Typography>
                                </Box>
                            );
                        })
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default function DashboardHomePage() {
    const [stats, setStats] = useState(null);
    const [topJobs, setTopJobs] = useState([]);
    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch all data in parallel
            const [statsData, topJobsData, applicationsData] = await Promise.all([
                getDashboardStatsAPI(),
                getTopPerformingJobsAPI(),
                getRecentApplicationsAPI(5),
            ]);

            setStats(statsData.stats);
            setTopJobs(topJobsData.topByApplicants || []);
            setRecentApplications(applicationsData.applications || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 1, color: 'text.primary', fontWeight: 600 }}>
                Dashboard Home
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Welcome back! Here's an overview of your recruitment activity.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Active Jobs"
                        value={loading ? '...' : stats?.activeJobs || 0}
                        subtitle={`${loading ? '...' : stats?.totalJobs || 0} total`}
                        icon={<WorkIcon sx={{ fontSize: 32, color: '#2FA4A9' }} />}
                        color="#2FA4A9"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Total Applicants"
                        value={loading ? '...' : stats?.totalApplications || 0}
                        subtitle={`${loading ? '...' : stats?.pendingApplications || 0} pending`}
                        icon={<PeopleIcon sx={{ fontSize: 32, color: '#10b981' }} />}
                        color="#10b981"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Total Views"
                        value={loading ? '...' : stats?.totalViews || 0}
                        subtitle="Across all jobs"
                        icon={<VisibilityIcon sx={{ fontSize: 32, color: '#f59e0b' }} />}
                        color="#f59e0b"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Shortlisted"
                        value={loading ? '...' : stats?.shortlistedApplications || 0}
                        subtitle={`${loading ? '...' : stats?.rejectedApplications || 0} rejected`}
                        icon={<CheckCircleIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />}
                        color="#8b5cf6"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <JobPerformance jobs={topJobs} loading={loading} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RecentActivity applications={recentApplications} loading={loading} />
                </Grid>
            </Grid>
        </Box>
    );
}
