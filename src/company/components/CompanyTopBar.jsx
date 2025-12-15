import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Box,
    Menu,
    MenuItem,
    Typography,
    Divider,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Business as BusinessIcon,
} from '@mui/icons-material';
import { LogoutAPI, getUserEmail, getUserProfile } from '../../api/AuthAPI';
import { toast } from 'react-toastify';

export default function CompanyTopBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const profile = await getUserProfile();
                setCompanyName(profile.name || 'Company');
                setCompanyEmail(profile.email || getUserEmail());
            } catch (error) {
                console.error('Error fetching profile:', error);
                setCompanyName('Company');
                setCompanyEmail(getUserEmail() || '');
            }
        };

        fetchCompanyProfile();
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        LogoutAPI();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    // Get first letter of company name for avatar
    const avatarLetter = companyName.charAt(0).toUpperCase() || 'C';

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - 260px)`,
                ml: `260px`,
                backgroundColor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                color: 'text.primary',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                {/* Company Dashboard Title */}
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2FA4A9' }}>
                    Company Dashboard
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar sx={{ width: 36, height: 36, backgroundColor: '#0a66c2', ml: 1 }}>
                            {avatarLetter}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                minWidth: 220,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        <Box sx={{ px: 2, py: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <BusinessIcon sx={{ fontSize: 18 }} />
                                {companyName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {companyEmail}
                            </Typography>
                        </Box>
                        <Divider />
                        <MenuItem onClick={() => { handleMenuClose(); navigate('/company/profile'); }}>
                            <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
                            Company Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                            <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
