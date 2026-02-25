import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Container, Typography, Button, Box, TextField, Grid, Card as MuiCard, CardContent 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack as BackIcon, Update as UpdateIcon } from '@mui/icons-material';

const Card = styled(MuiCard)(({ theme }) => ({
    borderRadius: '24px',
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Matches your dark theme
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    marginTop: theme.spacing(4),
}));

export default function Edit({ auth, project }) {
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Uses Route Model Binding for the update operation
        put(route('projects.update', project.id));
    };

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
            '&:hover fieldset': { borderColor: '#FF3131' },
        },
        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
        '& .MuiInputBase-input': { color: '#fff' }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Edit Project - ${project.title}`} />
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Button 
                        component={Link} href={route('projects.index')} startIcon={<BackIcon />}
                        sx={{ color: 'rgba(255, 255, 255, 0.6)', textTransform: 'none' }}
                    >
                        Back to Projects
                    </Button>
                    <Typography variant="h5" fontWeight="800" color="#fff">Edit Project</Typography>
                </Box>

                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth label="Project Title" value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        error={!!errors.title} helperText={errors.title}
                                        sx={inputStyles} required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth label="Description" multiline rows={4}
                                        value={data.description} onChange={e => setData('description', e.target.value)}
                                        sx={inputStyles}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth type="submit" variant="contained"
                                        disabled={processing} startIcon={<UpdateIcon />}
                                        sx={{ borderRadius: '12px', backgroundColor: '#FF3131', py: 1.5, '&:hover': { backgroundColor: '#D62828' } }}
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