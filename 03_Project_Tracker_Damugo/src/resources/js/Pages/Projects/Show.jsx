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

                        <Chip icon={<TaskIcon sx={{ color: '#bfa76a' }} />} label={`${project.tasks_count || 0} task${(project.tasks_count || 0) !== 1 ? 's' : ''}`} sx={{ backgroundColor: 'rgba(191,167,106,0.13)', color: '#bfa76a', fontWeight: 600 }} />

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
