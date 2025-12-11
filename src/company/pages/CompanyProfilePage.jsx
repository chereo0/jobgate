import React, { useState, useEffect, useRef } from 'react';
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
    IconButton,
} from '@mui/material';
import {
    Edit as EditIcon,
    Business as BusinessIcon,
    PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { getUserProfile, updateUserProfile } from '../../api/AuthAPI';
import { toast } from 'react-toastify';

export default function CompanyProfilePage() {
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchCompanyProfile();
    }, []);

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

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image size should be less than 2MB');
            return;
        }

        try {
            setUploading(true);

            // Convert image to base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const base64Image = reader.result;

                    // Update profile with new image
                    await updateUserProfile({ imageLink: base64Image });

                    // Update local state
                    setCompanyData({ ...companyData, imageLink: base64Image });

                    toast.success('Profile image updated successfully');
                    setUploading(false);
                } catch (error) {
                    console.error('Error uploading image:', error);
                    toast.error('Failed to upload image');
                    setUploading(false);
                }
            };

            reader.onerror = () => {
                toast.error('Failed to read image file');
                setUploading(false);
            };

            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error processing image:', error);
            toast.error('Failed to process image');
            setUploading(false);
        }
    };

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

    // Get first two letters for avatar fallback
    const avatarLetters = companyData.name?.substring(0, 2).toUpperCase() || 'CO';

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    Company Profile
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Company Overview Card */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                {companyData.imageLink ? (
                                    <Avatar
                                        src={companyData.imageLink}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            margin: '0 auto',
                                            mb: 2,
                                        }}
                                    />
                                ) : (
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
                                )}

                                {/* Upload button overlay */}
                                <IconButton
                                    onClick={handleImageClick}
                                    disabled={uploading}
                                    sx={{
                                        position: 'absolute',
                                        bottom: 16,
                                        right: -8,
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    {uploading ? (
                                        <CircularProgress size={20} sx={{ color: 'white' }} />
                                    ) : (
                                        <PhotoCameraIcon />
                                    )}
                                </IconButton>

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </Box>

                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                {companyData.name || 'Company Name'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {companyData.category || 'Category'}
                            </Typography>
                            <Chip
                                label={companyData.role || 'Company'}
                                size="small"
                                sx={{
                                    backgroundColor: '#dbeafe',
                                    color: '#1e40af',
                                    fontWeight: 500,
                                    textTransform: 'capitalize',
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Company Details Card */}
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
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={companyData.email || ''}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Category"
                                        value={companyData.category || ''}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        value={companyData.location || 'Not specified'}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="User ID"
                                        value={companyData.userID || ''}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Member Since"
                                        value={companyData.createdAt ? new Date(companyData.createdAt).toLocaleDateString() : 'N/A'}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="About"
                                        value={companyData.about || 'No description available'}
                                        multiline
                                        rows={4}
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
