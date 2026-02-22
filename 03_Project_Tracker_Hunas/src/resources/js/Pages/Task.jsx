import { useToast } from '@/Components/ToastProvider';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Grid,
  Tooltip,
} from '@mui/material';
import { 
  CheckCircle, 
  RadioButtonUnchecked, 
  DeleteSweep, 
  EditNote, 
  Subtitles, 
  PriorityHigh,
  ArrowBackIosNew 
} from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [prRes, tsRes] = await Promise.all([
        axios.get('/projects'),
        axios.get('/tasks')
      ]);
      setProjects(prRes.data.data || []);
      setTasks(tsRes.data.data || []);
      
      if (!selectedProjectId && prRes.data.data?.length > 0) {
        setSelectedProjectId(prRes.data.data[0].id);
      }
    } catch (err) {
      showToast('Synchronization error', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, project_id: selectedProjectId, status: 'todo' };

    try {
      if (editingId) {
        await axios.put(`/tasks/${editingId}`, payload);
        showToast('Task specifications updated', 'success');
      } else {
        await axios.post('/tasks', payload);
        showToast('Task deployed to project', 'success');
      }
      setFormData({ title: '', description: '', priority: 'medium' });
      setEditingId(null);
      loadData();
    } catch (err) {
      showToast('Transmission failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.post(`/tasks/${id}/toggle-status`);
      showToast('Phase transitioned', 'success');
      loadData();
    } catch (err) { showToast('Status locked', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Purge this task from history?')) return;
    try {
      await axios.delete(`/tasks/${id}`);
      showToast('Task purged', 'success');
      loadData();
    } catch (err) { showToast('Decline: Authorization required', 'error'); }
  };

  const taskGroups = {
    todo: tasks.filter(t => t.project_id === selectedProjectId && t.status !== 'done'),
    done: tasks.filter(t => t.project_id === selectedProjectId && t.status === 'done')
  };

  const priorityMeta = {
    high: { color: 'error', label: 'CRITICAL' },
    medium: { color: 'warning', label: 'STABLE' },
    low: { color: 'success', label: 'MINOR' }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      
      {/* CONTROL PANEL */}
      <Paper elevation={0} sx={{ width: { xs: '100%', md: 320 }, p: 3, borderRight: '1px solid #e0e0e0', borderRadius: 0 }}>
        <Button 
          startIcon={<ArrowBackIosNew />} 
          onClick={() => window.location.href = '/dashboard'}
          sx={{ mb: 4, color: 'text.secondary' }}
        >
          Dashboard
        </Button>

        <Typography variant="h5" fontWeight={900} gutterBottom>Task Ops</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 4 }}>
          SECTION 5 & 6: PRIORITY & STATUS PERSISTENCE
        </Typography>

        <Stack spacing={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Active Project Context</InputLabel>
            <Select
              value={selectedProjectId}
              label="Active Project Context"
              onChange={(e) => setSelectedProjectId(e.target.value)}
            >
              {projects.map((p) => <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>)}
            </Select>
          </FormControl>

          <Divider />

          <Box component="form" onSubmit={handleSubmission}>
            <Stack spacing={2}>
              <TextField
                label="Task Title"
                size="small"
                fullWidth
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <TextField
                label="Execution Details"
                multiline
                rows={2}
                fullWidth
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Priority Level</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority Level"
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <MenuItem value="low">Low Impact</MenuItem>
                  <MenuItem value="medium">Medium Balance</MenuItem>
                  <MenuItem value="high">High Priority</MenuItem>
                </Select>
              </FormControl>
              <Button 
                variant="contained" 
                type="submit" 
                disabled={loading || !selectedProjectId}
                fullWidth
                sx={{ py: 1, borderRadius: 2, fontWeight: 'bold' }}
              >
                {editingId ? 'Save Edits' : 'Commit Task'}
              </Button>
              {editingId && <Button variant="text" onClick={() => {setEditingId(null); setFormData({title:'', description:'', priority:'medium'})}}>Cancel</Button>}
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* WORKBOARD GRID */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Grid container spacing={4}>
          {['todo', 'done'].map((column) => (
            <Grid item xs={12} lg={6} key={column}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                {column === 'todo' ? <Subtitles color="primary" /> : <CheckCircle color="success" />}
                <Typography variant="h6" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                  {column === 'todo' ? 'In Progress' : 'Completed'}
                </Typography>
                <Chip label={taskGroups[column].length} size="small" sx={{ ml: 'auto' }} />
              </Box>

              <Stack spacing={2}>
                {taskGroups[column].map((task) => (
                  <Card key={task.id} sx={{ 
                    borderLeft: `5px solid ${priorityMeta[task.priority].color === 'error' ? '#f44336' : (priorityMeta[task.priority].color === 'warning' ? '#ffa726' : '#66bb6a')}`,
                    '&:hover': { boxShadow: 4 }
                  }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ textDecoration: column === 'done' ? 'line-through' : 'none', opacity: column === 'done' ? 0.6 : 1 }}>
                            {task.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {task.description || 'No specific parameters set.'}
                          </Typography>
                        </Box>
                        <Tooltip title="Transition Status">
                          <IconButton onClick={() => handleToggle(task.id)} color={column === 'done' ? 'success' : 'default'}>
                            {column === 'done' ? <CheckCircle /> : <RadioButtonUnchecked />}
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Chip 
                          icon={<PriorityHigh sx={{ fontSize: '12px !important' }} />} 
                          label={priorityMeta[task.priority].label} 
                          size="small" 
                          color={priorityMeta[task.priority].color} 
                          variant="contained" 
                        />
                        <Stack direction="row" spacing={0.5}>
                          <IconButton size="small" onClick={() => {
                            setEditingId(task.id);
                            setFormData({ title: task.title, description: task.description, priority: task.priority });
                          }}>
                            <EditNote fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(task.id)}>
                            <DeleteSweep fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}