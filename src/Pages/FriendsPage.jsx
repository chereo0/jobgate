import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Button,
    TextField,
    InputAdornment,
    Chip,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Search as SearchIcon,
    People as PeopleIcon,
    PersonRemove as PersonRemoveIcon,
    Message as MessageIcon,
} from '@mui/icons-material';
import { getMyConnectionsAPI, removeConnectionAPI } from '../api/ConnectionAPI';
import { toast } from 'react-toastify';

export default function FriendsPage() {
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [removeDialog, setRemoveDialog] = useState({ open: false, friend: null });

    useEffect(() => {
        fetchFriends();
    }, []);

    useEffect(() => {
        filterFriends();
    }, [searchQuery, friends]);

    const fetchFriends = async () => {
        try {
            const data = await getMyConnectionsAPI();
            setFriends(data);
            setFilteredFriends(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching friends:', error);
            toast.error('Failed to load friends');
            setLoading(false);
        }
    };

    const filterFriends = () => {
        if (!searchQuery.trim()) {
            setFilteredFriends(friends);
            return;
        }

        const filtered = friends.filter((connection) =>
            connection.friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (connection.friend.headline && connection.friend.headline.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredFriends(filtered);
    };

    const handleRemoveClick = (friend) => {
        setRemoveDialog({ open: true, friend });
    };

    const handleRemoveConfirm = async () => {
        try {
            await removeConnectionAPI(removeDialog.friend._id);
            setFriends(friends.filter((f) => f._id !== removeDialog.friend._id));
            toast.success('Connection removed');
            setRemoveDialog({ open: false, friend: null });
        } catch (error) {
            console.error('Error removing connection:', error);
            toast.error('Failed to remove connection');
        }
    };

    const handleRemoveCancel = () => {
        setRemoveDialog({ open: false, friend: null });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress sx={{ color: '#2FA4A9' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#4A4A4A' }}>
                    My Connections
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {friends.length} {friends.length === 1 ? 'connection' : 'connections'}
                </Typography>
            </Box>

            {/* Search Bar */}
            {friends.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Search connections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#7A7A7A' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            maxWidth: 600,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#FFFFFF',
                                '&:hover fieldset': {
                                    borderColor: '#2FA4A9',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#2FA4A9',
                                },
                            },
                        }}
                    />
                </Box>
            )}

            {/* Friends List */}
            {filteredFriends.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <PeopleIcon sx={{ fontSize: 64, color: '#E5E7EB', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        {friends.length === 0 ? 'No connections yet' : 'No connections found'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {friends.length === 0
                            ? 'Start connecting with people to grow your network'
                            : 'Try a different search term'}
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredFriends.map((connection) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={connection._id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 24px rgba(47, 164, 169, 0.15)',
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                                    {/* Avatar */}
                                    <Avatar
                                        src={connection.friend.imageLink}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            margin: '0 auto',
                                            mb: 2,
                                            backgroundColor: '#2FA4A9',
                                            fontSize: '2rem',
                                        }}
                                    >
                                        {connection.friend.name.charAt(0).toUpperCase()}
                                    </Avatar>

                                    {/* Name */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 0.5,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {connection.friend.name}
                                    </Typography>

                                    {/* Headline */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 1,
                                            minHeight: 40,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {connection.friend.headline || 'Professional'}
                                    </Typography>

                                    {/* Connection Date */}
                                    <Chip
                                        label={`Connected ${formatDate(connection.connectedAt)}`}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#AEE3E6',
                                            color: '#2FA4A9',
                                            fontWeight: 500,
                                            mb: 2,
                                        }}
                                    />

                                    {/* Action Buttons */}
                                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleRemoveClick(connection)}
                                            startIcon={<PersonRemoveIcon />}
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
                                            Remove
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Remove Confirmation Dialog */}
            <Dialog open={removeDialog.open} onClose={handleRemoveCancel}>
                <DialogTitle>Remove Connection?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to remove{' '}
                        <strong>{removeDialog.friend?.friend?.name}</strong> from your connections?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRemoveCancel} sx={{ color: '#7A7A7A' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleRemoveConfirm}
                        variant="contained"
                        sx={{
                            backgroundColor: '#DC2626',
                            '&:hover': { backgroundColor: '#B91C1C' },
                        }}
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
