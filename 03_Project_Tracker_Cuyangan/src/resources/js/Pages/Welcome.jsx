import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Fade,
  Zoom,
} from "@mui/material";
import {
  AssignmentTurnedIn,
  Dashboard,
  AutoGraph,
  Security,
  RocketLaunch,
  ArrowForward,
} from "@mui/icons-material";

export default function Welcome({ auth }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const features = [
    {
      icon: <Dashboard fontSize="large" />,
      title: "Smart Project Dashboard",
      description:
        "Visualize progress, manage milestones, and monitor everything in one intuitive dashboard.",
    },
    {
      icon: <AssignmentTurnedIn fontSize="large" />,
      title: "Advanced Task Management",
      description:
        "Organize tasks by priority and status with real-time updates and seamless workflow.",
    },
    {
      icon: <AutoGraph fontSize="large" />,
      title: "Productivity Insights",
      description:
        "Track performance trends and improve efficiency with structured project monitoring.",
    },
    {
      icon: <Security fontSize="large" />,
      title: "Secure & Reliable",
      description:
        "Built with authentication, authorization, and protected routing for safe access.",
    },
  ];

  return (
    <>
      <Head title="Project Tracker" />

      {/* NAVBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(17,24,39,0.85)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <RocketLaunch sx={{ color: "#22c55e" }} />
            <Typography variant="h6" fontWeight={700}>
              Project Tracker
            </Typography>
          </Box>

          <Box>
            <Button color="inherit" sx={{ mr: 2 }} href={route("login")}>
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#22c55e",
                "&:hover": { bgcolor: "#16a34a" },
              }}
              href={route("register")}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO */}
      <Box
        sx={{
          pt: 22,
          pb: 16,
          background: "linear-gradient(135deg,#1e3a8a,#2563eb,#3b82f6)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Fade in={animate} timeout={1000}>
            <Box>
              <Typography variant="h2" fontWeight={800} gutterBottom>
                Organize. Track. Achieve.
              </Typography>

              <Typography variant="h6" sx={{ mb: 5, opacity: 0.9 }}>
                A modern project tracking system designed for developers,
                teams, and students.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                href={auth.user ? route("dashboard") : route("register")}
                sx={{
                  bgcolor: "#22c55e",
                  px: 6,
                  py: 1.8,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#16a34a" },
                }}
              >
                Start Building
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box sx={{ py: 14, bgcolor: "#f9fafb" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={10}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Our Features
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              maxWidth="600px"
              mx="auto"
            >
              Powerful tools designed to help teams stay organized,
              productive, and efficient throughout every project stage.
            </Typography>
          </Box>

          <Grid container spacing={6} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Zoom in={animate} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Box textAlign="center">
                    <Box
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg,#2563eb,#3b82f6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        mx: "auto",
                        mb: 3,
                        transition: "0.4s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* OVERVIEW */}
      <Box sx={{ py: 14, bgcolor: "#ffffff" }}>
        <Container maxWidth="md">
          <Fade in={animate} timeout={1200}>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Who We Are
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 3, lineHeight: 1.8 }}
              >
                Project Tracker simplifies workflow management through a clean
                and intuitive interface. Assign tasks, monitor progress, and
                collaborate efficiently with your team.
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 3, lineHeight: 1.8 }}
              >
                Built with Laravel, Inertia.js, and React — ensuring
                scalability, performance, and seamless experience for modern
                teams.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 5,
                  bgcolor: "#2563eb",
                  px: 5,
                  py: 1.5,
                  "&:hover": { bgcolor: "#1e40af" },
                }}
                href={auth.user ? route("dashboard") : route("register")}
              >
                Learn More
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: 14,
          textAlign: "center",
          background: "linear-gradient(135deg,#2563eb,#1e3a8a)",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} mb={3}>
            Ready to Boost Your Productivity?
          </Typography>

          <Typography sx={{ mb: 5, opacity: 0.9 }}>
            Join thousands of users organizing their projects smarter and
            faster.
          </Typography>

          <Button
            variant="contained"
            size="large"
            href={auth.user ? route("dashboard") : route("register")}
            sx={{
              bgcolor: "#22c55e",
              px: 6,
              py: 1.8,
              fontWeight: 600,
              "&:hover": { bgcolor: "#16a34a" },
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          py: 6,
          bgcolor: "#111827",
          color: "#9ca3af",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © 2026 Project Tracker — Designed for Productivity & Growth
        </Typography>
      </Box>
    </>
  );
}
