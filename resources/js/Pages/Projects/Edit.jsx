import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Container, Typography, Button, Box, TextField, Grid, Card as MuiCard, CardContent 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack as BackIcon, Update as UpdateIcon } from '@mui/icons-material';

// Styled Card component to prevent 'Card is not defined' errors
const Card = styled(MuiCard)(({ theme }) => ({
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
    marginTop: theme.spacing(4),
}));

export default function Edit({ auth, project }) {
    // Pre-fill the form with existing project data
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Uses the standard resource update route
        put(route('projects.update', project.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box display="flex" alignItems="center" gap={2}>
                    <Button 
                        component={Link} 
                        href={route('projects.index')} 
                        startIcon={<BackIcon />}
                        sx={{ color: '#6b7280', textTransform: 'none' }}
                    >
                        Back to Projects
                    </Button>
                    <Typography variant="h5" fontWeight="800">Edit Project</Typography>
                </Box>
            }
        >
            <Head title={`Edit ${project.title}`} />

            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Project Title"
                                        variant="outlined"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        error={!!errors.title}
                                        helperText={errors.title}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        error={!!errors.description}
                                        helperText={errors.description}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={processing}
                                        startIcon={<UpdateIcon />}
                                        sx={{ 
                                            borderRadius: '12px', 
                                            backgroundColor: '#a855f7',
                                            py: 1.5,
                                            '&:hover': { backgroundColor: '#9333ea' }
                                        }}
                                    >
                                        Update Project
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}