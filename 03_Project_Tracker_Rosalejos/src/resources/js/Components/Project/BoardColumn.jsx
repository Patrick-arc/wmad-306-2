import React, { useState } from 'react';
import { Paper, Stack, Typography, IconButton, Chip, Divider, Box, ButtonBase } from '@mui/material';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TaskCard from '@/Components/Project/TaskCard';

export default function BoardColumn({ title, tasks = [], onAdd, onDelete, onStart, onDone, pageSize = 4 }) {
    const PAGE_SIZE = pageSize;
    const [page, setPage] = useState(0);

    const totalPages = Math.max(1, Math.ceil((tasks?.length || 0) / PAGE_SIZE));

    console.debug && console.debug(`BoardColumn (${title}) rendering, tasks: ${tasks?.length || 0}`);

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageTasks = (tasks || []).slice(start, end);

    // Reset page when tasks change so page index doesn't go out of range
    React.useEffect(() => {
        if (page > totalPages - 1) setPage(0);
    }, [tasks, totalPages]);

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2.5,
                borderRadius: 2,
                minHeight: 240,
                border: '1px solid rgba(16,24,40,0.08)',
                background: 'linear-gradient(135deg, rgba(124,98,255,0.12), rgba(245,243,255,0.06))',
                backgroundBlendMode: 'normal',
                boxShadow: '0 6px 18px rgba(124,98,255,0.04)',
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>{title}</Typography>
                    <Chip label={tasks.length} size="small" color="primary" variant="outlined" sx={{ ml: 1 }} />
                </Stack>

                <IconButton size="small" color="primary" onClick={onAdd} aria-label="add task">
                    <AddCircleOutlineIcon />
                </IconButton>
            </Stack>

            <Divider sx={{ mb: 1 }} />

            <Box sx={{ mb: 1, pr: 1 }}>
                {pageTasks.length > 0 ? (
                    <Stack spacing={1}>
                        {pageTasks.map((t) => (
                            <Box key={t.id} sx={{ px: 0 }}>
                                <TaskCard
                                    task={t}
                                    onDelete={onDelete}
                                    onStart={onStart}
                                    onDone={t.status === 'todo' ? undefined : onDone}
                                />
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 220, p: 2 }}>
                        <Paper elevation={0} sx={{ border: '1px dashed rgba(16,24,40,0.06)', borderRadius: 1.5, p: 2, width: '100%', textAlign: 'center', bgcolor: 'transparent' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>No tasks yet</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>There are no tasks for this column. Create your first one now.</Typography>
                            <PrimaryButton onClick={onAdd} size="small">Create Task</PrimaryButton>
                        </Paper>
                    </Box>
                )}
            </Box>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    <IconButton size="small" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="previous page">
                        <ChevronLeftIcon fontSize="small" />
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <ButtonBase
                                key={i}
                                onClick={() => setPage(i)}
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    bgcolor: i === page ? 'primary.main' : 'grey.300',
                                    mx: 0.5,
                                    transition: 'all 150ms ease',
                                    transform: i === page ? 'scale(1.25)' : 'none',
                                }}
                                aria-label={`go to page ${i + 1}`}
                            />
                        ))}
                    </Box>

                    <IconButton size="small" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} aria-label="next page">
                        <ChevronRightIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </Paper>
    );
}
