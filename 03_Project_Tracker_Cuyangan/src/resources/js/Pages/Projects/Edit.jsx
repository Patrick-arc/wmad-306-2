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
    Grid,
    LinearProgress
} from '@mui/material';
import { 
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon
} from '@mui/icons-material';

export default function Edit({ auth, project, stats = {} }) {
    const { data, setData, put, errors, processing } = useForm({
        title: project.title || '',
        description: project.description || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('projects.update', project.id));
    };

    // Example project completion % (optional)
    const totalTasks = stats.totalTasks || 0;
    const completedTasks = stats.completedTasks || 0;
    const completion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box display="flex" alignItems="center" gap={2}>
                    <Link href={route('projects.index')}>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ 
                                textTransform: 'none', 
                                color: '#8B5CF6', 
                                borderColor: '#8B5CF6',
                                '&:hover': { borderColor: '#6366F1', color: '#FFFFFF' }
                            }}
                        >
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                    <Typography variant="h5" sx={{ color: '#0b0b0b' }}>
                        Edit Project
                    </Typography>
                </Box>
            }
        >
            <Head title="Edit Project" />

            {/* Full page background */}
            <Box sx={{
                minHeight: '100vh',
                p: 3,
                background: 'linear-gradient(135deg,#1e1b4b,#312e81,#6366F1)',
            }}>
                <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
                    {/* LIGHT CARD WITH HOVER EFFECT */}
                    <Card sx={{
                        borderRadius: 4,
                        background: '#F3F4F6', 
                        p: 2,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        transition: '0.3s',
                        '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 8px 25px rgba(139,92,246,0.3)'
                        }
                    }}>
                        {/* Gradient header */}
                        <Box sx={{
                            p: 2,
                            borderRadius: '8px 8px 0 0',
                            mb: 2,
                            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                            color: '#FFFFFF',
                            fontWeight: 'bold', 
                            textAlign: 'center'
                        }}>
                            Project Details
                        </Box>

                        {/* Optional progress */}
                        {totalTasks > 0 && (
                            <Box mb={3}>
                                <Typography variant="subtitle2" sx={{ color: '#4C1D95', mb: 1 }}>
                                    Project Completion: {completion}%
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={completion}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        '& .MuiLinearProgress-bar': {
                                            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)'
                                        }
                                    }}
                                />
                            </Box>
                        )}

                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    {/* Project Title */}
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
                                            sx={{
                                                input: { color: '#1F2937' },
                                                label: { color: '#4C1D95' },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: 'rgba(0,0,0,0.2)' },
                                                    '&:hover fieldset': { borderColor: '#8B5CF6' },
                                                    '&.Mui-focused fieldset': { borderColor: '#8B5CF6' }
                                                }
                                            }}
                                        />
                                    </Grid>

                                    {/* Description */}
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
                                            sx={{
                                                input: { color: '#1F2937' },
                                                label: { color: '#4C1D95' },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: 'rgba(0,0,0,0.2)' },
                                                    '&:hover fieldset': { borderColor: '#8B5CF6' },
                                                    '&.Mui-focused fieldset': { borderColor: '#8B5CF6' }
                                                }
                                            }}
                                        />
                                    </Grid>

                                    {/* Buttons */}
                                    <Grid item xs={12}>
                                        <Box display="flex" gap={2} justifyContent="flex-end">
                                            <Link href={route('projects.index')}>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        textTransform: 'none',
                                                        color: '#8B5CF6',
                                                        borderColor: '#8B5CF6',
                                                        '&:hover': { borderColor: '#6366F1', color: '#FFFFFF' }
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Link>

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                startIcon={<SaveIcon />}
                                                disabled={processing}
                                                sx={{
                                                    textTransform: 'none',
                                                    background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                                                    boxShadow: '0 0 20px rgba(139,92,246,0.5)',
                                                    '&:hover': { boxShadow: '0 0 30px rgba(139,92,246,0.9)' }
                                                }}
                                            >
                                                Update Project
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
