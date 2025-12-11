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
    Dashboard as DashboardIcon,
    Work as WorkIcon,
    People as PeopleIcon,
    Business as BusinessIcon,
} from '@mui/icons-material';

const drawerWidth = 260;

const menuItems = [
    { text: 'Dashboard Home', icon: <DashboardIcon />, path: '/company' },
    { text: 'Job Postings', icon: <WorkIcon />, path: '/company/jobs' },
    { text: 'Candidates', icon: <PeopleIcon />, path: '/company/candidates' },
    { text: 'Company Profile', icon: <BusinessIcon />, path: '/company/profile' },
];

export default function CompanySidebar() {
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
                    backgroundColor: '#0f172a',
                    color: 'white',
                    borderRight: 'none',
                },
            }}
        >
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#0a66c2' }}>
                    JobGate
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Company Dashboard
                </Typography>
            </Box>

            <List sx={{ px: 2, pt: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                backgroundColor: isActive ? 'rgba(10, 102, 194, 0.2)' : 'transparent',
                                borderLeft: isActive ? '4px solid #0a66c2' : '4px solid transparent',
                                '&:hover': {
                                    backgroundColor: isActive ? 'rgba(10, 102, 194, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: isActive ? '#0a66c2' : 'rgba(255, 255, 255, 0.7)', minWidth: 40 }}>
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
