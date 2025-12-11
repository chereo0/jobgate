import React from 'react';
import { Box } from '@mui/material';
import CompanySidebar from '../components/CompanySidebar';
import CompanyTopBar from '../components/CompanyTopBar';

export default function CompanyLayout({ children }) {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
            <CompanySidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <CompanyTopBar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 4,
                        mt: 8,
                        width: '100%',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
