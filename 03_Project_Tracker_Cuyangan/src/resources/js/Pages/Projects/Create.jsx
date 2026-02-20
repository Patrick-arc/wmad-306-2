import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Box, 
    TextField,
    Grid
} from '@mui/material';
import { 
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon
} from '@mui/icons-material';

export default function Create({ auth }) {
    const { data, setData, post, errors, processing } = useForm({
        title: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => {
                // Redirect handled by controller
            }
        });
    };

    // Gradient button style
    const gradientButton = {
        background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
        color: '#fff',
        textTransform: 'none',
        '&:hover': {
            background: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
            boxShadow: '0 0 20px rgba(139,92,246,0.5)',
        },
    };

    // Form input violet style
    const formInputStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#8B5CF6' },
            '&:hover fieldset': { borderColor: '#6366F1' },
            '&.Mui-focused fieldset': { borderColor: '#4C1D95', borderWidth: 2 },
        },
        '& .MuiInputLabel-root': {
            color: '#4C1D95',
            '&.Mui-focused': { color: '#6366F1' },
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box display="flex" alignItems="center" gap={2}>
                    <Link href={route('projects.index')}>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                    <Typography variant="h5" component="h2" sx={{ color: '#4C1D95', fontWeight: 'bold' }}>
                        Create New Project
                    </Typography>
                </Box>
            }
        >
            <Head title="Create Project" />

            <Box sx={{ py: 6, px: { xs: 2, sm: 3, md: 6 }, background: 'linear-gradient(135deg,#1e1b4b,#312e81,#6366F1)', minHeight: '100vh' }}>
                <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
                    <Card sx={{ borderRadius: 3, background: '#F3F4F6', '&:hover': { boxShadow: '0 8px 20px rgba(139,92,246,0.2)' }, transition: '0.3s' }}>

                        {/* Gradient Header */}
                        <Box sx={{
                            p: 2,
                            borderRadius: '8px 8px 0 0',
                            mb: 2,
                            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            Create Your New Project 
                        </Box>

                        <CardContent>
                            <form onSubmit={handleSubmit} style={formInputStyle}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Project Title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            error={!!errors.title}
                                            helperText={errors.title}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            error={!!errors.description}
                                            helperText={errors.description}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box display="flex" gap={2} justifyContent="flex-end">
                                            <Link href={route('projects.index')}>
                                                <Button variant="outlined" sx={{ textTransform: 'none', borderColor: '#8B5CF6', color: '#4C1D95' }}>
                                                    Cancel
                                                </Button>
                                            </Link>
                                            <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={processing} sx={gradientButton}>
                                                Create Project
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
