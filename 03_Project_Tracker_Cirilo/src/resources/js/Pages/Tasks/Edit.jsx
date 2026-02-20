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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import darkTheme from '@/theme';

export default function EditTask({ task }) {
    const { data, setData, patch, errors, processing } = useForm({
        project_id: task.project_id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
    });

    function submit(e) {
        e.preventDefault();
        patch(route('tasks.update', task.id));
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <AuthenticatedLayout
                header={
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Edit Task
                    </Typography>
                }
            >
                <Head title="Edit Task" />

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
                                <TextField
                                    label="Project ID"
                                    fullWidth
                                    type="number"
                                    value={data.project_id}
                                    onChange={(e) =>
                                        setData('project_id', e.target.value)
                                    }
                                    error={!!errors.project_id}
                                    helperText={errors.project_id}
                                    margin="normal"
                                    variant="outlined"
                                />

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

                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.status}
                                >
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={data.status}
                                        label="Status"
                                        onChange={(e) =>
                                            setData('status', e.target.value)
                                        }
                                    >
                                        <MenuItem value="pending">
                                            Pending
                                        </MenuItem>
                                        <MenuItem value="in_progress">
                                            In Progress
                                        </MenuItem>
                                        <MenuItem value="completed">
                                            Completed
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={processing}
                                    >
                                        Update Task
                                    </Button>
                                    <Link href={route('tasks.index')}>
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
