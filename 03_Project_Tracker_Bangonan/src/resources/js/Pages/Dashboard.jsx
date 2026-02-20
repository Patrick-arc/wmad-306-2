import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { projects = [], tasks = [], recentActivities = [] } =
    usePage().props;

  const [darkMode, setDarkMode] = useState(false);

  const completedTasks = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const activeTasks = tasks.filter(
    (t) => t.status === "not_yet_done"
  ).length;

  const pageStyle = {
    background: darkMode
      ? "#0f172a"
      : "linear-gradient(to bottom right, #e6f0ff, #ffffff)",
    color: darkMode ? "#ffffff" : "#111827",
    fontFamily: "Times New Roman, serif",
    fontSize: "19px",
    transition: "all 0.4s ease"
  };

  const cardStyle = {
    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    transition: "all 0.4s ease"
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <div className="flex min-h-screen" style={pageStyle}>

        {/* Sidebar */}
        <div
          className="w-64 shadow-xl p-6 hidden md:block"
          style={cardStyle}
        >
          <h2 className="text-3xl font-bold mb-10">
            MyWorkspace
          </h2>

          <nav className="space-y-4 text-lg">
            <a href="/dashboard" className="block p-3 rounded-lg hover:bg-blue-100">
              🏠 Dashboard
            </a>
            <a href="/projects" className="block p-3 rounded-lg hover:bg-blue-100">
              📁 Projects
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10 md:p-14">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold">
              Dashboard 🚀
            </h1>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-6 py-3 rounded-xl text-white text-lg"
              style={{
                backgroundColor: darkMode ? "#2563eb" : "#1d4ed8"
              }}
            >
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >

            {/* Overview Card */}
            <div
              className="rounded-3xl shadow-xl p-10"
              style={cardStyle}
            >
              <h3 className="text-3xl font-bold mb-6">
                📊 Overview
              </h3>

              <div className="space-y-4 text-xl">
                <p>📁 Total Projects: <strong>{projects.length}</strong></p>
                <p>🟡 Active Tasks: <strong>{activeTasks}</strong></p>
                <p>🟢 Completed Tasks: <strong>{completedTasks}</strong></p>
              </div>
            </div>

            {/* Kanban Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Active Tasks */}
              <div
                className="p-8 rounded-3xl shadow-xl"
                style={cardStyle}
              >
                <h3 className="text-2xl font-bold mb-6">
                  🟡 Active Tasks ({activeTasks})
                </h3>

                {tasks
                  .filter((t) => t.status === "not_yet_done")
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.03 }}
                      className="p-5 mb-4 rounded-xl shadow"
                      style={{
                        backgroundColor: darkMode ? "#334155" : "#f1f5f9"
                      }}
                    >
                      {task.title}
                    </motion.div>
                  ))}

                {activeTasks === 0 && (
                  <p style={{ opacity: 0.7 }}>
                    No active tasks.
                  </p>
                )}
              </div>

              {/* Completed Tasks */}
              <div
                className="p-8 rounded-3xl shadow-xl"
                style={cardStyle}
              >
                <h3 className="text-2xl font-bold mb-6">
                  🟢 Completed Tasks ({completedTasks})
                </h3>

                {tasks
                  .filter((t) => t.status === "completed")
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.03 }}
                      className="p-5 mb-4 rounded-xl shadow"
                      style={{
                        backgroundColor: darkMode ? "#334155" : "#f1f5f9"
                      }}
                    >
                      {task.title}
                    </motion.div>
                  ))}

                {completedTasks === 0 && (
                  <p style={{ opacity: 0.7 }}>
                    No completed tasks yet.
                  </p>
                )}
              </div>

            </div>

            {/* Recent Activity */}
            <div
              className="rounded-3xl shadow-xl p-10"
              style={cardStyle}
            >
              <h3 className="text-3xl font-bold mb-8">
                🚀 Recent Activity
              </h3>

              <div className="space-y-5">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between p-5 rounded-xl"
                      style={{
                        backgroundColor: darkMode ? "#334155" : "#f1f5f9"
                      }}
                    >
                      <span>{activity.description}</span>
                      <span style={{ opacity: 0.6 }}>
                        {activity.timeAgo}
                      </span>
                    </div>
                  ))
                ) : (
                  <p style={{ opacity: 0.7 }}>
                    No recent activity.
                  </p>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
