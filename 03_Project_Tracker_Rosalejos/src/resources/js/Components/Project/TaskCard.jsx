import React from 'react';
import { Card, CardContent, Stack, Typography, Chip, Box, IconButton, Tooltip, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PrimaryButton from '@/Components/UI/PrimaryButton';

export default function TaskCard({ task, onDelete, onStart, onDone }) {
    const priority = (task.priority || 'medium').toLowerCase();
    const priorityColor = priority === 'high' ? 'error' : priority === 'low' ? 'default' : 'warning';

    const assignees = task.assignees || [];

    return (
        <Card
            elevation={1}
            sx={{
                position: 'relative',
                borderRadius: 2,
                width: '100%',
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(245,243,255,0.9))',
                border: '1px solid rgba(16,24,40,0.04)'
            }}
        >
            <CardContent sx={{ py: 2, px: 2, display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                {onDelete && (
                    <IconButton size="small" onClick={() => onDelete(task)} sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }} aria-label={`delete-task-${task.id}`}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ gap: 1 }}>
                    <Box sx={{ pr: 2, minWidth: 0, flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{task.description || '-'}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, flexShrink: 0, pr: 3 }}>
                        <Chip label={(task.priority || 'Medium').toUpperCase()} size="small" color={priorityColor} variant="outlined" sx={{ textTransform: 'none' }} />
                    </Box>
                </Stack>

                {/* task.type removed — To-do is already indicated by the column */}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {onStart && task.status === 'todo' && (
                            <PrimaryButton type="button" size="small" onClick={() => onStart(task)} startIcon={<PlayArrowIcon fontSize="small" />}>
                                Start
                            </PrimaryButton>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {onDone && task.status !== 'done' && (
                            <Button
                                type="button"
                                variant="outlined"
                                color="success"
                                size="small"
                                onClick={() => onDone(task)}
                                startIcon={<CheckIcon fontSize="small" />}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    minWidth: 72,
                                    py: 0.5,
                                    px: 1.5,
                                    fontWeight: 600,
                                    boxShadow: 'none',
                                }}
                            >
                                Done
                            </Button>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
