import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    TextField,
    IconButton,
    Avatar,
    Box,
    InputAdornment,
    Menu,
    MenuItem,
    Typography,
    Divider,
} from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { LogoutAPI, getUserEmail } from '../../api/AuthAPI';
import { toast } from 'react-toastify';

export default function TopBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = getUserEmail();
        setUserEmail(email || 'Admin');
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

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - 240px)`,
                ml: `240px`,
                backgroundColor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                color: 'text.primary',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ flex: 1, maxWidth: 600, mx: 'auto' }}>
                    <TextField
                        fullWidth
                        placeholder="Search users, companies..."
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                backgroundColor: '#f3f4f6',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '&:hover': {
                                    backgroundColor: '#e5e7eb',
                                },
                            },
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar sx={{ width: 36, height: 36, backgroundColor: '#0f172a', ml: 1 }}>
                            A
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                minWidth: 200,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        <Box sx={{ px: 2, py: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                Admin Account
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {userEmail}
                            </Typography>
                        </Box>
                        <Divider />
                        <MenuItem onClick={() => { handleMenuClose(); navigate('/admin/profile'); }}>
                            <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
                            Settings
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
