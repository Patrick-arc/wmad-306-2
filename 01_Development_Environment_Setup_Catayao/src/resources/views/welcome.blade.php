<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Laravel Mail</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
:root {
    --bg: #0f2027;
    --panel: rgba(255,255,255,0.08);
    --border: rgba(255,255,255,0.15);
    --accent: #00e5ff;
}

* { box-sizing: border-box; }

body {
    margin: 0;
    height: 100vh;
    font-family: system-ui, sans-serif;
    background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
    color: #fff;
    display: flex;
}

/* LAYOUT */
.sidebar {
    width: 260px;
    background: rgba(0,0,0,0.35);
    padding: 20px;
    border-right: 1px solid var(--border);
}

.main {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.topbar {
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    font-weight: 600;
}

.content {
    flex: 1;
    display: grid;
    grid-template-columns: 320px 1fr;
}

/* SIDEBAR */
.compose-btn {
    width: 100%;
    padding: 12px;
    border-radius: 999px;
    border: none;
    background: var(--accent);
    color: #000;
    font-weight: 700;
    margin-bottom: 20px;
    cursor: pointer;
}

.nav-item {
    padding: 10px 14px;
    border-radius: 8px;
    margin-bottom: 6px;
    opacity: .85;
}

.nav-item.active {
    background: rgba(255,255,255,0.12);
    opacity: 1;
}

/* USER LIST */
.users {
    border-right: 1px solid var(--border);
    overflow-y: auto;
}

.user {
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
}

.user strong {
    display: block;
}

/* COMPOSER */
.composer {
    padding: 24px;
}

.composer h2 {
    margin-top: 0;
}

input, textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    padding: 12px 8px;
    color: #fff;
    margin-bottom: 18px;
    font-size: 0.95rem;
}

textarea {
    min-height: 160px;
    resize: vertical;
}

.send-btn {
    padding: 10px 24px;
    border-radius: 999px;
    border: none;
    background: var(--accent);
    color: #000;
    font-weight: 700;
    cursor: pointer;
}

/* SENT MAIL */
.sent {
    margin-top: 30px;
}

.sent-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
}
</style>
</head>

<body>

<!-- SIDEBAR -->
<div class="sidebar">
    <button class="compose-btn">Compose</button>
    <div class="nav-item active">Inbox</div>
    <div class="nav-item">Sent</div>
</div>

<!-- MAIN -->
<div class="main">
    <div class="topbar">Laravel Mail (Mailpit)</div>

    <div class="content">

        <!-- USERS / INBOX -->
        <div class="users">
            @foreach ($users as $user)
                <div class="user">
                    <strong>{{ $user->name }}</strong>
                    <span>{{ $user->email }}</span>
                </div>
            @endforeach
        </div>

        <!-- COMPOSER -->
        <div class="composer">
            <h2>New Message</h2>

            <form method="POST" action="/send-email">
                @csrf

                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                >

                <textarea
                    name="body"
                    placeholder="Write your message…"
                    required
                ></textarea>

                <button class="send-btn">Send to All Users</button>
            </form>

            <!-- SENT EMAILS -->
            <div class="sent">
                <h3>Sent</h3>

                @foreach ($emails as $email)
                    <div class="sent-item">
                        <strong>{{ $email->to_email }}</strong><br>
                        {{ $email->subject }}
                    </div>
                @endforeach
            </div>
        </div>

    </div>
</div>

</body>
</html>
