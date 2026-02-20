import { Head, useForm } from '@inertiajs/react'
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Container,
} from '@mui/material'

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('projects.store'))
    }

    return (
        <>
            <Head title="Create Project" />

            <Container maxWidth="sm">
                <Box sx={{ py: 6 }}>
                    <Typography variant="h4" fontWeight={700} mb={4}>
                        Create Project
                    </Typography>

                    <form onSubmit={submit}>
                        <Stack spacing={3}>
                            <TextField
                                label="Title"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                error={!!errors.title}
                                helperText={errors.title}
                                fullWidth
                            />

                            <TextField
                                label="Description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                multiline
                                rows={4}
                                fullWidth
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                            >
                                Create
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </>
    )
}