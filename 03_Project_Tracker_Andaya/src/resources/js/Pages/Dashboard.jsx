import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Stack,
} from '@mui/material';
import {
    FolderOpen as FolderIcon,
    ListAlt as TaskIcon,
    CheckCircle as CompletedIcon,
    HourglassTop as InProgressIcon,
} from '@mui/icons-material';

const SummaryCard = ({ title, count, icon: Icon, color }) => (
    <Card
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            },
        }}
    >
        <CardContent
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: 2,
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: `${color}20`,
                }}
            >
                <Icon sx={{ fontSize: 32, color: color }} />
            </Box>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {count}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                    {title}
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

export default function Dashboard({ projects = [], tasks = [] }) {
    // Calculate statistics
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.is_completed).length;
    const inProgressTasks = totalTasks - completedTasks;

    const stats = [
        {
            title: 'Total Projects',
            count: totalProjects,
            icon: FolderIcon,
            color: '#667eea',
        },
        {
            title: 'Total Tasks',
            count: totalTasks,
            icon: TaskIcon,
            color: '#764ba2',
        },
        {
            title: 'Completed Tasks',
            count: completedTasks,
            icon: CompletedIcon,
            color: '#10b981',
        },
        {
            title: 'In Progress',
            count: inProgressTasks,
            icon: InProgressIcon,
            color: '#f59e0b',
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Dashboard
                </Typography>
            }
        >
            <Head title="Dashboard" />
            <Box sx={{ py: 4, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
                <Container maxWidth="lg">
                    {/* Welcome Message */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            Welcome Back!
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Here's an overview of your projects and tasks.
                        </Typography>
                    </Box>

                    {/* Summary Cards Grid */}
                    <Grid container spacing={3}>
                        {stats.map((stat, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <SummaryCard
                                    title={stat.title}
                                    count={stat.count}
                                    icon={stat.icon}
                                    color={stat.color}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Quick Actions */}
                    {totalProjects === 0 && (
                        <Card
                            sx={{
                                mt: 4,
                                p: 3,
                                textAlign: 'center',
                                backgroundColor: '#f0f4ff',
                                border: '2px dashed #667eea',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                No Projects Yet
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Create your first project to get started with task management.
                            </Typography>
                        </Card>
                    )}
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}
