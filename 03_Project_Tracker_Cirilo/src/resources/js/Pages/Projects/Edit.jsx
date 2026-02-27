import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Box,
    Button,
    Container,
    TextField,
    ThemeProvider,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import darkTheme from '@/theme';

export default function EditProject({ project }) {
    const { data, setData, patch, errors, processing } = useForm({
        title: project.title,
        description: project.description,
    });

    function submit(e) {
        e.preventDefault();
        patch(route('projects.update', project.id));
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <AuthenticatedLayout
                header={
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Edit Project
                    </Typography>
                }
            >
                <Head title="Edit Project" />

                <Container maxWidth="md" sx={{ py: 4 }}>
                    <Link href={route('projects.index')}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            sx={{ mb: 3 }}
                            color="inherit"
                        >
                            Back to Projects
                        </Button>
                    </Link>

                    <Card>
                        <CardContent>
                            <form onSubmit={submit}>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    error={!!errors.title}
                                    helperText={errors.title}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={6}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={processing}
                                    >
                                        Update Project
                                    </Button>
                                    <Link
                                        href={route(
                                            'projects.show',
                                            project.id,
                                        )}
                                    >
                                        <Button color="inherit">Cancel</Button>
                                    </Link>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </AuthenticatedLayout>
        </ThemeProvider>
    );
}
