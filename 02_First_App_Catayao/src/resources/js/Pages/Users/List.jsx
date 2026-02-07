import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function List() {
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      subject: 'Project Update',
      body: 'The project is almost done. Final review tomorrow.',
    },
    {
      id: 2,
      name: 'Bob Smith',
      subject: 'Meeting Reminder',
      body: 'Reminder about the 3PM meeting today.',
    },
    {
      id: 3,
      name: 'Charlie Cruz',
      subject: 'Welcome!',
      body: 'Welcome to the platform. Let us know if you need help.',
    },
    {
      id: 4,
      name: 'Diana Reyes',
      subject: 'Invoice Attached',
      body: 'Please find the invoice for last month attached.',
    },
    {
      id: 5,
      name: 'Ethan Walker',
      subject: 'Server Maintenance',
      body: 'Scheduled maintenance tonight from 12AM to 2AM.',
    },
    {
      id: 6,
      name: 'Fiona Lee',
      subject: 'Design Feedback',
      body: 'I’ve left some comments on the latest design mockups.',
    },
    {
      id: 7,
      name: 'George Tan',
      subject: 'New Feature Idea',
      body: 'I have an idea for a feature that could improve onboarding.',
    },
    {
      id: 8,
      name: 'Hannah Kim',
      subject: 'Weekly Report',
      body: 'Here is the weekly progress report for the team.',
    },
  ]

  const [activeId, setActiveId] = useState(users[0].id)
  const activeMail = users.find(u => u.id === activeId)

  return (
    <>
      <Head title="Inbox" />

      <div className="mail-layout">
        {/* INBOX LIST */}
        <aside className="inbox">
          {users.map(mail => (
            <div
              key={mail.id}
              className={`mail-item ${
                mail.id === activeId ? 'selected' : ''
              }`}
              onClick={() => setActiveId(mail.id)}
            >
              <strong>{mail.name}</strong>
              <span>{mail.subject}</span>
            </div>
          ))}
        </aside>

        {/* MAIL VIEW */}
        <section className="viewer">
          <h2>{activeMail.subject}</h2>
          <p className="from">From: {activeMail.name}</p>

          <div className="body">{activeMail.body}</div>

          <div className="actions">
            <button>Reply</button>
            <button className="secondary">Archive</button>
          </div>
        </section>
      </div>

      <style>{`
        .mail-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          height: 100%;
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
        }

        .viewer h2 {
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
