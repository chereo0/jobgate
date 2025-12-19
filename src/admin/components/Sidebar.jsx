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
    AddBusiness as AddBusinessIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
    { text: 'Home/Overview', icon: <HomeIcon />, path: '/admin' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Companies', icon: <BusinessIcon />, path: '/admin/companies' },
    { text: 'Add Company', icon: <AddBusinessIcon />, path: '/admin/add-company' },
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
                    backgroundColor: '#F2F4F6',
                    color: '#4A4A4A',
                    borderRight: '1px solid #E5E7EB',
                },
            }}
        >
            <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2FA4A9' }}>
                    JobGate
                </Typography>
                <Typography variant="caption" sx={{ color: '#7A7A7A' }}>
                    Admin Dashboard
                </Typography>
            </Box>

            <List sx={{ px: 1, pt: 2 }}>
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
                                backgroundColor: isActive ? '#AEE3E6' : 'transparent',
                                borderLeft: isActive ? '4px solid #2FA4A9' : '4px solid transparent',
                                '&:hover': {
                                    backgroundColor: isActive ? '#AEE3E6' : 'rgba(47, 164, 169, 0.08)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: isActive ? '#2FA4A9' : '#7A7A7A', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: '0.95rem',
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#4A4A4A' : '#7A7A7A',
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}
