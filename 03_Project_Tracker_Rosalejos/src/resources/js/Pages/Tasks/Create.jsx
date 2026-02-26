import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { TextField, Button, Box, Select, MenuItem } from '@mui/material';

export default function Create({ project }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [status, setStatus] = useState('todo');

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(route('projects.tasks.store', project.id), { title, description, priority, status });
    };

    return (
        <Box component="form" onSubmit={submit} sx={{ maxWidth: 600 }}>
            <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} required />
            <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} sx={{ mb: 2 }} />
            <Select fullWidth value={priority} onChange={(e) => setPriority(e.target.value)} sx={{ mb: 2 }}>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
            </Select>
            <Select fullWidth value={status} onChange={(e) => setStatus(e.target.value)} sx={{ mb: 2 }}>
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
            </Select>
            <Button type="submit" variant="contained">Create Task</Button>
        </Box>
    );
}
