import React, { useState, useMemo, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import axios from 'axios';
import {
  Box, Stack, Card, CardContent, Typography, TextField, Button,
  IconButton, createTheme, ThemeProvider, InputAdornment,
  Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert, Chip, Switch
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// CSRF setup
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

export default function ProjectsPage() {
  const { projects: initialProjects = [] } = usePage().props;

  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const { data: addData, setData: setAddData, reset: resetAdd } = useForm({ title: '', description: '', status: 'active' });
  const [taskData, setTaskData] = useState({ title: '', description: '', priority: '1', status: 'not_yet_done' });

  useEffect(() => localStorage.setItem('darkMode', darkMode), [darkMode]);

  // ---------------- Theme ----------------
  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#6C5DD3' },
      secondary: { main: '#FFB86C' },
      background: { default: darkMode ? '#1A1A2E' : '#F5F3FF', paper: darkMode ? '#222244' : '#FFFFFF' },
      text: { primary: darkMode ? '#FFFFFF' : '#000000', secondary: darkMode ? '#AAAAFF' : '#555555' }
    },
    shape: { borderRadius: 20 },
    typography: { fontFamily: 'Roboto, sans-serif' }
  }), [darkMode]);

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  // ---------------- Handlers ----------------
  const handleAddProject = async () => {
    if (!addData.title.trim()) return;
    try {
      const res = await axios.post('/projects', addData);
      setProjects(prev => [...prev, res.data]);
      resetAdd();
      setSnackbar({ open: true, message: 'Project added ✅', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to add project ❌', severity: 'error' });
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`/projects/${projectId}`);
      setProjects(prev => prev.filter(p => p.id !== projectId));
      setSnackbar({ open: true, message: 'Project deleted 🗑️', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete project ❌', severity: 'error' });
    }
  };

  const handleSaveTask = async () => {
    const projectId = editingTask?.projectId || selectedProject?.id;
    if (!projectId || !taskData.title.trim()) return;
    try {
      let res;
      if (editingTask) {
        res = await axios.put(`/projects/${projectId}/tasks/${editingTask.id}`, taskData);
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, tasks: p.tasks.map(t => t.id === editingTask.id ? res.data : t) } : p));
      } else {
        res = await axios.post(`/projects/${projectId}/tasks`, taskData);
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, tasks: [...(p.tasks || []), res.data] } : p));
      }
      setTaskData({ title: '', description: '', priority: '1', status: 'not_yet_done' });
      setEditingTask(null); setSelectedProject(null);
      setSnackbar({ open: true, message: 'Task saved ✅', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to save task ❌', severity: 'error' });
    }
  };

  const handleDeleteTask = async (projectId, taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`/projects/${projectId}/tasks/${taskId}`);
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) } : p));
      setSnackbar({ open: true, message: 'Task deleted 🗑️', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete task ❌', severity: 'error' });
    }
  };

  // ---------------- Render ----------------
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Top-left Back to Dashboard Button (Fixed) */}
        <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 2000 }}>
          <Button variant="contained" color="secondary" onClick={() => window.location.href = '/dashboard'}>
            Back to Dashboard
          </Button>
        </Box>

        {/* Top-right Dark Mode Switch (Fixed) */}
        <Box sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          backgroundColor: 'transparent'
        }}>
          <DarkModeIcon sx={{ color: theme.palette.primary.main }} />
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box>

        {/* Header */}
        <Box sx={{ width: '100%', maxWidth: 800, mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              background: 'linear-gradient(90deg, #6C5DD3, #FFB86C)',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Project Dashboard
          </Typography>
        </Box>

        {/* Search + Add Project */}
        <Box sx={{ width: '100%', maxWidth: 600, mb: 6 }}>
          <TextField
            fullWidth
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ mb: 3, borderRadius: 2, backgroundColor: darkMode ? '#222244' : '#F3F0FF', input: { color: theme.palette.text.primary } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: theme.palette.text.primary }} /></InputAdornment> }}
          />
          <Card sx={{ mb: 4, boxShadow: 6, borderRadius: 3, p: 3, background: darkMode ? '#2a2a4d' : 'linear-gradient(135deg, #EDE7FF, #F5F3FF)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>Add New Project</Typography>
              <Stack spacing={2}>
                <TextField label="Title" fullWidth value={addData.title} onChange={e => setAddData('title', e.target.value)} sx={{ input: { color: theme.palette.text.primary } }} />
                <TextField label="Description" fullWidth multiline rows={2} value={addData.description} onChange={e => setAddData('description', e.target.value)} sx={{ input: { color: theme.palette.text.primary } }} />
                <Select value={addData.status} onChange={e => setAddData('status', e.target.value)} fullWidth sx={{ color: theme.palette.text.primary }}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddProject} sx={{ backgroundColor: '#6C5DD3', '&:hover': { backgroundColor: '#574dcf' } }}>Add Project</Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Projects List */}
        <Box sx={{ width: '100%', maxWidth: 800 }}>
          {filteredProjects.map(project => (
            <Card key={project.id} sx={{ mb: 3, borderRadius: 3, boxShadow: 6, backgroundColor: darkMode ? '#222244' : '#F9F5FF', transition: '0.3s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0 15px 40px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>{project.title}</Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{project.description}</Typography>
                <Stack direction="row" spacing={2} mt={2}>
                  <Button variant="outlined" sx={{ borderColor: '#6C5DD3', color: '#6C5DD3' }} onClick={() => setSelectedProject(project)}>Add Task</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
                </Stack>

                {(project.tasks || []).map(task => (
                  <Card key={task.id} sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 3, backgroundColor: darkMode ? '#333366' : '#fff' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography fontWeight="bold" sx={{ color: theme.palette.text.primary }}>{task.title}</Typography>
                        {task.description && <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{task.description}</Typography>}
                        <Chip label={`Priority ${task.priority}`} size="small" color={task.priority === '1' ? 'default' : task.priority === '2' ? 'warning' : 'error'} sx={{ mt: 1, mr: 1 }} />
                        <Chip label={task.status === 'completed' ? 'Completed' : 'Active'} size="small" color={task.status === 'completed' ? 'success' : 'primary'} />
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <IconButton color="primary" onClick={() => { setEditingTask({ ...task, projectId: project.id }); setTaskData(task); }}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteTask(project.id, task.id)}><DeleteIcon /></IconButton>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Task Modal */}
        <Dialog open={!!selectedProject || !!editingTask} onClose={() => { setSelectedProject(null); setEditingTask(null); }} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: theme.palette.text.primary }}>{editingTask ? 'Edit Task' : `Add Task for ${selectedProject?.title}`}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField label="Title" fullWidth value={taskData.title} onChange={e => setTaskData({ ...taskData, title: e.target.value })} sx={{ input: { color: theme.palette.text.primary } }} />
              <TextField label="Description" fullWidth multiline rows={2} value={taskData.description} onChange={e => setTaskData({ ...taskData, description: e.target.value })} sx={{ input: { color: theme.palette.text.primary } }} />
              <Select fullWidth value={taskData.priority} onChange={e => setTaskData({ ...taskData, priority: e.target.value })} sx={{ color: theme.palette.text.primary }}>
                <MenuItem value="1">Low</MenuItem>
                <MenuItem value="2">Medium</MenuItem>
                <MenuItem value="3">High</MenuItem>
              </Select>
              <Select fullWidth value={taskData.status} onChange={e => setTaskData({ ...taskData, status: e.target.value })} sx={{ color: theme.palette.text.primary }}>
                <MenuItem value="not_yet_done">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setSelectedProject(null); setEditingTask(null); }}>Cancel</Button>
            <Button variant="contained" sx={{ backgroundColor: '#6C5DD3', '&:hover': { backgroundColor: '#574dcf' } }} onClick={handleSaveTask}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>

      </Box>
    </ThemeProvider>
  );
}