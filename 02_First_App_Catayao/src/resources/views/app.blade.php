<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>User Mail App</title>

    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>

  <body
    style="
      margin: 0;
      min-height: 100vh;
      background: #020617;
      color: #e5e7eb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      flex-direction: column;
    "
  >
    <!-- Top Header -->
    <header
      style="
        padding: 1rem 1.5rem;
        background: #020617;
        border-bottom: 1px solid #1e293b;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <strong style="font-size: 1.1rem;">📨 User Mail</strong>

      <nav style="display: flex; gap: 1rem; font-size: 0.9rem;">
        <span style="opacity: 0.7;">Inbox</span>
        <span style="opacity: 0.7;">Sent</span>
        <span style="opacity: 0.7;">Users</span>
      </nav>
    </header>

    <!-- Main Layout -->
    <div style="flex: 1; display: flex;">
      <!-- Sidebar -->
      <aside
        style="
          width: 220px;
          background: #020617;
          border-right: 1px solid #1e293b;
          padding: 1rem;
          box-sizing: border-box;
        "
      >
        <div style="margin-bottom: 1rem; font-weight: 600;">Folders</div>

        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem;">
          <li style="padding: 0.5rem 0; opacity: 0.8;">📥 Inbox</li>
          <li style="padding: 0.5rem 0; opacity: 0.8;">⭐ Starred</li>
          <li style="padding: 0.5rem 0; opacity: 0.8;">📤 Sent</li>
          <li style="padding: 0.5rem 0; opacity: 0.8;">🗑 Trash</li>
        </ul>
      </aside>

      <!-- Inertia Content Area -->
      <main
        style="
          flex: 1;
          padding: 2rem;
          box-sizing: border-box;
        "
      >
        @inertia
      </main>
    </div>

    <!-- Footer -->
    <footer
      style="
        padding: 0.75rem 1.5rem;
        background: #020617;
        border-top: 1px solid #1e293b;
        font-size: 0.8rem;
        opacity: 0.6;
        text-align: center;
      "
    >
      User Mail App · Laravel + Inertia + React
    </footer>
  </body>
</html>
