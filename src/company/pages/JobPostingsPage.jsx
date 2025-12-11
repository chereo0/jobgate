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
    CardContent,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import {
    Add as AddIcon,
    KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, subtitle }) => (
    <Card sx={{ backgroundColor: '#dbeafe', height: '100%' }}>
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                {value}
            </Typography>
            {subtitle && (
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    {subtitle}
                </Typography>
            )}
        </CardContent>
    </Card>
);

const jobPostings = [
    {
        id: 1,
        title: 'Senior Software Engineer',
        datePosted: '2024-11-01',
        lastPosted: '85 New',
        applicants: '35 New / 120 Total',
        status: 'Active',
    },
    {
        id: 2,
        title: 'Product Manager',
        datePosted: '2024-10-28',
        lastPosted: '42 New',
        applicants: '18 New / 65 Total',
        status: 'Active',
    },
    {
        id: 3,
        title: 'UX Designer',
        datePosted: '2024-10-25',
        lastPosted: '28 New',
        applicants: '12 New / 45 Total',
        status: 'Duplicate',
    },
    {
        id: 4,
        title: 'Data Analyst',
        datePosted: '2024-10-20',
        lastPosted: '15 New',
        applicants: '8 New / 32 Total',
        status: 'Active',
    },
];

export default function JobPostingsPage() {
    return (
        <Box>
            {/* Header with title and action buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    Manage Job Postings
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: 'primary.main',
                            px: 3,
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        Create a Job
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            px: 3,
                            '&:hover': {
                                borderColor: 'primary.dark',
                                backgroundColor: 'rgba(10, 102, 194, 0.04)',
                            },
                        }}
                    >
                        Add New Company
                    </Button>
                </Box>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <StatCard title="Active Jobs" value="5" subtitle="New" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard title="Total Applicants" value="4" subtitle="Scheduled" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard title="Job Views This Week" value="1,200" subtitle="1,200" />
                </Grid>
            </Grid>

            {/* Filter/Sort Row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                        defaultValue="sort"
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e5e7eb',
                            },
                        }}
                    >
                        <MenuItem value="sort">Sort/Filter</MenuItem>
                        <MenuItem value="date">By Date</MenuItem>
                        <MenuItem value="applicants">By Applicants</MenuItem>
                        <MenuItem value="status">By Status</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                        defaultValue="filter"
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e5e7eb',
                            },
                        }}
                    >
                        <MenuItem value="filter">Set New Filter</MenuItem>
                        <MenuItem value="active">Active Only</MenuItem>
                        <MenuItem value="all">All Jobs</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Job Postings Table */}
            <Card sx={{ borderRadius: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Job Title</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Date Posted</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Last Job Posted</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Total Applicants</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jobPostings.map((job, index) => (
                                <TableRow
                                    key={job.id}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? 'white' : '#fafbfc',
                                        '&:hover': { backgroundColor: '#f3f4f6' },
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: 500 }}>{job.title}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>{job.datePosted}</TableCell>
                                    <TableCell>
                                        <Box
                                            component="span"
                                            sx={{
                                                color: 'primary.main',
                                                cursor: 'pointer',
                                                '&:hover': { textDecoration: 'underline' },
                                            }}
                                        >
                                            {job.lastPosted}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            component="span"
                                            sx={{
                                                color: 'primary.main',
                                                cursor: 'pointer',
                                                fontWeight: 500,
                                                '&:hover': { textDecoration: 'underline' },
                                            }}
                                        >
                                            {job.applicants}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={job.status}
                                            size="small"
                                            sx={{
                                                backgroundColor: job.status === 'Active' ? '#d1fae5' : '#fed7aa',
                                                color: job.status === 'Active' ? '#065f46' : '#92400e',
                                                fontWeight: 500,
                                                borderRadius: 2,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                            {job.status === 'Duplicate' && (
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        textTransform: 'none',
                                                        minWidth: 'auto',
                                                        borderColor: '#e5e7eb',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                            <Button
                                                size="small"
                                                variant="contained"
                                                sx={{
                                                    textTransform: 'none',
                                                    minWidth: 'auto',
                                                    backgroundColor: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark',
                                                    },
                                                }}
                                            >
                                                View Applicants
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}
