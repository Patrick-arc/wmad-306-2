import React, { useState, useMemo, useEffect, useRef } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';
import axios from 'axios';
import {
  Box, Stack, Card, CardContent, Typography, TextField, Button,
  IconButton, Switch, createTheme, ThemeProvider, LinearProgress,
  InputAdornment, Select, MenuItem, Dialog, DialogTitle, DialogContent,
  DialogActions, Snackbar, Alert
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ProjectsPage() {
  const { projects: initialProjects = [] } = usePage().props;

  // Dark Mode
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  useEffect(() => { localStorage.setItem('darkMode', darkMode); }, [darkMode]);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: '#1565c0' },
        background: { default: darkMode ? '#0f172a' : '#e3f2fd', paper: darkMode ? '#1e293b' : '#ffffff' },
        text: { primary: darkMode ? '#e2e8f0' : '#0f172a', secondary: darkMode ? '#94a3b8' : '#4a5568' },
      },
      typography: { fontFamily: '"Times New Roman", Times, serif' },
      shape: { borderRadius: 16 },
    }),
    [darkMode]
  );

  // ---------------- State ----------------
  const { data: addData, setData: setAddData, reset: resetAdd } = useForm({ title: '', description: '', status: 'active' });
  const [projects, setProjects] = useState(initialProjects);
  const [editProject, setEditProject] = useState({ id: null, title: '', description: '', status: 'active' });
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [selectedProject, setSelectedProject] = useState(null); // For adding tasks
  const [taskData, setTaskData] = useState({ id: null, title: '', description: '', priority: '1', status: 'not_yet_done' });
  const [taskErrors, setTaskErrors] = useState({});
  const [editTaskData, setEditTaskData] = useState(null); // For editing tasks
  const taskRefs = useRef({});

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- Project Handlers ----------------
  const handleAddProject = async () => {
    if (!addData.title.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const tempProject = { ...addData, id: tempId, tasks: [] };

    setProjects(prev => [...prev, tempProject]); // Optimistic

    try {
      const res = await axios.post('/projects', addData);
      const savedProject = res.data.project;
      setProjects(prev =>
        prev.map(p => (p.id === tempId ? { ...savedProject, tasks: tempProject.tasks } : p))
      );
      resetAdd();
      setSnackbar({ open: true, message: 'Project added successfully 🎉', severity: 'success' });
    } catch {
      setProjects(prev => prev.filter(p => p.id !== tempId));
      setSnackbar({ open: true, message: 'Failed to add project ❌', severity: 'error' });
    }
  };

  const handleEditProject = async () => {
    const { id, title, description, status } = editProject;
    if (!id) return;
    const oldProject = projects.find(p => p.id === id);

    setProjects(prev => prev.map(p => p.id === id ? { ...p, title, description, status } : p));

    try {
      await axios.put(`/projects/${id}`, { title, description, status });
      setEditProject({ id: null, title: '', description: '', status: 'active' });
      setSnackbar({ open: true, message: 'Project updated ✏️', severity: 'success' });
    } catch {
      setProjects(prev => prev.map(p => p.id === oldProject.id ? oldProject : p));
      setSnackbar({ open: true, message: 'Failed to update project ❌', severity: 'error' });
    }
  };

  const handleDeleteProject = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      setSnackbar({ open: true, message: 'Project deleted 🗑️', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete project ❌', severity: 'error' });
    }
  };

  // ---------------- Task Handlers ----------------
  const handleAddTask = async (projectId) => {
    if (!taskData.title.trim()) {
      setTaskErrors({ title: ['Title is required'] });
      return;
    }

    const tempId = taskData.id || `temp-${Date.now()}`;
    const newTask = { ...taskData, id: tempId };

    setProjects(prev =>
      prev.map(p =>
        p.id === projectId ? { ...p, tasks: [...(p.tasks || []).filter(t => t.id !== tempId), newTask] } : p
      )
    );

    try {
      const res = taskData.id
        ? await axios.put(`/projects/${projectId}/tasks/${taskData.id}`, taskData)
        : await axios.post(`/projects/${projectId}/tasks`, taskData);

      const savedTask = res.data.task;

      setProjects(prev =>
        prev.map(p =>
          p.id === projectId
            ? { ...p, tasks: [...(p.tasks || []).filter(t => t.id !== tempId), savedTask] }
            : p
        )
      );

      setTaskData({ title: '', description: '', priority: '1', status: 'not_yet_done', id: null });
      setTaskErrors({});
      setEditTaskData(null);
      setSelectedProject(null);
      setSnackbar({ open: true, message: taskData.id ? 'Task updated ✅' : 'Task added ✅', severity: 'success' });

    } catch {
      setSnackbar({ open: true, message: 'Failed to save task ❌', severity: 'error' });
    }
  };

  const handleDeleteTask = async (projectId, taskId) => {
    try {
      await axios.delete(`/projects/${projectId}/tasks/${taskId}`);
      setProjects(prev =>
        prev.map(p => p.id === projectId ? { ...p, tasks: (p.tasks || []).filter(t => t.id !== taskId) } : p)
      );
      setSnackbar({ open: true, message: 'Task deleted 🗑️', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete task ❌', severity: 'error' });
    }
  };

  // ---------------- Render ----------------
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', p: 4, backgroundColor: theme.palette.background.default }}>

        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={4}>
          <Stack alignItems="center" flex={1}>
            <Typography variant="h3" fontWeight="bold" color="primary" textAlign="center">Projects</Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontStyle: 'italic' }} textAlign="center">
              "The best way to get started is to quit talking and begin doing." – Walt Disney
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button variant="outlined" onClick={() => router.visit('/dashboard')}>Back</Button>
            <DarkModeIcon />
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Stack>
        </Stack>

        {/* Search + Progress */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mb={4} alignItems="center">
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            sx={{ flex: 1, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}
          />
          <Box sx={{ width: { xs: '100%', md: '300px' } }}>
            <LinearProgress
              variant="determinate"
              value={projects.length ? (projects.filter(p => p.status === 'completed').length / projects.length) * 100 : 0}
              sx={{ height: 10, borderRadius: 5, mb: 1 }}
            />
          </Box>
        </Stack>

        {/* Add Project Card */}
        <Card sx={{ mb: 4, backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Typography variant="h5" mb={3} color="text.primary">Add New Project</Typography>
            <Stack spacing={3}>
              <TextField label="Title" value={addData.title} onChange={e => setAddData('title', e.target.value)} fullWidth />
              <TextField label="Description" multiline rows={3} value={addData.description} onChange={e => setAddData('description', e.target.value)} fullWidth />
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddProject}>Add Project</Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Projects List Card */}
        <Card sx={{ mb: 4, backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Typography variant="h5" mb={3} color="text.primary">Your Projects</Typography>
            <Stack spacing={2}>
              {filteredProjects.map((project, idx) => (
                <Box key={project.id} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{idx + 1}. {project.title}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" onClick={() => setSelectedProject(project)}>Add Task</Button>
                      <IconButton onClick={() => setEditProject({ ...project })}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDeleteProject(project.id)}><DeleteIcon /></IconButton>
                    </Stack>
                  </Stack>
                  <Typography color="text.secondary">{project.description}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>Status: {project.status}</Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Tasks List Card */}
        <Card sx={{ mb: 4, backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Typography variant="h5" mb={3} color="text.primary">Your Tasks</Typography>
            <Stack spacing={2}>
              {projects.flatMap(project => project.tasks.map(task => (
                <Box key={task.id} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body1"><strong>{task.title}</strong> ({project.title})</Typography>
                      <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                      <Typography variant="body2" color="text.secondary">Priority: {task.priority} | Status: {task.status}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <IconButton onClick={() => setEditTaskData({ ...task, projectId: project.id })}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDeleteTask(project.id, task.id)}><DeleteIcon /></IconButton>
                    </Stack>
                  </Stack>
                </Box>
              )))}
            </Stack>
          </CardContent>
        </Card>

        {/* Task Modal for Add/Edit */}
        <Dialog open={!!selectedProject || !!editTaskData} onClose={() => { setSelectedProject(null); setEditTaskData(null); }} fullWidth maxWidth="sm">
          <DialogTitle>{editTaskData ? `Edit Task "${editTaskData.title}"` : `Add Task for "${selectedProject?.title}"`}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Title"
                fullWidth
                value={editTaskData?.title ?? taskData.title}
                onChange={e => {
                  editTaskData
                    ? setEditTaskData({ ...editTaskData, title: e.target.value })
                    : setTaskData({ ...taskData, title: e.target.value });
                }}
                error={!!taskErrors.title}
                helperText={taskErrors.title?.[0]}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={editTaskData?.description ?? taskData.description}
                onChange={e => {
                  editTaskData
                    ? setEditTaskData({ ...editTaskData, description: e.target.value })
                    : setTaskData({ ...taskData, description: e.target.value });
                }}
              />
              <Select
                fullWidth
                value={editTaskData?.priority ?? taskData.priority}
                onChange={e => {
                  editTaskData
                    ? setEditTaskData({ ...editTaskData, priority: e.target.value })
                    : setTaskData({ ...taskData, priority: e.target.value });
                }}
              >
                <MenuItem value="1">Low</MenuItem>
                <MenuItem value="2">Medium</MenuItem>
                <MenuItem value="3">High</MenuItem>
              </Select>
              <Select
                fullWidth
                value={editTaskData?.status ?? taskData.status}
                onChange={e => {
                  editTaskData
                    ? setEditTaskData({ ...editTaskData, status: e.target.value })
                    : setTaskData({ ...taskData, status: e.target.value });
                }}
              >
                <MenuItem value="not_yet_done">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setSelectedProject(null); setEditTaskData(null); }}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => handleAddTask(editTaskData?.projectId ?? selectedProject.id)}
            >
              {editTaskData ? 'Save Changes' : 'Add Task'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbars */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
        <Snackbar open={!!taskErrors.title} autoHideDuration={3000} onClose={() => setTaskErrors({})}>
          <Alert severity="error">{taskErrors.title?.[0]}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
