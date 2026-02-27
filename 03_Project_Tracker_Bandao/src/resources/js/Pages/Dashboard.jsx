import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
  Box,
  Typography,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Card,
  CardContent,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export default function Dashboard({ projects = [], tasks = [] }) {

  // ================= BASIC STATS =================
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;


  // ================= REAL WEEKLY PERFORMANCE =================
  const getWeekDay = (date) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  };

  const weeklyMap = {};
  tasks.forEach(task => {
    if (task.completed && task.updated_at) {
      const day = getWeekDay(task.updated_at);
      weeklyMap[day] = (weeklyMap[day] || 0) + 1;
    }
  });

  const weeklyPerformance = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => ({
    day,
    completed: weeklyMap[day] || 0,
  }));

  
  // ================= USER PRODUCTIVITY =================
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <AuthenticatedLayout>
      <Head title="Advanced Dashboard" />

      <Box sx={{ minHeight: '100vh', py: 6, background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
        <Container maxWidth="lg">

          {/* HEADER */}
          <Typography variant="h4" fontWeight="bold" textAlign="center" color="white" mb={6}>
            Dynamic Project Analytics Dashboard
          </Typography>

        

          {/* ================= WEEKLY PERFORMANCE ================= */}
<Card
  sx={{
    p: 3,
    mb: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(67, 97, 238, 0.15)', // soft blue overlay
    color: 'white',
    boxShadow: '0 8px 20px rgba(67,97,238,0.2)',
  }}
>
  <Typography variant="h6" mb={2} sx={{ fontWeight: 'bold' }}>
    Weekly Task Completion
  </Typography>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={weeklyPerformance} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
      <XAxis dataKey="day" stroke="white" tick={{ fill: 'white' }} />
      <YAxis stroke="white" tick={{ fill: 'white' }} />
      <Tooltip
        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 8, border: 'none', color: 'white' }}
        itemStyle={{ color: 'white' }}
      />
      <Line
        type="monotone"
        dataKey="completed"
        stroke="#ffffff"
        strokeWidth={3}
        dot={{ r: 5, fill: '#4361ee', stroke: '#fff', strokeWidth: 2 }}
        activeDot={{ r: 7 }}
      />
    </LineChart>
  </ResponsiveContainer>
</Card>

          {/* ================= USER PRODUCTIVITY ================= */}
          <Card sx={{ p:4, borderRadius:4 }}>
            <Typography variant="h6" mb={2}>User Productivity</Typography>
            <LinearProgress variant="determinate" value={productivityScore} sx={{ height:10, borderRadius:5, mb:2 }}/>
            <Typography variant="body1">Current productivity: <strong>{productivityScore}%</strong></Typography>
            <Typography variant="body2" mt={1} color="text.secondary">
              {productivityScore >= 75
                ? "Excellent performance! Keep it up."
                : productivityScore >= 50
                ? "Good progress. You can do more."
                : "Productivity is low. Prioritize important tasks."}
            </Typography>
          </Card>

          

        </Container>
      </Box>
    </AuthenticatedLayout>
  );
}