import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Box, Typography, TextField, Button, Card } from '@mui/material';

export default function Create() {
    return (
        <AuthenticatedLayout>
            <Head title="Create Project" />
            <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
                <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                        Create New Project
                    </Typography>
                    <form method="POST" action="/projects">
                        <TextField
                            name="title"
                            label="Project Title"
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            fullWidth
                            multiline
                            minRows={2}
                            sx={{ mb: 3 }}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button type="submit" variant="contained" color="primary">
                                Create
                            </Button>
                            <Link href="/projects" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined">Cancel</Button>
                            </Link>
                        </Box>
                    </form>
                </Card>
            </Box>
        </AuthenticatedLayout>
    );
}
