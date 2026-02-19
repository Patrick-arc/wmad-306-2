import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Button, 
    TextField, 
    Typography, 
    Container, 
    MenuItem, 
    Select,
    FormControl,
    InputLabel,
    Box,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';
import { useThemeContext } from '@/Components/ThemeProvider';
import { useState, useEffect } from 'react';

export default function Create({ projects }) {
    const { theme } = useThemeContext();
    const { data, setData, post, processing, errors } = useForm({
        project_id: projects[0]?.id || '',
        title: '',
        description: '',
        priority: 'important',
        status: 'pending',
        due_date: '',
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    function submit(e) {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => {
                setSnackbar({
                    open: true,
                    message: 'Task successfully created!',
                    severity: 'success'
                });
                // Redirect to tasks index after successful creation
                setTimeout(() => {
                    router.visit(route('tasks.index'));
                }, 1500);
            },
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Error creating task. Please check form.',
                    severity: 'error'
                });
            }
        });
    }

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    Create Task
                </Typography>
            }
        >
            <Head title="Create Task" />

            <Container maxWidth="md" sx={{ mt: 3, mb: 4 }}>
                <Paper sx={{ p: 4, borderRadius: 3 }}>
                    <form onSubmit={submit}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.text.primary }}>
                            Create New Task
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth error={!!errors.project_id}>
                                <InputLabel>Project</InputLabel>
                                <Select
                                    value={data.project_id}
                                    label="Project"
                                    onChange={(e) => setData('project_id', e.target.value)}
                                    required
                                >
                                    {projects.map((project) => (
                                        <MenuItem key={project.id} value={project.id}>
                                            {project.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.project_id && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                        {errors.project_id}
                                    </Typography>
                                )}
                            </FormControl>

                            <TextField
                                label="Title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                fullWidth
                                required
                                error={!!errors.title}
                                helperText={errors.title}
                            />

                            <TextField
                                label="Description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                fullWidth
                                multiline
                                rows={4}
                                error={!!errors.description}
                                helperText={errors.description}
                            />

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <FormControl sx={{ minWidth: 150 }}>
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        value={data.priority}
                                        label="Priority"
                                        onChange={(e) => setData('priority', e.target.value)}
                                    >
                                        <MenuItem value="less important">Less Important</MenuItem>
                                        <MenuItem value="important">Important</MenuItem>
                                        <MenuItem value="very important">Very Important</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ minWidth: 150 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={data.status}
                                        label="Status"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <MenuItem value="pending">Pending</MenuItem>
                                        <MenuItem value="on going">On Going</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Due Date"
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ minWidth: 150 }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button 
                                    variant="contained" 
                                    type="submit" 
                                    disabled={processing}
                                    sx={{
                                        background: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        padding: '10px 24px',
                                        fontWeight: 'bold',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: theme.palette.primary.dark,
                                        }
                                    }}
                                >
                                    {processing ? 'Creating...' : 'Create Task'}
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => router.visit(route('tasks.index'))}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </Container>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </AuthenticatedLayout>
    );
}
