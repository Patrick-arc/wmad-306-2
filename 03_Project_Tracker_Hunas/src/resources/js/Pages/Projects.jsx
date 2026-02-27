import { useToast } from '@/Components/ToastProvider';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Tooltip,
  CircularProgress,
  Avatar
} from '@mui/material';
import { 
  Add, 
  DeleteOutline, 
  EditOutlined, 
  FolderOutlined, 
  Search, 
  ChevronLeft 
} from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/projects');
      setProjects(res.data.data || []);
    } catch (err) {
      showToast('Failed to sync projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`/projects/${editingId}`, form);
        showToast('Changes synchronized', 'success');
      } else {
        await axios.post('/projects', form);
        showToast('New workspace established', 'success');
      }
      setForm({ title: '', description: '' });
      setEditingId(null);
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Action failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('This will remove all associated tasks. Continue?')) return;
    try {
      await axios.delete(`/projects/${id}`);
      showToast('Project decommissioned', 'success');
      load();
    } catch (err) { showToast('Authorization failed', 'error'); }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f0f2f5' }}>
      {/* LEFT SIDEBAR: Management Panel */}
      <Paper elevation={0} sx={{ width: 350, p: 3, borderRight: '1px solid #ddd', borderRadius: 0 }}>
        <Stack spacing={3}>
          <Button 
            startIcon={<ChevronLeft />} 
            onClick={() => window.location.href = '/dashboard'}
            sx={{ alignSelf: 'flex-start', color: 'text.secondary' }}
          >
            Dashboard
          </Button>

          <Box>
            <Typography variant="h5" fontWeight={800} color="primary.main">
              Master Plan
            </Typography>
            <Typography variant="caption" color="text.secondary">
              SECTION 3: PROJECT CONTROLLER CRUD
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleAction}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Identifier"
                placeholder="Project Name..."
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                required
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Scope"
                placeholder="Technical details..."
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
              />
              <Button 
                variant="contained" 
                type="submit" 
                fullWidth 
                disabled={loading}
                startIcon={editingId ? <EditOutlined /> : <Add />}
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
              >
                {editingId ? 'Update Specs' : 'Initialize Project'}
              </Button>
              {editingId && (
                <Button onClick={() => {setEditingId(null); setForm({title:'', description:''})}}>
                  Cancel Edit
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* RIGHT CONTENT: Dynamic Grid */}
      <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto' }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Filter projects..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300, bgcolor: 'white' }}
          />
          {loading && <CircularProgress size={24} />}
        </Box>

        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <Card sx={{ 
                borderRadius: 3, 
                transition: 'all 0.2s', 
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } 
              }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      <FolderOutlined />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {project.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {project.id}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ height: 40, overflow: 'hidden' }}>
                    {project.description || 'No description provided for this technical scope.'}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Tooltip title="Modify">
                      <IconButton onClick={() => {
                        setEditingId(project.id);
                        setForm({ title: project.title, description: project.description });
                      }}>
                        <EditOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Decommission">
                      <IconButton color="error" onClick={() => deleteProject(project.id)}>
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredProjects.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h6" color="text.secondary">No active modules found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}