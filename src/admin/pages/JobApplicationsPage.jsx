import React from 'react';
import {
    Typography,
    Grid,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,
    Avatar,
} from '@mui/material';
import StatCard from '../components/StatCard';

const applications = [
    {
        id: 1,
        applicantName: 'Sarah Johnson',
        position: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        appliedDate: '2024-03-15',
        status: 'Under Review',
        avatar: 'S',
    },
    {
        id: 2,
        applicantName: 'Michael Chen',
        position: 'Product Manager',
        company: 'Global Finance Corp',
        appliedDate: '2024-03-14',
        status: 'Interview Scheduled',
        avatar: 'M',
    },
    {
        id: 3,
        applicantName: 'Emily Rodriguez',
        position: 'UX Designer',
        company: 'Healthcare Solutions',
        appliedDate: '2024-03-13',
        status: 'Rejected',
        avatar: 'E',
    },
    {
        id: 4,
        applicantName: 'David Kim',
        position: 'Data Analyst',
        company: 'Retail Masters LLC',
        appliedDate: '2024-03-12',
        status: 'Accepted',
        avatar: 'D',
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Accepted':
            return { bg: '#d1fae5', color: '#065f46' };
        case 'Rejected':
            return { bg: '#fee2e2', color: '#991b1b' };
        case 'Interview Scheduled':
            return { bg: '#AEE3E6', color: '#2FA4A9' };
        default:
            return { bg: '#fed7aa', color: '#92400e' };
    }
};

export default function JobApplicationsPage() {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, color: 'primary.main' }}>
                Job Applications
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <StatCard title="Total Applications" value={5420} trend="+15%" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Under Review" value={1240} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Interviews Scheduled" value={320} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Accepted" value={890} />
                </Grid>
            </Grid>

            <Card sx={{ borderRadius: 3, border: '2px solid #AEE3E6' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#0f172a' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Applicant</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Position</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Company</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Applied Date</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="right">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((app) => {
                                const statusColors = getStatusColor(app.status);
                                return (
                                    <TableRow
                                        key={app.id}
                                        sx={{
                                            '&:hover': { backgroundColor: '#f9fafb' },
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: '#10b981',
                                                        width: 40,
                                                        height: 40,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {app.avatar}
                                                </Avatar>
                                                <Typography sx={{ fontWeight: 500 }}>{app.applicantName}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{app.position}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{app.company}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{app.appliedDate}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={app.status}
                                                size="small"
                                                sx={{
                                                    backgroundColor: statusColors.bg,
                                                    color: statusColors.color,
                                                    fontWeight: 500,
                                                    borderRadius: 2,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                                <Button size="small" sx={{ textTransform: 'none', minWidth: 'auto' }}>
                                                    View
                                                </Button>
                                                <Button size="small" sx={{ textTransform: 'none', minWidth: 'auto' }}>
                                                    Review
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}
