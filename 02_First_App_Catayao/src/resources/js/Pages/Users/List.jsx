import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function List() {
  const users = [
    { id: 1, name: 'Alice Johnson', subject: 'Project Update', body: 'The project is almost done. Final review tomorrow.' },
    { id: 2, name: 'Bob Smith', subject: 'Meeting Reminder', body: 'Reminder about the 3PM meeting today.' },
    { id: 3, name: 'Charlie Cruz', subject: 'Welcome!', body: 'Welcome to the platform. Let us know if you need help.' },
  ]

  const [activeId, setActiveId] = useState(users[0].id)
  const activeMail = users.find(u => u.id === activeId)

  return (
    <>
      <Head title="Inbox" />

      <div className="mail-app">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <h2>📨 Mail</h2>
          <button className="compose">+ Compose</button>

          <nav>
            <a className="active">Inbox</a>
            <a>Sent</a>
            <a>Drafts</a>
            <a>Trash</a>
          </nav>
        </aside>

        {/* INBOX LIST */}
        <section className="inbox">
          {users.map(mail => (
            <div
              key={mail.id}
              className={`mail-item ${mail.id === activeId ? 'selected' : ''}`}
              onClick={() => setActiveId(mail.id)}
            >
              <strong>{mail.name}</strong>
              <span>{mail.subject}</span>
            </div>
          ))}
        </section>

        {/* MAIL VIEW */}
        <section className="viewer">
          <h3>{activeMail.subject}</h3>
          <p className="from">From: {activeMail.name}</p>
          <div className="body">{activeMail.body}</div>

          <div className="actions">
            <button>Reply</button>
            <button className="secondary">Archive</button>
          </div>
        </section>
      </div>

      <style>{`
        body {
          margin: 0;
          font-family: system-ui, sans-serif;
          background: #0f172a;
          color: #e5e7eb;
        }

        .mail-app {
          display: grid;
          grid-template-columns: 220px 320px 1fr;
          height: calc(100vh - 60px);
        }

        /* SIDEBAR */
        .sidebar {
          background: #020617;
          border-right: 1px solid #1e293b;
          padding: 1rem;
        }

        .sidebar h2 {
          margin: 0 0 1rem;
        }

        .compose {
          width: 100%;
          padding: 0.6rem;
          margin-bottom: 1rem;
          border-radius: 8px;
          border: none;
          background: #6366f1;
          color: white;
          cursor: pointer;
        }

        .sidebar nav a {
          display: block;
          padding: 0.5rem;
          border-radius: 6px;
          color: #cbd5f5;
          text-decoration: none;
          margin-bottom: 0.3rem;
          cursor: pointer;
        }

        .sidebar nav a.active,
        .sidebar nav a:hover {
          background: #1e293b;
        }

        /* INBOX */
        .inbox {
          border-right: 1px solid #1e293b;
          background: #020617;
          overflow-y: auto;
        }

        .mail-item {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #1e293b;
          cursor: pointer;
        }

        .mail-item span {
          display: block;
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .mail-item:hover {
          background: #1e293b;
        }

        .mail-item.selected {
          background: #312e81;
        }

        /* VIEWER */
        .viewer {
          padding: 2rem;
          background: #0f172a;
        }

        .viewer h3 {
          margin-top: 0;
          font-size: 1.5rem;
        }

        .from {
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .body {
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .actions button {
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          border: none;
          margin-right: 0.5rem;
          cursor: pointer;
          background: #6366f1;
          color: white;
        }

        .actions .secondary {
          background: #334155;
        }
      `}</style>
    </>
  )
}
