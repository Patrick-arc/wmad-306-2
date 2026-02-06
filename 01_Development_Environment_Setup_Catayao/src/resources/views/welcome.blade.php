<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Laravel Email System</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
:root {
    --bg1: #0f2027;
    --bg2: #203a43;
    --bg3: #2c5364;
    --accent: #00e5ff;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    min-height: 100vh;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(120deg, var(--bg1), var(--bg2), var(--bg3));
    background-size: 300% 300%;
    animation: gradientShift 14s ease infinite;
    color: #fff;
    padding: 40px;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px);
    border-radius: 18px;
    padding: 30px 34px;
    margin-bottom: 40px;
    box-shadow: 0 25px 55px rgba(0,0,0,0.45);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.card-header h1 {
    margin: 0;
    font-size: 1.9rem;
    letter-spacing: .5px;
}

button {
    padding: 12px 22px;
    border-radius: 999px;
    border: none;
    background: var(--accent);
    color: #000;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(0,229,255,0.45);
    transition: transform .15s ease, box-shadow .15s ease;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0,229,255,0.6);
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
}

th {
    text-align: left;
    padding: 14px 16px;
    font-size: 0.7rem;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    opacity: 0.7;
    border-bottom: 1px solid rgba(255,255,255,0.2);
}

td {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    word-break: break-word;
}

tr:hover {
    background: rgba(255,255,255,0.05);
}

footer {
    text-align: center;
    opacity: 0.5;
    font-size: 0.8rem;
    margin-top: 40px;
}
</style>
</head>

<body>

<div class="container">

    <!-- USERS -->
    <div class="card">
        <div class="card-header">
            <h1>Users</h1>
            <form method="POST" action="/send-email">
                @csrf
                <button>Send Email to All Users</button>
            </form>
        </div>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- SENT EMAILS -->
    <div class="card">
        <div class="card-header">
            <h1>Sent Emails</h1>
        </div>

        <table>
            <thead>
                <tr>
                    <th>To</th>
                    <th>Subject</th>
                    <th>Body</th>
                    <th>Sent At</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($emails as $email)
                <tr>
                    <td>{{ $email->to_email }}</td>
                    <td>{{ $email->subject }}</td>
                    <td>{{ $email->body }}</td>
                    <td>{{ $email->created_at }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <footer>
        Laravel • MariaDB • Docker • Mailpit
    </footer>

</div>

</body>
</html>
