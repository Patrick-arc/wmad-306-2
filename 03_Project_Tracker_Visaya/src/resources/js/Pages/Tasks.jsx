import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

export default function Tasks({ initialProjectId = null }) {
  const [project, setProject] = useState(null);

  // Create form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  // When viewing "All Tasks", user must pick which project to add to
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Derive projectId safely:
  // 1) initialProjectId (from Inertia)
  // 2) URL pattern: /app/projects/{id}/tasks
  const projectId = useMemo(() => {
    if (initialProjectId && !isNaN(Number(initialProjectId))) {
      return String(initialProjectId);
    }

    const parts = window.location.pathname.split('/').filter(Boolean);
    const projectsIndex = parts.indexOf('projects');

    if (
      projectsIndex !== -1 &&
      parts[projectsIndex + 1] &&
      !isNaN(Number(parts[projectsIndex + 1]))
    ) {
      return String(parts[projectsIndex + 1]);
    }

    return null;
  }, [initialProjectId]);

  const viewingAll = !projectId;

  useEffect(() => {
    setProject(null);
    setLoading(true);

    if (viewingAll) {
      Promise.all([fetchAllTasks(), fetchProjectsList()]).finally(() =>
        setLoading(false)
      );
    } else {
      fetchProject(projectId).finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  function fetchProjectsList() {
    return axios
      .get('/api/projects')
      .then((r) => setProjectsList(Array.isArray(r.data) ? r.data : []))
      .catch(() => setProjectsList([]));
  }

  function fetchAllTasks() {
    return axios
      .get('/api/tasks')
      .then((r) => {
        const tasks = Array.isArray(r.data) ? r.data : [];
        setProject({ title: 'All Tasks', description: '', tasks });
      })
      .catch(() => setProject({ title: 'All Tasks', description: '', tasks: [] }));
  }

  function fetchProject(id) {
    if (!id) return Promise.resolve();
    return axios
      .get(`/api/projects/${id}`)
      .then((r) => setProject(r.data || null))
      .catch(() => setProject(null));
  }

  function refresh() {
    if (viewingAll) return fetchAllTasks();
    return fetchProject(projectId);
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setPriority('medium');
  }

  async function createTask(e) {
    e.preventDefault();

    const nextTitle = title.trim();
    if (!nextTitle) return;

    const targetProjectId = viewingAll ? selectedProjectId : projectId;

    if (!targetProjectId) {
      alert('Please select a project first.');
      return;
    }

    const payload = {
      project_id: targetProjectId,
      title: nextTitle,
      description: description || null,
      priority,
      status: false,
    };

    try {
      setSaving(true);
      await axios.post('/api/tasks', payload);
      resetForm();
      await refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to create task.');
    } finally {
      setSaving(false);
    }
  }

  async function updateTask(t) {
    const nextTitle = (t.title || '').trim();
    if (!nextTitle) return;

    try {
      setSaving(true);
      await axios.put(`/api/tasks/${t.id}`, {
        title: nextTitle,
        description: t.description || null,
        priority: t.priority,
        status: !!t.status,
      });
      await refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to update task.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteTask(id) {
    if (!confirm('Delete task?')) return;

    try {
      setSaving(true);
      await axios.delete(`/api/tasks/${id}`);
      await refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete task.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(t) {
    try {
      setSaving(true);
      await axios.post(`/api/tasks/${t.id}/toggle-status`);
      await refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to toggle status.');
    } finally {
      setSaving(false);
    }
  }

  function handleTaskChange(id, field, value) {
    setProject((prev) => {
      if (!prev?.tasks) return prev;
      return {
        ...prev,
        tasks: prev.tasks.map((tt) => (tt.id === id ? { ...tt, [field]: value } : tt)),
      };
    });
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Tasks
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {viewingAll
              ? 'Viewing tasks across all projects.'
              : 'Viewing tasks for this project.'}
          </Typography>
        </Stack>

        {loading ? (
          <Typography variant="body2">Loading…</Typography>
        ) : !project ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Project not found.
          </Typography>
        ) : (
          <>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {project.title}
            </Typography>
            {project.description ? (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {project.description}
              </Typography>
            ) : null}

            {/* Create form */}
            <Card variant="outlined" sx={{ mt: 2, borderRadius: 3 }}>
              <CardContent>
                <form onSubmit={createTask}>
                  <Stack spacing={2}>
                    {viewingAll && (
                      <Select
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        displayEmpty
                        required
                        size="small"
                        disabled={saving}
                      >
                        <MenuItem value="">
                          <em>Select project</em>
                        </MenuItem>
                        {projectsList.map((p) => (
                          <MenuItem key={p.id} value={String(p.id)}>
                            {p.title}
                          </MenuItem>
                        ))}
                      </Select>
                    )}

                    <TextField
                      label="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      size="small"
                      disabled={saving}
                    />

                    <TextField
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      multiline
                      rows={2}
                      size="small"
                      disabled={saving}
                    />

                    <Select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      size="small"
                      disabled={saving}
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>

                    <Stack direction="row" spacing={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={saving || !title.trim() || (viewingAll && !selectedProjectId)}
                      >
                        Add Task
                      </Button>
                      <Button
                        type="button"
                        variant="text"
                        onClick={resetForm}
                        disabled={saving}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </CardContent>
            </Card>

            {/* List */}
            <Box sx={{ mt: 2 }}>
              {!project.tasks || project.tasks.length === 0 ? (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  No tasks yet.
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {project.tasks.map((t) => (
                    <Card key={t.id} variant="outlined" sx={{ borderRadius: 3 }}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1}
                            alignItems={{ xs: 'stretch', sm: 'center' }}
                          >
                            <TextField
                              label="Title"
                              value={t.title ?? ''}
                              onChange={(e) =>
                                handleTaskChange(t.id, 'title', e.target.value)
                              }
                              size="small"
                              sx={{ flex: 1 }}
                              disabled={saving}
                            />

                            <Select
                              value={t.priority ?? 'medium'}
                              onChange={(e) =>
                                handleTaskChange(t.id, 'priority', e.target.value)
                              }
                              size="small"
                              disabled={saving}
                              sx={{ minWidth: 130 }}
                            >
                              <MenuItem value="low">Low</MenuItem>
                              <MenuItem value="medium">Medium</MenuItem>
                              <MenuItem value="high">High</MenuItem>
                            </Select>

                            <Button
                              variant="outlined"
                              onClick={() => updateTask(t)}
                              disabled={saving || !(t.title || '').trim()}
                            >
                              Save
                            </Button>

                            <Button
                              variant="outlined"
                              onClick={() => toggleStatus(t)}
                              disabled={saving}
                            >
                              {t.status ? 'Mark Open' : 'Mark Done'}
                            </Button>

                            <Button
                              color="error"
                              variant="outlined"
                              onClick={() => deleteTask(t.id)}
                              disabled={saving}
                            >
                              Delete
                            </Button>
                          </Stack>

                          <Divider />

                          <TextField
                            label="Description"
                            value={t.description ?? ''}
                            onChange={(e) =>
                              handleTaskChange(t.id, 'description', e.target.value)
                            }
                            multiline
                            rows={2}
                            size="small"
                            disabled={saving}
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}