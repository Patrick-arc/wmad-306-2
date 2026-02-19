import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Button, TextField, Card, CardContent, Typography } from '@mui/material'

export default function Index({ projects }) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const submit = () => {
        Inertia.post('/projects', {
            title,
            description
        })
    }

    return (
        <div style={{ padding: 20 }}>

            <Typography variant="h4" gutterBottom>
                Projects
            </Typography>

            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />

            <Button variant="contained" onClick={submit}>
                Add Project
            </Button>

            <div style={{ marginTop: 30 }}>
                {projects.map(project => (
                    <Card key={project.id} style={{ marginBottom: 15 }}>
                        <CardContent>
                            <Typography variant="h6">
                                {project.title}
                            </Typography>
                            <Typography>
                                {project.description}
                            </Typography>

                            <Button
                                color="error"
                                onClick={() =>
                                    Inertia.delete(`/projects/${project.id}`)
                                }
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
