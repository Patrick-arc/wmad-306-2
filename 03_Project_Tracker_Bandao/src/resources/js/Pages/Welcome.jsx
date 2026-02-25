import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  Grid,
  Fade,
  Slide,
  Stack,
  Chip,
  Avatar,
  Divider,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Rating,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  RocketLaunch,
  FolderOpen,
  CheckCircle,
  TrendingUp,
  Groups,
  Speed,
  Star,
  ExpandMore,
  ArrowForward,
  Timeline,
  Security,
  CloudSync,
  IntegrationInstructions,
  SupportAgent,
  Analytics,
  AssignmentTurnedIn,
  NotificationsActive,
  Close,
  PlayArrow,
} from "@mui/icons-material";

export default function Welcome({
  auth = {},
  featuredProjects = [],
  featuredTasks = [],
}) {
  const isAuthenticated = auth?.user;
  const [tabValue, setTabValue] = React.useState(0);
  const [demoOpen, setDemoOpen] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDemoOpen = () => {
    setDemoOpen(true);
  };

  const handleDemoClose = () => {
    setDemoOpen(false);
  };

  return (
    <>
      <Head title="Project Tracker" />

      {/* Simple Navigation */}
      <AppBar position="static" sx={{ background: "white", boxShadow: 1 }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: "8px",
                background: "linear-gradient(135deg, #4361ee, #764ba2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}>
                PT
              </Box>
              <Typography variant="h6" fontWeight="bold" color="#4361ee">
                Project Tracker
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" component={Link} href={route("register")}>
                Get Started
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Simple & Clean */}
      <Box sx={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center"
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" sx={{ mb: 3, fontSize: "3rem" }}>
            Project Management Made Simple
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Organize tasks, track progress, and deliver projects on time.
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              component={Link}
              href={isAuthenticated ? route("dashboard") : route("register")}
              sx={{
                px: 4,
                py: 2,
                background: "white",
                color: "#764ba2",
                fontWeight: "bold",
                "&:hover": { background: "#f5f5f5" }
              }}
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Free Trial"}
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* ================= STATS SECTION ================= */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Trusted by Thousands of Teams
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 8 }}>
          Join the community of successful project managers
        </Typography>
        
        {/* Unique Stats Layout */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          gap: 4,
          maxWidth: "800px",
          mx: "auto"
        }}>
          {/* Main Featured Stat */}
          <Box sx={{
            background: "linear-gradient(135deg, #4361ee, #7209b7)",
            borderRadius: "24px",
            padding: "40px",
            textAlign: "center",
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(67,97,238,0.3)",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 25px 70px rgba(67,97,238,0.4)",
              transition: "all 0.3s ease",
            },
          }}>
            <Box sx={{
              position: "absolute",
              top: "-50%",
              right: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              animation: "pulse 3s ease-in-out infinite",
            }} />
            <Typography variant="h2" fontWeight="bold" sx={{ fontSize: "3.5rem", mb: 1 }}>
              100+
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
              Projects Managed Successfully
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <FolderOpen sx={{ fontSize: 40, opacity: 0.8 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Across 50+ industries
              </Typography>
            </Box>
          </Box>

          {/* Secondary Stats Row */}
          <Box sx={{ 
            display: "flex", 
            gap: 3, 
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            {[
              { 
                value: "5K+", 
                label: "Tasks Completed", 
                icon: <CheckCircle />, 
                color: "#4cc9f0",
                description: "With 98% on-time delivery"
              },
              { 
                value: "1K+", 
                label: "Active Users", 
                icon: <Groups />, 
                color: "#7209b7",
                description: "From 25+ countries"
              },
              { 
                value: "85%", 
                label: "Productivity Boost", 
                icon: <TrendingUp />, 
                color: "#3a0ca3",
                description: "Average improvement"
              },
            ].map((stat, index) => (
              <Box key={index} sx={{
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center",
                minWidth: "180px",
                border: `1px solid ${stat.color}20`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                  background: "rgba(255,255,255,0.95)",
                },
              }}>
                <Box sx={{ 
                  fontSize: 40, 
                  color: stat.color, 
                  mb: 1,
                  display: "flex",
                  justifyContent: "center"
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" fontWeight="bold" color={stat.color} sx={{ mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                  {stat.label}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                  {stat.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Progress Indicator */}
          <Box sx={{
            width: "100%",
            maxWidth: "600px",
            textAlign: "center",
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Join 10,000+ teams already using Project Tracker
            </Typography>
            <Box sx={{
              height: "8px",
              background: "#e0e0e0",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
            }}>
              <Box sx={{
                width: "75%",
                height: "100%",
                background: "linear-gradient(90deg, #4361ee, #4cc9f0)",
                borderRadius: "4px",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  animation: "shimmer 2s infinite",
                },
              }} />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              75% of teams report improved efficiency within first month
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* ================= FEATURES ================= */}
      <Box sx={{ background: "#f8f9ff", py: 12 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            Powerful Features
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Everything you need to manage projects effectively
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 6 }}>
            <Tab label="Core Features" />
            <Tab label="Advanced Tools" />
            <Tab label="Integrations" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={5}>
              {[
                {
                  title: "Fast Setup",
                  desc: "Start managing projects in minutes with our intuitive onboarding process.",
                  icon: <RocketLaunch fontSize="large" />,
                  color: "#4361ee",
                },
                {
                  title: "Organized Projects",
                  desc: "Keep everything structured and easy to find with smart categorization.",
                  icon: <FolderOpen fontSize="large" />,
                  color: "#7209b7",
                },
                {
                  title: "Real-time Tracking",
                  desc: "Stay updated with live task progress and team collaboration.",
                  icon: <Speed fontSize="large" />,
                  color: "#4cc9f0",
                },
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Fade in timeout={1200 + index * 400}>
                    <Card
                      elevation={6}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        textAlign: "center",
                        transition: "0.4s",
                        height: "100%",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: 10,
                        },
                      }}
                    >
                      <Box sx={{ color: feature.color, mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {feature.desc}
                      </Typography>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={5}>
              {[
                {
                  title: "Timeline View",
                  desc: "Visualize your project timeline with Gantt charts and milestones.",
                  icon: <Timeline fontSize="large" />,
                  color: "#3a0ca3",
                },
                {
                  title: "Advanced Analytics",
                  desc: "Get insights with detailed reports and performance metrics.",
                  icon: <Analytics fontSize="large" />,
                  color: "#4361ee",
                },
                {
                  title: "Security & Compliance",
                  desc: "Enterprise-grade security with role-based access control.",
                  icon: <Security fontSize="large" />,
                  color: "#7209b7",
                },
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Fade in timeout={1200 + index * 400}>
                    <Card
                      elevation={6}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        textAlign: "center",
                        transition: "0.4s",
                        height: "100%",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: 10,
                        },
                      }}
                    >
                      <Box sx={{ color: feature.color, mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {feature.desc}
                      </Typography>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={5}>
              {[
                {
                  title: "Cloud Sync",
                  desc: "Automatic backup and sync across all your devices.",
                  icon: <CloudSync fontSize="large" />,
                  color: "#4cc9f0",
                },
                {
                  title: "API Integration",
                  desc: "Connect with your favorite tools using our REST API.",
                  icon: <IntegrationInstructions fontSize="large" />,
                  color: "#3a0ca3",
                },
                {
                  title: "24/7 Support",
                  desc: "Get help whenever you need it with our dedicated support team.",
                  icon: <SupportAgent fontSize="large" />,
                  color: "#4361ee",
                },
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Fade in timeout={1200 + index * 400}>
                    <Card
                      elevation={6}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        textAlign: "center",
                        transition: "0.4s",
                        height: "100%",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: 10,
                        },
                      }}
                    >
                      <Box sx={{ color: feature.color, mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {feature.desc}
                      </Typography>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Simple Features */}
      <Box sx={{ py: 10, background: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" fontWeight="bold" sx={{ mb: 6 }}>
            Everything You Need
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: "📊", title: "Analytics", desc: "Track your progress with real-time analytics." },
              { icon: "👥", title: "Team Work", desc: "Collaborate seamlessly with your team." },
              { icon: "📅", title: "Scheduling", desc: "Never miss a deadline with smart scheduling." },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: "center", p: 3 }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>{feature.icon}</Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="#666">{feature.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Simple CTA */}
      <Box sx={{ py: 10, background: "#764ba2", color: "white", textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Get Started?
          </Typography>
          <Typography sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of teams using Project Tracker
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href={isAuthenticated ? route("dashboard") : route("register")}
            sx={{
              px: 6,
              py: 2,
              background: "white",
              color: "#764ba2",
              fontWeight: "bold",
              "&:hover": { background: "#f5f5f5" }
            }}
          >
            {isAuthenticated ? "Go to Dashboard" : "Start Free Trial"}
          </Button>
        </Container>
      </Box>

      {/* Simple Footer */}
      <Box sx={{ py: 6, background: "#2c3e50", color: "white", textAlign: "center" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Project Tracker. All rights reserved.
        </Typography>
      </Box>

      {/* Demo Dialog */}
      <Dialog open={demoOpen} onClose={handleDemoClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="bold">Watch Demo</Typography>
            <IconButton onClick={handleDemoClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3
            }}>
              <PlayArrow sx={{ fontSize: 40, color: "white" }} />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              See Project Tracker in Action
            </Typography>
            <Typography variant="body2" color="#666" sx={{ mb: 3 }}>
              Watch how teams like yours manage projects 10x more efficiently
            </Typography>
          </Box>
          
          <Box sx={{ 
            height: "200px", 
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
            borderRadius: 3, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            mb: 4,
            position: "relative",
            overflow: "hidden"
          }}>
            <Box sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                background: "white",
                transform: "translate(-50%, -50%) scale(1.1)"
              }
            }}>
              <PlayArrow sx={{ fontSize: 30, color: "#764ba2" }} />
            </Box>
            <Typography variant="body2" color="#666" sx={{ position: "absolute", bottom: 10 }}>
              2:30 min demo
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3, flexWrap: "wrap" }}>
            {["🚀 Quick Start", "📊 Smart Analytics", "👥 Team Collaboration", "📱 Mobile Access"].map((feature, index) => (
              <Typography key={index} variant="caption" sx={{ 
                color: "#667eea", 
                fontWeight: "600",
                backgroundColor: "#f0f4ff",
                px: 2,
                py: 1,
                borderRadius: 2
              }}>
                {feature}
              </Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "center" }}>
          <Button onClick={handleDemoClose} sx={{ mr: 2 }}>
            Maybe Later
          </Button>
          {!isAuthenticated && (
            <Button
              variant="contained"
              component={Link}
              href={route("register")}
              onClick={handleDemoClose}
              sx={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                px: 4,
                "&:hover": {
                  background: "linear-gradient(135deg, #5a67d8, #6b46c1)"
                }
              }}
            >
              Start Free Trial
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
