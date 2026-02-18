import React, { useState, useMemo, useEffect } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Divider,
  Switch,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  InputAdornment,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
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
        background: {
          default: darkMode ? '#0f172a' : '#e3f2fd',
          paper: darkMode ? '#1e293b' : '#ffffff',
        },
        text: {
          primary: darkMode ? '#e2e8f0' : '#0f172a',
          secondary: darkMode ? '#94a3b8' : '#4a5568',
        },
      },
      typography: { fontFamily: '"Times New Roman", Times, serif' },
      shape: { borderRadius: 16 },
    }),
    [darkMode]
  );

  // Form states
  const { data: addData, setData: setAddData, post, reset: resetAdd } = useForm({
    title: '', description: '', status: 'active',
  });

  const [projects, setProjects] = useState(initialProjects);
  const [editData, setEditData] = useState({ id: null, title: '', description: '', status: 'active' });
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Add project
  const handleAddProject = () => {
    if (!addData.title) return;
    const tempId = `temp-${Date.now()}`;
    setProjects(prev => [...prev, { ...addData, id: tempId }]);
    post('/projects', addData, {
      onSuccess: page => {
        setProjects(page.props.projects || []);
        resetAdd();
        setSnackbar({ open: true, message: 'Project added successfully 🎉' });
      },
      onError: () => setProjects(prev => prev.filter(p => p.id !== tempId)),
    });
  };

  // Edit project
  const handleEditProject = () => {
    const { id, title, description, status } = editData;
    if (!id) return;
    const oldProject = projects.find(p => p.id === id);
    setProjects(prev => prev.map(p => p.id === id ? { ...p, title, description, status } : p));
    router.put(`/projects/${id}`, { title, description, status }, {
      preserveScroll: true,
      onSuccess: page => {
        setProjects(page.props.projects || []);
        setEditData({ id: null, title: '', description: '', status: 'active' });
        setSnackbar({ open: true, message: 'Project updated ✏️' });
      },
      onError: () => setProjects(prev => prev.map(p => p.id === oldProject.id ? oldProject : p)),
    });
  };

  // Toggle status
  const handleToggleStatus = (project) => {
    const newStatus = project.status === 'active' ? 'completed' : 'active';
    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, status: newStatus } : p));
    router.put(`/projects/${project.id}`, { ...project, status: newStatus }, {
      preserveScroll: true,
      onSuccess: () => setSnackbar({ open: true, message: newStatus === 'completed' ? 'Marked completed ✅' : 'Marked active 🔵' }),
    });
  };

  // Delete project
  const handleDelete = () => {
    if (!deleteId) return;
    router.delete(`/projects/${deleteId}`, {
      preserveScroll: true,
      onSuccess: page => {
        setProjects(page.props.projects || []);
        setDeleteId(null);
        setSnackbar({ open: true, message: 'Project deleted 🗑️' });
      },
    });
  };

  // Progress bar
  const completedCount = projects.filter(p => p.status === 'completed').length;
  const progress = projects.length ? (completedCount / projects.length) * 100 : 0;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', p: 4, backgroundColor: theme.palette.background.default }}>

        {/* Header: Title + Quote + Back Button + DarkMode */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexWrap="wrap"
          >
            {/* Title + Quote centered */}
            <Stack alignItems="center" flex={1} mb={{ xs: 2, md: 0 }}>
              <Typography variant="h3" fontWeight="bold" color="primary" textAlign="center">
                Projects
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontStyle: 'italic' }} textAlign="center">
                "The best way to get started is to quit talking and begin doing." – Walt Disney
              </Typography>
            </Stack>

            {/* Back Button + DarkMode */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                variant="outlined"
                onClick={() => router.visit('/dashboard')} // Change this route if needed
              >
                Back
              </Button>
              <DarkModeIcon />
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Stack>
          </Stack>
        </Box>

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
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
            <Typography variant="body2" textAlign="center" color="text.primary">{Math.round(progress)}% Completed</Typography>
          </Box>
        </Stack>

        {/* Cards */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Add Project */}
          <Card sx={{ flex: 1, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h5" mb={3} color="text.primary">Add New Project</Typography>
              <Stack spacing={3}>
                <TextField
                  label="Title"
                  value={addData.title}
                  onChange={e => setAddData('title', e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: theme.palette.background.default, borderRadius: 1 }}
                />
                <TextField
                  label="Description"
                  multiline rows={3}
                  value={addData.description}
                  onChange={e => setAddData('description', e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: theme.palette.background.default, borderRadius: 1 }}
                />
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddProject}>Add Project</Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Project List */}
          <Card sx={{ flex: 2, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h5" mb={3} color="text.primary">Your Projects</Typography>
              <List>
                {filteredProjects.map((p, idx) => (
                  <div key={p.id}>
                    <ListItem sx={{
                      textDecoration: p.status === 'completed' ? 'line-through' : 'none',
                      opacity: p.status === 'completed' ? 0.6 : 1,
                    }}>
                      <Checkbox
                        checked={p.status === 'completed'}
                        onChange={() => handleToggleStatus(p)}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                      />

                      {editData.id === p.id ? (
                        <Stack spacing={2} flex={1}>
                          <TextField
                            value={editData.title}
                            onChange={e => setEditData({ ...editData, title: e.target.value })}
                            fullWidth
                            sx={{ backgroundColor: theme.palette.background.default, borderRadius: 1 }}
                          />
                          <TextField
                            multiline rows={2}
                            value={editData.description}
                            onChange={e => setEditData({ ...editData, description: e.target.value })}
                            fullWidth
                            sx={{ backgroundColor: theme.palette.background.default, borderRadius: 1 }}
                          />
                          <Stack direction="row" spacing={1}>
                            <Button variant="contained" onClick={handleEditProject}>Save</Button>
                            <Button variant="outlined" onClick={() => setEditData({ id: null, title: '', description: '', status: 'active' })}>Cancel</Button>
                          </Stack>
                        </Stack>
                      ) : (
                        <>
                          <ListItemText
                            primary={`${idx + 1}. ${p.title}`}
                            secondary={p.description}
                            primaryTypographyProps={{ color: theme.palette.text.primary }}
                            secondaryTypographyProps={{ color: theme.palette.text.secondary }}
                          />
                          <IconButton onClick={() => setEditData({ ...p })}><EditIcon sx={{ color: theme.palette.text.primary }} /></IconButton>
                          <IconButton color="error" onClick={() => setDeleteId(p.id)}><DeleteIcon /></IconButton>
                        </>
                      )}
                    </ListItem>
                    <Divider sx={{ backgroundColor: darkMode ? '#334155' : '#e0e0e0' }} />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Stack>

        {/* Delete Dialog */}
        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
          <DialogTitle color="text.primary">Confirm Delete</DialogTitle>
          <DialogContent color="text.primary">Are you sure you want to delete this project?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button color="error" onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ open: false, message: '' })}>
          <Alert severity="success" variant="filled">{snackbar.message}</Alert>
        </Snackbar>

      </Box>
    </ThemeProvider>
  );
}
