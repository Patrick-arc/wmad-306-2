import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { TextField, Button, Box } from '@mui/material';

export default function Edit({ project }) {
    const [title, setTitle] = useState(project.title || '');
    const [description, setDescription] = useState(project.description || '');

    const submit = (e) => {
        e.preventDefault();
        Inertia.put(route('projects.update', project.id), { title, description });
    };

    return (
        <Box component="form" onSubmit={submit} sx={{ maxWidth: 600 }}>
            <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} required />
            <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} sx={{ mb: 2 }} />
            <Button type="submit" variant="contained">Save</Button>
        </Box>
    );
}
