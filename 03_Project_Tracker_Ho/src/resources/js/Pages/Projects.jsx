import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  function fetchProjects() {
    setLoading(true);
    axios
      .get('/api/projects')
      .then((r) => setProjects(Array.isArray(r.data) ? r.data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }

  function resetForm() {
    setTitle('');
    setDescription('');
  }

  function createProject(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);

    Inertia.post(
      '/api/projects',
      { title: title.trim(), description: description || null },
      {
        preserveScroll: true,
        onFinish: () => setSubmitting(false),
        onSuccess: () => {
          resetForm();
          fetchProjects();
        },
      }
    );
  }

  function updateProject(p) {
    const nextTitle = (p.title || '').trim();
    if (!nextTitle) return;

    Inertia.put(
      `/api/projects/${p.id}`,
      {
        title: nextTitle,
        description: p.description || null,
      },
      {
        preserveScroll: true,
        onSuccess: () => fetchProjects(),
      }
    );
  }

  function deleteProject(id) {
    if (!confirm('Delete project?')) return;

    Inertia.delete(`/api/projects/${id}`, {
      preserveScroll: true,
      onSuccess: () => fetchProjects(),
    });
  }

  function handleProjectChange(id, field, value) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Projects
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Create a project, then open it to manage its tasks.
          </Typography>
        </Stack>

        {/* Create form */}
        <Card variant="outlined" sx={{ mb: 2, borderRadius: 3 }}>
          <CardContent>
            <form onSubmit={createProject}>
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  size="small"
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={2}
                  size="small"
                />
                <Stack direction="row" spacing={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting || !title.trim()}
                  >
                    Add Project
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    onClick={resetForm}
                    disabled={submitting}
                  >
                    Clear
                  </Button>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Card>

        {/* List */}
        {loading ? (
          <Typography variant="body2">Loading…</Typography>
        ) : projects.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            No projects yet. Create one above.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {projects.map((p) => (
              <Card key={p.id} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={1}
                      alignItems={{ xs: 'stretch', sm: 'center' }}
                    >
                      <TextField
                        value={p.title ?? ''}
                        onChange={(e) =>
                          handleProjectChange(p.id, 'title', e.target.value)
                        }
                        size="small"
                        label="Title"
                        sx={{ flex: 1 }}
                      />

                      <Button
                        variant="outlined"
                        onClick={() => updateProject(p)}
                        disabled={!(p.title || '').trim()}
                      >
                        Save
                      </Button>

                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => deleteProject(p.id)}
                      >
                        Delete
                      </Button>

                      <Button
                        component={Link}
                        href={route('app.projects.tasks', p.id)}
                        variant="text"
                      >
                        View Tasks
                      </Button>
                    </Stack>

                    <Divider />

                    <TextField
                      label="Description"
                      value={p.description ?? ''}
                      onChange={(e) =>
                        handleProjectChange(p.id, 'description', e.target.value)
                      }
                      multiline
                      rows={2}
                      size="small"
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
}