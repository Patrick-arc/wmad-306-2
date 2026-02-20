import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LoadingIndicator from '@/Components/LoadingIndicator';
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import darkTheme from '@/theme';


import { usePage } from '@inertiajs/react';

export default function CreateTask() {
    const page = usePage();
    const urlParams = new URLSearchParams(page.url.split('?')[1] || '');
    const initialProjectId = urlParams.get('project_id') || '';
    const { data, setData, post, errors, processing } = useForm({
        project_id: initialProjectId,
        title: '',
        description: '',
        priority: 'medium',
    });

    function submit(e) {
        e.preventDefault();
        post(route('tasks.store'), {
            onBefore: () => setData('status', 'pending'),
        });
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <AuthenticatedLayout
                header={
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Create Task
                    </Typography>
                }
            >
                <Head title="Create Task" />

                <Container maxWidth="md" sx={{ py: 4 }}>
                    <Link href={route('tasks.index')}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            sx={{ mb: 3 }}
                            color="inherit"
                        >
                            Back to Tasks
                        </Button>
                    </Link>

                    <Card>
                        <CardContent>
                            <form onSubmit={submit}>
                                {/* Project ID is now hidden and automated */}
                                <input type="hidden" value={data.project_id} name="project_id" />

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
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.priority}
                                >
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        value={data.priority}
                                        label="Priority"
                                        onChange={(e) =>
                                            setData('priority', e.target.value)
                                        }
                                    >
                                        <MenuItem value="low">Low</MenuItem>
                                        <MenuItem value="medium">
                                            Medium
                                        </MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Status selection removed, default is pending */}

                                {processing ? (
                                    <LoadingIndicator message="Creating task..." />
                                ) : (
                                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={processing}
                                        >
                                            Create Task
                                        </Button>
                                        <Link href={route('tasks.index')}>
                                            <Button color="inherit">Cancel</Button>
                                        </Link>
                                    </Box>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </AuthenticatedLayout>
        </ThemeProvider>
    );
}
