import React from 'react';
import {
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    LinearProgress,
    Avatar,
    Chip,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Work as WorkIcon,
    People as PeopleIcon,
    Visibility as VisibilityIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, subtitle, icon, color }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: color || 'primary.main', mb: 0.5 }}>
                        {value}
                    </Typography>
                    {subtitle && (
                        <Typography variant="caption" color="text.secondary">
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        backgroundColor: `${color || '#0a66c2'}15`,
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

const RecentActivity = () => {
    const activities = [
        { action: 'New application for Senior Software Engineer', time: '5 minutes ago', type: 'application' },
        { action: 'Interview scheduled with John Doe', time: '1 hour ago', type: 'interview' },
        { action: 'Job posting "Product Manager" published', time: '2 hours ago', type: 'job' },
        { action: 'Profile viewed by 15 candidates', time: '3 hours ago', type: 'view' },
        { action: 'New application for UX Designer', time: '4 hours ago', type: 'application' },
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Recent Activity
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {activities.map((activity, index) => (
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
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    backgroundColor: activity.type === 'application' ? '#dbeafe' : '#d1fae5',
                                    color: activity.type === 'application' ? '#0a66c2' : '#10b981',
                                    fontSize: '0.875rem',
                                }}
                            >
                                {activity.type === 'application' ? '📝' : activity.type === 'interview' ? '📅' : '👁️'}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {activity.action}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {activity.time}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

const JobPerformance = () => {
    const jobs = [
        { title: 'Senior Software Engineer', applicants: 120, views: 450, fillRate: 75 },
        { title: 'Product Manager', applicants: 65, views: 280, fillRate: 60 },
        { title: 'UX Designer', applicants: 45, views: 190, fillRate: 45 },
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Top Performing Jobs
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {jobs.map((job, index) => (
                        <Box
                            key={index}
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
                                    {job.applicants} applicants
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={job.fillRate}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: '#e5e7eb',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#0a66c2',
                                    },
                                }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                {job.views} views • {job.fillRate}% fill rate
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default function DashboardHomePage() {
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
                        value="5"
                        subtitle="+2 this week"
                        icon={<WorkIcon sx={{ fontSize: 32, color: '#0a66c2' }} />}
                        color="#0a66c2"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Total Applicants"
                        value="265"
                        subtitle="+45 this week"
                        icon={<PeopleIcon sx={{ fontSize: 32, color: '#10b981' }} />}
                        color="#10b981"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Profile Views"
                        value="1,240"
                        subtitle="+180 this week"
                        icon={<VisibilityIcon sx={{ fontSize: 32, color: '#f59e0b' }} />}
                        color="#f59e0b"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard
                        title="Interviews"
                        value="12"
                        subtitle="4 scheduled today"
                        icon={<ScheduleIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />}
                        color="#8b5cf6"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <JobPerformance />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RecentActivity />
                </Grid>
            </Grid>
        </Box>
    );
}
