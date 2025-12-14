import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Chip,
    Avatar,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    PersonAdd as PersonAddIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Check as CheckIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { getNotificationsAPI, markNotificationAsReadAPI, markAllNotificationsAsReadAPI } from '../api/NotificationAPI';
import { acceptConnectionRequestAPI, rejectConnectionRequestAPI } from '../api/ConnectionAPI';
import { toast } from 'react-toastify';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const data = await getNotificationsAPI();
            setNotifications(data.notifications);
            setUnreadCount(data.unreadCount);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Failed to load notifications');
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await markNotificationAsReadAPI(notificationId);
            await fetchNotifications();
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

    const handleAcceptConnection = async (connectionId, notificationId) => {
        try {
            // Extract ID if connectionId is an object
            const id = typeof connectionId === 'object' ? connectionId._id : connectionId;

            // Immediately remove from UI using functional update
            setNotifications(prevNotifications => prevNotifications.filter(n => n._id !== notificationId));
            setUnreadCount(prev => Math.max(0, prev - 1));

            // Call APIs
            await acceptConnectionRequestAPI(id);
            await markNotificationAsReadAPI(notificationId);
            toast.success('Connection request accepted');
        } catch (error) {
            console.error('Error accepting connection:', error);
            toast.error('Failed to accept connection');
            // Refresh on error to restore state
            await fetchNotifications();
        }
    };

    const handleRejectConnection = async (connectionId, notificationId) => {
        try {
            // Extract ID if connectionId is an object
            const id = typeof connectionId === 'object' ? connectionId._id : connectionId;

            // Immediately remove from UI using functional update
            setNotifications(prevNotifications => prevNotifications.filter(n => n._id !== notificationId));
            setUnreadCount(prev => Math.max(0, prev - 1));

            // Call APIs
            await rejectConnectionRequestAPI(id);
            await markNotificationAsReadAPI(notificationId);
            toast.success('Connection request rejected');
        } catch (error) {
            console.error('Error rejecting connection:', error);
            toast.error('Failed to reject connection');
            // Refresh on error to restore state
            await fetchNotifications();
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'new_user':
                return <PersonAddIcon sx={{ color: '#2FA4A9' }} />;
            case 'connection_request':
                return <PersonAddIcon sx={{ color: '#2FA4A9' }} />;
            case 'connection_accepted':
                return <CheckCircleIcon sx={{ color: '#10B981' }} />;
            case 'connection_rejected':
                return <CancelIcon sx={{ color: '#EF4444' }} />;
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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress sx={{ color: '#2FA4A9' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#4A4A4A' }}>
                        Notifications
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                    </Typography>
                </Box>
                {unreadCount > 0 && (
                    <Button
                        variant="outlined"
                        onClick={handleMarkAllAsRead}
                        sx={{
                            borderColor: '#2FA4A9',
                            color: '#2FA4A9',
                            textTransform: 'none',
                            '&:hover': {
                                borderColor: '#258A8E',
                                backgroundColor: '#F0F9FA',
                            },
                        }}
                    >
                        Mark all as read
                    </Button>
                )}
            </Box>

            {/* Notifications List */}
            {notifications.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <NotificationsIcon sx={{ fontSize: 64, color: '#E5E7EB', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You're all caught up! Check back later for updates.
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {notifications.map((notification) => (
                        <Card
                            key={notification._id}
                            sx={{
                                backgroundColor: notification.read ? '#FFFFFF' : '#AEE3E6',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(47, 164, 169, 0.15)',
                                },
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {/* Icon */}
                                    <Avatar sx={{ backgroundColor: '#F0F9FA', width: 48, height: 48 }}>
                                        {getNotificationIcon(notification.type)}
                                    </Avatar>

                                    {/* Content */}
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: notification.read ? 400 : 600,
                                                mb: 0.5,
                                            }}
                                        >
                                            {notification.message}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {formatTimeAgo(notification.createdAt)}
                                        </Typography>

                                        {/* Connection Request Actions */}
                                        {notification.type === 'connection_request' && notification.connectionId && (
                                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={<CheckIcon />}
                                                    onClick={() => handleAcceptConnection(notification.connectionId, notification._id)}
                                                    sx={{
                                                        backgroundColor: '#2FA4A9',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: '#258A8E',
                                                        },
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<CloseIcon />}
                                                    onClick={() => handleRejectConnection(notification.connectionId, notification._id)}
                                                    sx={{
                                                        borderColor: '#E5E7EB',
                                                        color: '#7A7A7A',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            borderColor: '#DC2626',
                                                            color: '#DC2626',
                                                            backgroundColor: '#FEF2F2',
                                                        },
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Unread Badge */}
                                    {!notification.read && (
                                        <Chip
                                            label="New"
                                            size="small"
                                            sx={{
                                                backgroundColor: '#2FA4A9',
                                                color: '#FFFFFF',
                                                fontWeight: 600,
                                                height: 24,
                                            }}
                                        />
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
}
