import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Avatar,
    Chip,
    CircularProgress,
} from '@mui/material';
import {
    Edit as EditIcon,
    Business as BusinessIcon,
} from '@mui/icons-material';
import { getUserProfile } from '../../api/AuthAPI';
import { toast } from 'react-toastify';

export default function CompanyProfilePage() {
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const profile = await getUserProfile();
                setCompanyData(profile);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching company profile:', error);
                toast.error('Failed to load company profile');
                setLoading(false);
            }
        };

        fetchCompanyProfile();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!companyData) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                    No company data found
                </Typography>
            </Box>
        );
    }

    // Get first two letters for avatar
    const avatarLetters = companyData.name?.substring(0, 2).toUpperCase() || 'CO';

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    Company Profile
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{
                        backgroundColor: 'primary.main',
                        textTransform: 'none',
                        px: 3,
                    }}
                >
                    Edit Profile
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Company Overview Card */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    margin: '0 auto',
                                    backgroundColor: '#0a66c2',
                                    fontSize: '3rem',
                                    mb: 2,
                                }}
                            >
                                {avatarLetters}
                            </Avatar>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                {companyData.name || 'Company Name'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {companyData.category || 'Industry'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                                {companyData.category && (
                                    <Chip label={companyData.category} size="small" sx={{ backgroundColor: '#dbeafe', color: '#0a66c2' }} />
                                )}
                                <Chip label="Hiring" size="small" sx={{ backgroundColor: '#e0e7ff', color: '#6366f1' }} />
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Quick Stats
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Active Jobs
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        5
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Total Applicants
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        265
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Profile Views
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        1,240
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Company Details */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Company Information
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Company Name"
                                        value={companyData.name || ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Category"
                                        value={companyData.category || ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        value={companyData.location || ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="About Company"
                                        value={companyData.about || ''}
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Contact Information
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={companyData.email || ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="User ID"
                                        value={companyData.userID || ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Account Details
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Role"
                                        value={companyData.role || ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Member Since"
                                        value={companyData.createdAt ? new Date(companyData.createdAt).toLocaleDateString() : 'N/A'}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
