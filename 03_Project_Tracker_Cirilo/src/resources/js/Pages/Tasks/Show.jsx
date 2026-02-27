import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    ThemeProvider,
    Typography,
    Chip,
    IconButton,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import darkTheme from '@/theme';

export default function ShowTask({ task }) {
    const getPriorityColor = (priority) => {
        const colors = {
            low: '#66bb6a',
            medium: '#ffa726',
            high: '#ef5350',
        };
        return colors[priority] || '#b0bec5';
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#90caf9',
            in_progress: '#ffa726',
            completed: '#66bb6a',
        };
        return colors[status] || '#b0bec5';
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <AuthenticatedLayout
                header={
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {task.title}
                    </Typography>
                }
            >
                <Head title={task.title} />

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

                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                    mb: 3,
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                            color: '#64b5f6',
                                        }}
                                    >
                                        {task.title}
                                    </Typography>
                                </Box>
                                <Link
                                    href={route('tasks.edit', task.id)}
                                >
                                    <IconButton
                                        color="primary"
                                        title="Edit task"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#b0bec5',
                                    mb: 3,
                                    lineHeight: 1.8,
                                }}
                            >
                                {task.description}
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: '#b0bec5', mb: 1 }}
                                >
                                    Details:
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns:
                                            'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: '#757575' }}
                                        >
                                            Project ID
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#fff' }}
                                        >
                                            {task.project_id}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: '#757575' }}
                                        >
                                            Priority
                                        </Typography>
                                        <Typography variant="body2">
                                            <Chip
                                                label={task.priority}
                                                size="small"
                                                sx={{
                                                    backgroundColor:
                                                        getPriorityColor(
                                                            task.priority,
                                                        ),
                                                    color: '#000',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: '#757575' }}
                                        >
                                            Status
                                        </Typography>
                                        <Typography variant="body2">
                                            {/* Status as radio buttons */}
                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                {[{label: 'Pending', value: 'pending'}, {label: 'Ongoing', value: 'in_progress'}, {label: 'Completed', value: 'completed'}].map(opt => (
                                                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <input
                                                            type="radio"
                                                            name={`status-${task.id}`}
                                                            value={opt.value}
                                                            checked={task.status === opt.value}
                                                            disabled
                                                            style={{ accentColor: getStatusColor(opt.value) }}
                                                        />
                                                        <span style={{ color: getStatusColor(opt.value), fontWeight: 500 }}>{opt.label}</span>
                                                    </label>
                                                ))}
                                            </Box>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ pt: 2, borderTop: '1px solid #424242' }}>
                                <Typography
                                    variant="caption"
                                    sx={{ color: '#757575' }}
                                >
                                    Created:{' '}
                                    {new Date(
                                        task.created_at,
                                    ).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    <Link href={route('tasks.edit', task.id)}>
                        <Button variant="contained" color="primary">
                            Edit Task
                        </Button>
                    </Link>
                </Container>
            </AuthenticatedLayout>
        </ThemeProvider>
    );
}
