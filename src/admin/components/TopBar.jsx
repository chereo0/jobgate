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
    Badge,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    PersonAdd as PersonAddIcon,
    Work as WorkIcon,
} from '@mui/icons-material';
import { LogoutAPI, getUserEmail } from '../../api/AuthAPI';
import { getNotificationsAPI, markNotificationAsReadAPI, markAllNotificationsAsReadAPI } from '../../api/NotificationAPI';
import { toast } from 'react-toastify';

export default function TopBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const email = getUserEmail();
        setUserEmail(email || 'Admin');
        fetchNotifications();

        // Auto-refresh notifications every 30 seconds
        const interval = setInterval(() => {
            fetchNotifications();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const data = await getNotificationsAPI();
            setNotifications(data.notifications);
            setUnreadCount(data.unreadCount);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationOpen = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleNotificationClick = async (notification) => {
        try {
            if (!notification.read) {
                await markNotificationAsReadAPI(notification._id);
                await fetchNotifications();
            }
            handleNotificationClose();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsReadAPI();
            await fetchNotifications();
            toast.success('All notifications marked as read');
        } catch (error) {
            console.error('Error marking all as read:', error);
            toast.error('Failed to mark notifications as read');
        }
    };

    const handleLogout = () => {
        LogoutAPI();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'new_user':
                return <PersonAddIcon sx={{ color: '#2FA4A9' }} />;
            case 'job_application':
                return <WorkIcon sx={{ color: '#2FA4A9' }} />;
            default:
                return <NotificationsIcon sx={{ color: '#2FA4A9' }} />;
        }
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid #E5E7EB',
                color: '#4A4A4A',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                {/* Admin Dashboard Title */}
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2FA4A9' }}>
                    Admin Dashboard
                </Typography>

                {/* Right Side Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Notifications */}
                    <IconButton onClick={handleNotificationOpen}>
                        <Badge badgeContent={unreadCount} sx={{ '& .MuiBadge-badge': { backgroundColor: '#2FA4A9', color: '#FFFFFF' } }}>
                            <NotificationsIcon sx={{ color: '#7A7A7A' }} />
                        </Badge>
                    </IconButton>

                    {/* Settings */}
                    <IconButton>
                        <SettingsIcon sx={{ color: '#7A7A7A' }} />
                    </IconButton>

                    {/* User Avatar */}
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: '#2FA4A9' }}>
                            {userEmail.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Box>

                {/* Notification Menu */}
                <Menu
                    anchorEl={notificationAnchorEl}
                    open={Boolean(notificationAnchorEl)}
                    onClose={handleNotificationClose}
                    PaperProps={{
                        sx: {
                            width: 400,
                            maxHeight: 500,
                            mt: 1,
                        },
                    }}
                >
                    <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Notifications
                        </Typography>
                        {unreadCount > 0 && (
                            <Button
                                size="small"
                                onClick={handleMarkAllAsRead}
                                sx={{ color: '#2FA4A9', textTransform: 'none' }}
                            >
                                Mark all as read
                            </Button>
                        )}
                    </Box>
                    <Divider />
                    {notifications.length === 0 ? (
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                            <NotificationsIcon sx={{ fontSize: 48, color: '#E5E7EB', mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                No notifications
                            </Typography>
                        </Box>
                    ) : (
                        <List sx={{ py: 0, maxHeight: 400, overflow: 'auto' }}>
                            {notifications.map((notification) => (
                                <ListItem
                                    key={notification._id}
                                    button
                                    onClick={() => handleNotificationClick(notification)}
                                    sx={{
                                        backgroundColor: notification.read ? 'transparent' : '#AEE3E6',
                                        '&:hover': { backgroundColor: notification.read ? '#F2F4F6' : '#9DD9DC' },
                                        borderBottom: '1px solid #E5E7EB',
                                    }}
                                >
                                    <ListItemIcon>
                                        {getNotificationIcon(notification.type)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={notification.message}
                                        secondary={formatTimeAgo(notification.createdAt)}
                                        primaryTypographyProps={{
                                            fontWeight: notification.read ? 400 : 600,
                                            fontSize: '0.9rem',
                                        }}
                                        secondaryTypographyProps={{
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Menu>

                {/* User Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: { width: 200, mt: 1 },
                    }}
                >
                    <MenuItem disabled>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {userEmail}
                        </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
