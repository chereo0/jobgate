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
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
} from '@mui/icons-material';

const candidates = [
    {
        id: 1,
        name: 'Sarah Johnson',
        position: 'Senior Software Engineer',
        appliedDate: '2024-03-15',
        status: 'Interview Scheduled',
        experience: '8 years',
        location: 'San Francisco, CA',
        avatar: 'S',
    },
    {
        id: 2,
        name: 'Michael Chen',
        position: 'Product Manager',
        appliedDate: '2024-03-14',
        status: 'Under Review',
        experience: '6 years',
        location: 'New York, NY',
        avatar: 'M',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        position: 'UX Designer',
        appliedDate: '2024-03-13',
        status: 'Shortlisted',
        experience: '5 years',
        location: 'Austin, TX',
        avatar: 'E',
    },
    {
        id: 4,
        name: 'David Kim',
        position: 'Data Analyst',
        appliedDate: '2024-03-12',
        status: 'New Application',
        experience: '4 years',
        location: 'Seattle, WA',
        avatar: 'D',
    },
    {
        id: 5,
        name: 'Jessica Williams',
        position: 'Senior Software Engineer',
        appliedDate: '2024-03-11',
        status: 'Interview Scheduled',
        experience: '7 years',
        location: 'Boston, MA',
        avatar: 'J',
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Interview Scheduled':
            return { bg: '#dbeafe', color: '#1e40af' };
        case 'Shortlisted':
            return { bg: '#d1fae5', color: '#065f46' };
        case 'Under Review':
            return { bg: '#fed7aa', color: '#92400e' };
        case 'New Application':
            return { bg: '#e0e7ff', color: '#3730a3' };
        default:
            return { bg: '#f3f4f6', color: '#374151' };
    }
};

export default function CandidatesPage() {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, color: 'text.primary', fontWeight: 600 }}>
                Candidates
            </Typography>

            {/* Search and Filter Bar */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Search candidates by name, position, or skills..."
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        sx: {
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e5e7eb',
                            },
                        },
                    }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                        defaultValue="all"
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e5e7eb',
                            },
                        }}
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="new">New Applications</MenuItem>
                        <MenuItem value="review">Under Review</MenuItem>
                        <MenuItem value="shortlisted">Shortlisted</MenuItem>
                        <MenuItem value="interview">Interview Scheduled</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Statistics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <Card sx={{ backgroundColor: '#dbeafe' }}>
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                265
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Candidates
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ backgroundColor: '#d1fae5' }}>
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>
                                45
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Shortlisted
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ backgroundColor: '#e0e7ff' }}>
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#6366f1' }}>
                                12
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Interviews Today
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{ backgroundColor: '#fed7aa' }}>
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                                28
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                New This Week
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            {/* Candidates Table */}
            <Card sx={{ borderRadius: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                                <TableCell sx={{ fontWeight: 600 }}>Candidate</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Experience</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Applied Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.map((candidate, index) => {
                                const statusColors = getStatusColor(candidate.status);
                                return (
                                    <TableRow
                                        key={candidate.id}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? 'white' : '#fafbfc',
                                            '&:hover': { backgroundColor: '#f3f4f6' },
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: '#0a66c2',
                                                        width: 40,
                                                        height: 40,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {candidate.avatar}
                                                </Avatar>
                                                <Typography sx={{ fontWeight: 500 }}>{candidate.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{candidate.position}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{candidate.experience}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{candidate.location}</TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{candidate.appliedDate}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={candidate.status}
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
                                                    View Profile
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    sx={{
                                                        textTransform: 'none',
                                                        minWidth: 'auto',
                                                        backgroundColor: 'primary.main',
                                                    }}
                                                >
                                                    Contact
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
