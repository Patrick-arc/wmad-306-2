import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { projects = [], tasks = [], recentActivities = [] } = usePage().props;
  const [darkMode, setDarkMode] = useState(false);

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const activeTasks = tasks.filter((t) => t.status === "not_yet_done").length;

  const pageStyle = {
    background: darkMode
      ? "linear-gradient(135deg, #0f172a, #1e293b)"
      : "linear-gradient(135deg, #dbeafe, #eff6ff)", // lighter blue gradient background
    color: darkMode ? "#ffffff" : "#111827",
    fontFamily: "Arial, sans-serif",
    fontSize: "18px",
    transition: "all 0.4s ease",
  };

  const cardStyle = {
    backgroundColor: darkMode ? "#1e293b" : "#ffffff", // will override in cards individually
    color: darkMode ? "#ffffff" : "#111827",
    transition: "all 0.4s ease",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <div className="flex flex-col items-center min-h-screen p-6 relative" style={pageStyle}>

        {/* Dark Mode Button Top Right */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 right-6 px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:scale-105 transition"
          style={{ backgroundColor: darkMode ? "#6366f1" : "#4f46e5" }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Top Header / Workspace */}
        <div className="w-full max-w-5xl flex flex-col items-center justify-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: darkMode ? "#fbbf24" : "#1e40af" }}>
            MyWorkspace
          </h1>
          <nav className="flex gap-8 mb-6 text-lg font-semibold">
            <a href="/dashboard" className={`px-6 py-2 rounded-xl transition ${darkMode ? "hover:bg-indigo-600 hover:text-white" : "hover:bg-blue-600 hover:text-white"}`}>
              🏠 Dashboard
            </a>
            <a href="/projects" className={`px-6 py-2 rounded-xl transition ${darkMode ? "hover:bg-indigo-600 hover:text-white" : "hover:bg-blue-600 hover:text-white"}`}>
              📁 Projects
            </a>
          </nav>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12 w-full max-w-5xl"
        >

          {/* Overview Card */}
          <div
            className="rounded-3xl p-12"
            style={{
              ...cardStyle,
              backgroundColor: darkMode ? "#1e293b" : "#bfdbfe", // soft blue in light mode
            }}
          >
            <h3 className="text-4xl font-bold mb-8 text-center" style={{ color: darkMode ? "#facc15" : "#1e40af" }}>
              📊 Overview
            </h3>
            <div className="flex flex-col md:flex-row justify-around text-xl md:text-2xl gap-6 text-center">
              <p>📁 Total Projects: <strong>{projects.length}</strong></p>
              <p>🟡 Active Tasks: <strong>{activeTasks}</strong></p>
              <p>🟢 Completed Tasks: <strong>{completedTasks}</strong></p>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Active Tasks */}
            <div
              className="p-10 rounded-3xl"
              style={{
                ...cardStyle,
                borderTop: darkMode ? "4px solid #f59e0b" : "4px solid #fbbf24",
                backgroundColor: darkMode ? "#334155" : "#fef9c3", // soft yellow background
              }}
            >
              <h3 className="text-3xl font-bold mb-6 text-center">🟡 Active Tasks ({activeTasks})</h3>
              {tasks.filter((t) => t.status === "not_yet_done").map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.04 }}
                  className="p-6 mb-5 rounded-xl shadow-lg text-lg md:text-xl"
                  style={{ backgroundColor: darkMode ? "#475569" : "#fef3c7" }}
                >
                  {task.title}
                </motion.div>
              ))}
              {activeTasks === 0 && <p className="text-center" style={{opacity:0.7}}>No active tasks.</p>}
            </div>

            {/* Completed Tasks */}
            <div
              className="p-10 rounded-3xl"
              style={{
                ...cardStyle,
                borderTop: darkMode ? "4px solid #10b981" : "4px solid #6ee7b7",
                backgroundColor: darkMode ? "#334155" : "#d1fae5", // soft green background
              }}
            >
              <h3 className="text-3xl font-bold mb-6 text-center">🟢 Completed Tasks ({completedTasks})</h3>
              {tasks.filter((t) => t.status === "completed").map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.04 }}
                  className="p-6 mb-5 rounded-xl shadow-lg text-lg md:text-xl"
                  style={{ backgroundColor: darkMode ? "#475569" : "#bbf7d0" }}
                >
                  {task.title}
                </motion.div>
              ))}
              {completedTasks === 0 && <p className="text-center" style={{opacity:0.7}}>No completed tasks yet.</p>}
            </div>

          </div>

          {/* Recent Activity */}
          <div
            className="rounded-3xl p-12"
            style={{
              ...cardStyle,
              backgroundColor: darkMode ? "#1e293b" : "#dbeafe", // soft blue background
            }}
          >
            <h3 className="text-4xl font-bold mb-8 text-center" style={{ color: darkMode ? "#38bdf8" : "#2563eb" }}>
              🚀 Recent Activity
            </h3>
            <div className="space-y-5 text-lg md:text-xl">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between p-6 rounded-xl shadow"
                    style={{ backgroundColor: darkMode ? "#334155" : "#e0f2fe" }}
                  >
                    <span>{activity.description}</span>
                    <span style={{opacity:0.6}}>{activity.timeAgo}</span>
                  </div>
                ))
              ) : (
                <p className="text-center" style={{opacity:0.7}}>No recent activity.</p>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AuthenticatedLayout>
  );
}