import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { Button, Card, CardContent, Typography, Grid, Select, MenuItem } from '@mui/material';

export default function Index({ project, tasks }) {
    const destroy = (id) => {
        if (!confirm('Delete this task?')) return;
        Inertia.delete(route('tasks.destroy', id));
    };

    const toggle = (taskId) => {
        Inertia.post(route('tasks.toggle-status', taskId));
    };

    const changePriority = (task, value) => {
        Inertia.put(route('tasks.update', task.id), { ...task, priority: value });
    };

    return (
        <div>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5">Tasks for {project.title}</Typography>
                <Link href={route('projects.tasks.create', project.id)}>
                    <Button variant="contained">New Task</Button>
                </Link>
            </Grid>

            <Grid container spacing={2}>
                {tasks.map((t) => (
                    <Grid item xs={12} md={6} key={t.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{t.title}</Typography>
                                <Typography variant="body2">{t.description}</Typography>
                                <div style={{ marginTop: 8 }}>
                                    <Select size="small" value={t.priority} onChange={(e) => changePriority(t, e.target.value)} sx={{ mr: 1 }}>
                                        <MenuItem value="low">Low</MenuItem>
                                        <MenuItem value="medium">Medium</MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                    </Select>
                                    <Button size="small" onClick={() => toggle(t.id)}>Toggle Status ({t.status})</Button>
                                    <Link href={route('projects.tasks.edit', [project.id, t.id])}>
                                        <Button size="small">Edit</Button>
                                    </Link>
                                    <Button size="small" color="error" onClick={() => destroy(t.id)}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
