import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';

export default function StatCard({ title, value, trend }) {
    return (
        <Card
            sx={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                borderRadius: 3,
                height: '100%',
                border: '1px solid #E5E7EB',
            }}
        >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: '#7A7A7A',
                        mb: 2,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#2FA4A9',
                        fontWeight: 700,
                    }}
                >
                    {value.toLocaleString()}
                </Typography>
                {trend && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, gap: 0.5 }}>
                        <TrendingUpIcon sx={{ fontSize: '1rem', color: '#2FA4A9' }} />
                        <Typography variant="caption" sx={{ color: '#2FA4A9', fontWeight: 500 }}>
                            {trend}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
