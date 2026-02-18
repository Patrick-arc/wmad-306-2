import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  LinearProgress,
  Divider,
  Chip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";

import {
  Folder as FolderIcon,
  Dashboard as DashboardIcon,
  TaskAlt as TaskIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  Menu as MenuIcon
} from "@mui/icons-material";

export default function Dashboard({ auth, stats = {} }) {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    totalProjects = 0,
    totalTasks = 0,
    pendingTasks = 0,
    completedTasks = 0,
    recentProjects = []
  } = stats;

  const completion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statCards = [
    { label: "Projects", value: totalProjects, icon: FolderIcon },
    { label: "Tasks", value: totalTasks, icon: TaskIcon },
    { label: "Pending", value: pendingTasks, icon: PendingIcon },
    { label: "Completed", value: completedTasks, icon: CheckCircleIcon }
  ];

  // Sidebar width
  const drawerWidth = open ? 240 : 80;

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg,#1e1b4b,#312e81,#6366F1)" }}>

        {/* SIDEBAR */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              transition: "0.4s",
              overflowX: "hidden",
              background: "rgba(15,23,42,0.9)",
              backdropFilter: "blur(10px)",
              borderRight: "1px solid rgba(255,255,255,0.1)"
            }
          }}
        >
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              TaskBoard
            </Typography>

            <IconButton onClick={() => setOpen(!open)} sx={{ color: "#8B5CF6", mt: 1 }}>
              <MenuIcon />
            </IconButton>
          </Box>

            <List>
            <ListItemButton
                component={Link}
                href={route("dashboard")}
                sx={{
                    color: "#EDE9FE", // text color
                    "&:hover": {
                        background: "rgba(139,92,246,0.1)",
                        boxShadow: "0 0 15px rgba(139,92,246,0.5)",
                        color: "#FFFFFF" // brighter text on hover
                    }
                }}
            >
                <ListItemIcon sx={{ color: "#8B5CF6" }}>
                    <DashboardIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Dashboard" />}
            </ListItemButton>

            <ListItemButton
                component={Link}
                href={route("projects.index")}
                sx={{
                    color: "#EDE9FE", // text color
                    "&:hover": {
                        background: "rgba(139,92,246,0.1)",
                        boxShadow: "0 0 15px rgba(139,92,246,0.5)",
                        color: "#FFFFFF" // brighter text on hover
                    }
                }}
            >
                <ListItemIcon sx={{ color: "#8B5CF6" }}>
                    <FolderIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Projects" />}
            </ListItemButton>

            <ListItemButton
                component={Link}
                href={route("tasks.index")}
                sx={{
                    color: "#EDE9FE", // text color
                    "&:hover": {
                        background: "rgba(139,92,246,0.1)",
                        boxShadow: "0 0 15px rgba(139,92,246,0.5)",
                        color: "#FFFFFF" // brighter text on hover
                    }
                }}
            >
                <ListItemIcon sx={{ color: "#8B5CF6" }}>
                    <TaskIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Tasks" />}
            </ListItemButton>
        </List>
        </Drawer>

        {/* MAIN CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            color: "#E2E8F0",
            ml: isMobile ? 0 : `${drawerWidth}px`,
            transition: "margin 0.4s"
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#FFFFFF" }}>
                Dashboard
              </Typography>
              <Typography sx={{ color: "#94A3B8" }}>Welcome back, {auth.user.name}</Typography>
            </Box>

            <Link href={route("projects.create")}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 3,
                  background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                  boxShadow: "0 0 20px rgba(139,92,246,0.5)",
                  textTransform: "none",
                  "&:hover": {
                    boxShadow: "0 0 30px rgba(139,92,246,0.9)"
                  }
                }}
              >
                New Project
              </Button>
            </Link>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} mb={6}>
            {statCards.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 0 25px rgba(139,92,246,0.5)"
                    }
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography sx={{ color: "#94A3B8" }}>{item.label}</Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: "#FFFFFF" }}>
                          {item.value}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{
                          background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                          width: 48,
                          height: 48,
                          boxShadow: "0 0 12px rgba(139,92,246,0.6)"
                        }}
                      >
                        <item.icon fontSize="medium" />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Overall Progress */}
          <Card
            sx={{
              borderRadius: 4,
              mb: 6,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight="bold" sx={{ color: "#FFFFFF" }}>
                  Overall Completion
                </Typography>
                <Chip
                  label={`${completion}%`}
                  sx={{ background: "linear-gradient(135deg,#06B6D4,#3B82F6)", color: "#fff" }}
                />
              </Box>

              <LinearProgress
                variant="determinate"
                value={completion}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "& .MuiLinearProgress-bar": {
                    background: "linear-gradient(135deg,#6366F1,#8B5CF6)"
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Your Projects */}
          <Typography variant="h6" fontWeight="bold" mb={3} sx={{ color: "#d5c0f4" }}>
            Your Projects
          </Typography>

          <Grid container spacing={3}>
            {recentProjects.map((project) => {
              const total = project.tasks?.length || 0;
              const done = project.tasks?.filter((t) => t.status === "completed").length || 0;
              const percent = total > 0 ? Math.round((done / total) * 100) : 0;

              return (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      background: "#FFFFFF",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 10px 25px rgba(124,58,237,0.3)"
                      }
                    }}
                  >
                    <CardContent>
                      <Typography fontWeight="bold" gutterBottom sx={{ color: "#4C1D95" }}>
                        {project.title}
                      </Typography>

                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          "& .MuiLinearProgress-bar": {
                            background: "linear-gradient(135deg,#7C3AED,#A78BFA)"
                          }
                        }}
                      />

                      <Box display="flex" justifyContent="space-between" mt={1}>
                        <Typography variant="caption" sx={{ color: "#6B7280" }}>
                          Progress
                        </Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: "#4C1D95" }}>
                          {percent}%
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Link href={route("projects.show", project.id)}>
                        <Button size="small" endIcon={<ArrowForwardIcon />} sx={{ textTransform: "none", color: "#7C3AED" }}>
                          View Project
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
}
