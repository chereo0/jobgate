import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
} from '@mui/material';
import {
    Home as HomeIcon,
    People as PeopleIcon,
    Business as BusinessIcon,
    Work as WorkIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
    { text: 'Home/Overview', icon: <HomeIcon />, path: '/admin' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Companies', icon: <BusinessIcon />, path: '/admin/companies' },
    { text: 'Job Applications', icon: <WorkIcon />, path: '/admin/applications' },
    { text: 'Company Categories', icon: <CategoryIcon />, path: '/admin/categories' },
];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRight: 'none',
                },
            }}
        >
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ fontSize: '2rem' }}>⚡</Box>
                    JobGate Admin
                </Typography>
            </Box>

            <List sx={{ px: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            sx={{
                                borderRadius: 2,
                                mb: 0.5,
                                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                borderLeft: isActive ? '4px solid #3b82f6' : '4px solid transparent',
                                '&:hover': {
                                    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: '0.95rem',
                                    fontWeight: isActive ? 600 : 400,
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}
