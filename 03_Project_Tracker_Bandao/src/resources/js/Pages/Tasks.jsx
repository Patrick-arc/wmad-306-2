import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Container,
  Stack,
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

// ================= DASHBOARD STATS =================
function DashboardStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mb={4}>
       <Card
                sx={{
                    flex: 1,
                    borderRadius: 4,
                    boxShadow: '0 6px 20px rgba(67,97,238,0.15)',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                }}
            >
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">Total Tasks</Typography>
                    <Typography variant="h3" fontWeight="bold">{totalTasks}</Typography>
                </CardContent>
            </Card>
         <Card
                sx={{
                    flex: 1,
                    borderRadius: 4,
                    boxShadow: '0 6px 20px rgba(67,97,238,0.15)',
                     background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                }}
            >
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">Completed</Typography>
                    <Typography variant="h3" fontWeight="bold">{completedTasks}</Typography>
                </CardContent>
            </Card>
       <Card
                sx={{
                    flex: 1,
                    borderRadius: 4,
                    boxShadow: '0 6px 20px rgba(67,97,238,0.15)',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                }}
            >
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">Pending</Typography>
                    <Typography variant="h3" fontWeight="bold">{pendingTasks}</Typography>
                </CardContent>
            </Card>
       <Card
                sx={{
                    flex: 1,
                    borderRadius: 4,
                    boxShadow: '0 6px 20px rgba(67,97,238,0.15)',
                     background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                }}
            >
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">In Progress</Typography>
                    <Typography variant="h3" fontWeight="bold">{inProgressTasks}</Typography>
                </CardContent>
            </Card>
    </Stack>
  );
}

// ================= TASK COMPONENT =================
export default function Tasks({ tasks: initialTasks = [] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const { data, setData, post, put, delete: destroy, reset } = useForm({
    title: '',
    description: '',
    completed: false,
    status: 'pending',
    priority: 'low',
  });
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  // Update tasks if props change
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // ================= DIALOG HANDLERS =================
  const handleOpen = (task = null) => {
    if (task) {
      setEditing(task);
      setData(task);
    } else {
      setEditing(null);
      reset();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    reset();
  };

  // ================= FORM SUBMIT =================
  const submit = (e) => {
    e.preventDefault();

    if (editing) {
      // Update locally first (optimistic UI)
      setTasks(prev => prev.map(t => t.id === editing.id ? { ...t, ...data } : t));
      put(`/tasks/${editing.id}`, {
        data,
        onSuccess: handleClose,
      });
    } else {
      post('/tasks', {
        data,
        onSuccess: (page) => {
          // Add newly created task to local state
          setTasks([...tasks, page.props.task]);
          handleClose();
        },
      });
    }
  };

  // ================= DELETE TASK =================
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      destroy(`/tasks/${id}`, {
        onSuccess: () => setTasks(prev => prev.filter(t => t.id !== id)),
      });
    }
  };

  // ================= TOGGLE COMPLETION =================
  const toggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed, status: !task.completed ? 'completed' : task.status };
    setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
    put(`/tasks/${task.id}`, { data: updatedTask });
  };

  const statusColor = (status) => ({
    pending: 'warning',
    in_progress: 'info',
    completed: 'success',
  }[status] || 'default');

  const priorityColor = (priority) => ({
    low: 'success',
    medium: 'warning',
    high: 'error',
  }[priority] || 'default');

  // ================= RENDER =================
  return (
    <AuthenticatedLayout>
      <Head title="Tasks" />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fb', py: 6 }}>
        <Container>

          {/* Dashboard Stats */}
          <DashboardStats tasks={tasks} />

          {/* Header */}
          <Stack direction="row" justifyContent="space-between" mb={4} alignItems="center">
            <Typography variant="h4" fontWeight="bold" color="#2c3e50">
              Tasks
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ borderRadius: 2, px: 3, backgroundColor: '#4361ee', '&:hover': { backgroundColor: '#3a50c0' } }}
              onClick={() => handleOpen()}
            >
              Add Task
            </Button>
          </Stack>

          {/* Tasks Grid */}
          <Grid container spacing={3}>
            {tasks.length === 0 && (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                No tasks yet. Click "Add Task" to get started!
              </Typography>
            )}
            {tasks.map((task) => (
              <Grid item xs={12} md={4} key={task.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" fontWeight="bold" color="#2c3e50">
                        {task.title}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <IconButton sx={{ color: '#4361ee' }} onClick={() => handleOpen(task)}>
                          <Edit />
                        </IconButton>
                        <IconButton sx={{ color: '#ff4d4d' }} onClick={() => handleDelete(task.id)}>
                          <Delete />
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Typography variant="body2" color="#555" sx={{ mt: 1 }}>
                      {task.description}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={2}>
                      <Chip label={`Status: ${task.status.replace('_', ' ')}`} color={statusColor(task.status)} size="small" />
                      <Chip label={`Priority: ${task.priority}`} color={priorityColor(task.priority)} size="small" />
                    </Stack>

                    <FormControlLabel
                      control={<Checkbox checked={task.completed} onChange={() => toggleComplete(task)} sx={{ color: '#4361ee' }} />}
                      label="Completed"
                      sx={{ mt: 1, color: '#2c3e50' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Add/Edit Task Dialog */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ color: '#2c3e50' }}>
              {editing ? 'Edit Task' : 'Add Task'}
            </DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ style: { color: '#555' } }}
                  inputProps={{ style: { color: '#2c3e50' } }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ style: { color: '#555' } }}
                  inputProps={{ style: { color: '#2c3e50' } }}
                />
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ style: { color: '#555' } }}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Priority"
                  value={data.priority}
                  onChange={(e) => setData('priority', e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ style: { color: '#555' } }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </TextField>
                <FormControlLabel
                  control={<Checkbox checked={data.completed} onChange={(e) => setData('completed', e.target.checked)} sx={{ color: '#4361ee' }} />}
                  label="Completed"
                  sx={{ color: '#2c3e50' }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: '#4361ee' }} onClick={handleClose}>Cancel</Button>
              <Button variant="contained" sx={{ backgroundColor: '#4361ee', '&:hover': { backgroundColor: '#3a50c0' } }} onClick={submit}>
                {editing ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </AuthenticatedLayout>
  );
}