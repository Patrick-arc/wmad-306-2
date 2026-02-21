import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, Button, Card, CardContent, Typography, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskIcon from '@mui/icons-material/Task';

export default function Show({ project }) {
    return (
        <AuthenticatedLayout>
            <Head title={project.title || 'Project'} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ color: '#7a5c2e', fontWeight: 900, mb: 1 }}>
                    {project.title}
                </Typography>
                <Box sx={{ height: '3px', width: '60px', background: 'linear-gradient(90deg, #bfa76a 0%, #d6c491 100%)', borderRadius: '2px', mb: 2 }} />

                <Card sx={{ backgroundColor: '#161414', border: '1px solid rgba(191,167,106,0.12)' }}>
                    <CardContent>
                        <Typography variant="body1" sx={{ color: '#F5DEB3', mb: 2 }}>{project.description || 'No description provided.'}</Typography>

                        {(() => {
                            const pr = project.priority || 'medium';
                            const color = pr === 'high' ? '#d9534f' : pr === 'low' ? '#5cb85c' : '#e1c542';
                            const label = pr.charAt(0).toUpperCase() + pr.slice(1);
                            return <Box component="span" sx={{ display: 'inline-flex' }}><Box sx={{ backgroundColor: color, color: '#fff', fontWeight: 700, fontSize: '0.75rem', px: 1, py: '2px', borderRadius: '8px' }}>{label}</Box></Box>;
                        })()}

                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Link href={route('projects.index')} as="a">
                                <Button startIcon={<ArrowBackIcon />} sx={{ background: 'transparent', color: '#DEB887' }}>
                                    Back
                                </Button>
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </AuthenticatedLayout>
    );
}
