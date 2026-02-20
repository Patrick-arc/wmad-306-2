import React, { useState, useEffect, useMemo } from 'react';
import { Inertia } from '@inertiajs/inertia';
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Stack,
  Switch,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AddIcon from '@mui/icons-material/Add';

const bounceKeyframes = keyframes`
  0% { transform: translateY(-18px); opacity: 0.0; }
  50% { transform: translateY(8px); opacity: 0.98; }
  100% { transform: translateY(0); opacity: 1; }
`;

export default function TasksPage({ tasks = [] }) {
  const [taskList, setTaskList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('1');
  const [status, setStatus] = useState('not_yet_done');
  const [errors, setErrors] = useState(null);
  const [animateIds, setAnimateIds] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Theme
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: '#1565c0' }, // blue
        background: {
          default: darkMode ? '#0f172a' : '#ffffff',
          paper: darkMode ? '#1e293b' : '#f0f4ff',
        },
        text: {
          primary: darkMode ? '#e2e8f0' : '#0f172a',
          secondary: darkMode ? '#94a3b8' : '#4a5568',
        },
      },
      typography: { fontFamily: '"Times New Roman", serif' },
    }),
    [darkMode]
  );

  // Initialize tasks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (Array.isArray(tasks) && tasks.length > 0) {
      const optimisticLocal = saved.filter((t) => String(t.id).startsWith('temp-'));
      setTaskList([...tasks, ...optimisticLocal]);
    } else if (saved && saved.length) {
      setTaskList(saved);
    } else {
      setTaskList(tasks || []);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(taskList));
    } catch (e) {}
  }, [taskList]);

  const scheduleAnimate = (id) => {
    setAnimateIds((s) => [...s, id]);
    setTimeout(() => setAnimateIds((s) => s.filter((x) => x !== id)), 800);
  };

  const handleAdd = () => {
    setErrors(null);
    if (!title.trim()) {
      setErrors({ title: ['Title is required'] });
      return;
    }

    const optimisticTask = {
      id: `temp-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      optimistic: true,
    };

    setTaskList((prev) => {
      const next = [...prev, optimisticTask];
      localStorage.setItem('tasks', JSON.stringify(next));
      return next;
    });
    scheduleAnimate(optimisticTask.id);

    setTitle('');
    setDescription('');
    setPriority('1');
    setStatus('not_yet_done');

    Inertia.post(
      '/tasks',
      { title: optimisticTask.title, description: optimisticTask.description, priority, status },
      {
        preserveState: true,
        onSuccess: (page) => {
          if (Array.isArray(page.props?.tasks) && page.props.tasks.length) {
            setTaskList((cur) => {
              const temps = cur.filter((t) => String(t.id).startsWith('temp-'));
              const merged = [...page.props.tasks, ...temps];
              localStorage.setItem('tasks', JSON.stringify(merged));
              return merged;
            });
            return;
          }
        },
        onError: (serverErrors) => {
          setTaskList((cur) => cur.filter((t) => !t.optimistic));
          setErrors(serverErrors);
        },
      }
    );
  };

  const handleDelete = (id) => {
    const prev = taskList;
    setTaskList((prevList) => {
      const next = prevList.filter((t) => t.id !== id);
      localStorage.setItem('tasks', JSON.stringify(next));
      return next;
    });
    if (String(id).startsWith('temp-')) return;

    Inertia.delete(`/tasks/${id}`, {
      preserveState: true,
      onError: () => setTaskList(prev),
      onSuccess: (page) => {
        if (Array.isArray(page.props?.tasks)) {
          setTaskList(page.props.tasks);
          localStorage.setItem('tasks', JSON.stringify(page.props.tasks));
        }
      },
    });
  };

  const toggleStatus = (task) => {
    const newStatus = task.status === 'completed' ? 'not_yet_done' : 'completed';
    const prev = taskList;
    setTaskList((cur) => {
      const next = cur.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t));
      localStorage.setItem('tasks', JSON.stringify(next));
      return next;
    });

    scheduleAnimate(task.id);

    if (String(task.id).startsWith('temp-')) return;

    Inertia.put(`/tasks/${task.id}`, { status: newStatus }, {
      preserveState: true,
      onError: () => setTaskList(prev),
      onSuccess: (page) => {
        if (Array.isArray(page.props?.tasks)) {
          setTaskList(page.props.tasks);
          localStorage.setItem('tasks', JSON.stringify(page.props.tasks));
        }
      },
    });
  };

  const changePriority = (taskId, value) => {
    const prev = taskList;
    setTaskList((cur) => {
      const next = cur.map((t) => (t.id === taskId ? { ...t, priority: value } : t));
      localStorage.setItem('tasks', JSON.stringify(next));
      return next;
    });
    if (String(taskId).startsWith('temp-')) return;

    Inertia.put(`/tasks/${taskId}`, { priority: value }, {
      preserveState: true,
      onError: () => setTaskList(prev),
      onSuccess: (page) => {
        if (Array.isArray(page.props?.tasks)) {
          setTaskList(page.props.tasks);
          localStorage.setItem('tasks', JSON.stringify(page.props.tasks));
        }
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          p: 5,
          fontFamily: '"Times New Roman", serif',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1080, display: 'flex', flexDirection: 'column', gap: 5 }}>

          {/* Dark Mode Toggle & Back */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => window.history.back()}
              sx={{
                fontFamily: '"Times New Roman", serif',
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                '&:hover': { borderColor: theme.palette.primary.dark, color: theme.palette.primary.dark },
              }}
            >
              ← Back
            </Button>
            <Stack direction="row" alignItems="center" spacing={1}>
              <DarkModeIcon sx={{ color: theme.palette.primary.main }} />
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Stack>
          </Box>

          {/* Title */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary.main, fontSize: '2.4rem' }}>
              Project Tasks & Tracker
            </Typography>
            <Typography sx={{ fontStyle: 'italic', mt: 1, fontSize: '1.2rem', color: theme.palette.text.secondary }}>
              "Small steps every day build the biggest outcomes."
            </Typography>
          </Box>

          {/* Add Task Card */}
          <Card sx={{ p: 5, backgroundColor: theme.palette.background.paper, width: '100%' }}>
            <Typography variant="h4" sx={{ mb: 3, color: theme.palette.primary.main, textAlign: 'center' }}>
              Add Task
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ flex: 3 }}
                InputProps={{ style: { fontFamily: '"Times New Roman", serif', fontSize: 18 } }}
                error={!!errors?.title}
                helperText={errors?.title?.[0]}
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ flex: 4 }}
                InputProps={{ style: { fontFamily: '"Times New Roman", serif', fontSize: 18 } }}
              />
              <Select value={priority} onChange={(e) => setPriority(e.target.value)} sx={{ width: 140, fontFamily: '"Times New Roman", serif' }}>
                <MenuItem value="1">Low</MenuItem>
                <MenuItem value="2">Medium</MenuItem>
                <MenuItem value="3">High</MenuItem>
              </Select>
              <Select value={status} onChange={(e) => setStatus(e.target.value)} sx={{ width: 200, fontFamily: '"Times New Roman", serif' }}>
                <MenuItem value="not_yet_done">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
              >
                Add Task
              </Button>
            </Stack>
          </Card>

          {/* Tasks List Card */}
          <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper, width: '100%', minHeight: 550 }}>
            <Typography sx={{ fontWeight: 'bold', mb: 3, fontSize: '1.5rem', textAlign: 'center' }}>Tasks</Typography>
            <Box sx={{ display: 'flex', gap: 3, px: 2, py: 1, borderBottom: `1px solid ${darkMode ? '#334155' : '#ccc'}`, mb: 3 }}>
              <Box sx={{ flex: 3 }}>Title</Box>
              <Box sx={{ flex: 4 }}>Description</Box>
              <Box sx={{ width: 140, textAlign: 'center' }}>Priority</Box>
              <Box sx={{ width: 200, textAlign: 'center' }}>Status</Box>
              <Box sx={{ width: 160, textAlign: 'center' }}>Actions</Box>
            </Box>
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              <Stack spacing={2}>
                {taskList.length > 0 ? taskList.map((task) => (
                  <Card
                    key={task.id}
                    sx={{
                      p: 3,
                      display: 'flex',
                      gap: 3,
                      alignItems: 'center',
                      minHeight: 120,
                      fontFamily: '"Times New Roman", serif',
                      fontSize: '1.15rem',
                      backgroundColor: theme.palette.background.default,
                      animation: animateIds.includes(task.id) ? `${bounceKeyframes} 700ms ease` : 'none',
                    }}
                  >
                    <Box sx={{ flex: 3, color: theme.palette.text.primary }}>{task.title}</Box>
                    <Box sx={{ flex: 4, color: theme.palette.text.secondary }}>{task.description || '-'}</Box>
                    <Box sx={{ width: 140, textAlign: 'center' }}>
                      <Select value={String(task.priority)} onChange={(e) => changePriority(task.id, e.target.value)} sx={{ minWidth: 100, fontFamily: '"Times New Roman", serif' }}>
                        <MenuItem value="1">Low</MenuItem>
                        <MenuItem value="2">Medium</MenuItem>
                        <MenuItem value="3">High</MenuItem>
                      </Select>
                    </Box>
                    <Box sx={{ width: 200, textAlign: 'center', color: task.status === 'completed' ? 'green' : theme.palette.primary.main }}>
                      {task.status === 'completed' ? 'Completed' : 'Active'}
                    </Box>
                    <Box sx={{ width: 160, textAlign: 'center' }}>
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button variant="outlined" onClick={() => toggleStatus(task)} sx={{ fontSize: '0.85rem', padding: '4px 8px', fontFamily: '"Times New Roman", serif' }}>
                          {task.status === 'completed' ? 'Mark Not Done' : 'Mark Complete'}
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(task.id)} sx={{ fontSize: '0.85rem', padding: '4px 8px', fontFamily: '"Times New Roman", serif' }}>
                          Delete
                        </Button>
                      </Stack>
                    </Box>
                  </Card>
                )) : (
                  <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary, py: 6 }}>No tasks yet.</Typography>
                )}
              </Stack>
            </Box>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
