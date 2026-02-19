import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
    Avatar,
} from '@mui/material';
import {
    Assignment,
    Edit,
    Delete,
} from '@mui/icons-material';
import { router, Link } from '@inertiajs/react';
import { useState } from 'react';
import PriorityChip from './PriorityChip';
import { useThemeContext } from './ThemeProvider';

const ProjectCard = ({ project }) => {
    const { theme } = useThemeContext();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this project? This will also delete all associated tasks.')) {
            setIsDeleting(true);
            router.delete(route('projects.destroy', project.id), {
                onFinish: () => setIsDeleting(false),
            });
        }
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                        sx={{
                            bgcolor: '#3f51b5',
                            color: 'white',
                            mr: 2,
                            width: 40,
                            height: 40
                        }}
                    >
                        <Assignment />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography 
                            variant="h6" 
                            component="h2" 
                            sx={{ 
                                fontWeight: 'bold',
                                color: '#1a237e',
                                mb: 0.5
                            }}
                        >
                            {project.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {project.tasks_count || 0} tasks
                        </Typography>
                    </Box>
                </Box>
                
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    sx={{ 
                        mb: 2,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {project.description || 'No description provided'}
                </Typography>

                {project.tasks_count > 0 && (
                    <Box sx={{ mt: 'auto' }}>
                        <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
                            Recent Activity
                        </Typography>
                        <Box display="flex" gap={1} flexWrap="wrap">
                            <Chip 
                                label="Active" 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                )}
            </CardContent>
            
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<Edit />}
                    component={Link}
                    href={route('projects.edit', project.id)}
                    sx={{
                        background: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'medium',
                        '&:hover': {
                            background: theme.palette.primary.dark,
                        }
                    }}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleDelete}
                    disabled={isDeleting}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'medium'
                    }}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProjectCard;
