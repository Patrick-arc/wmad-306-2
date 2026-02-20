import { useForm } from '@inertiajs/react'
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useState } from 'react'

export default function DeleteUserForm() {
    const [open, setOpen] = useState(false)
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    })

    const closeModal = () => {
        setOpen(false)
        clearErrors()
        reset()
    }

    const deleteUser = (event) => {
        event.preventDefault()
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        })
    }

    return (
        <section>
            <Typography variant="h6" fontWeight={700} color="error.main">Delete Account</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                This permanently removes your account and all related data.
            </Typography>

            <Button color="error" variant="contained" onClick={() => setOpen(true)} sx={{ textTransform: 'none' }}>
                Delete Account
            </Button>

            <Dialog open={open} onClose={closeModal} fullWidth maxWidth="xs">
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Alert severity="warning">
                            This action cannot be undone.
                        </Alert>
                        <Typography color="text.secondary">
                            Enter your password to confirm deleting your account.
                        </Typography>
                        <TextField
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={deleteUser} color="error" variant="contained" disabled={processing}>
                        Delete Account
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    )
}
