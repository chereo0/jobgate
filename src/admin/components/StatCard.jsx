import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';

export default function StatCard({ title, value, trend }) {
    return (
        <Card
            sx={{
                backgroundColor: '#dbeafe',
                boxShadow: 2,
                borderRadius: 3,
                height: '100%',
            }}
        >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: 'primary.main',
                        mb: 2,
                        opacity: 0.8,
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 700,
                    }}
                >
                    {value.toLocaleString()}
                </Typography>
                {trend && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, gap: 0.5 }}>
                        <TrendingUpIcon sx={{ fontSize: '1rem', color: 'success.main' }} />
                        <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
                            {trend}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
