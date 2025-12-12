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
    Article as ArticleIcon,
} from '@mui/icons-material';

const drawerWidth = 260;

const menuItems = [
    { text: 'Dashboard Home', icon: <DashboardIcon />, path: '/company' },
    { text: 'Job Postings', icon: <WorkIcon />, path: '/company/jobs' },
    { text: 'Posts', icon: <ArticleIcon />, path: '/company/posts' },
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
