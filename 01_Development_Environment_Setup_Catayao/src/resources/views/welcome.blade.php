<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laravel Successfully Installed</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        :root {
            --bg1: #0f2027;
            --bg2: #203a43;
            --bg3: #2c5364;
            --accent: #00e5ff;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            min-height: 100vh;
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(120deg, var(--bg1), var(--bg2), var(--bg3));
            background-size: 300% 300%;
            animation: gradientShift 12s ease infinite;
            color: #fff;
            padding: 40px;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .card {
            max-width: 1100px;
            margin: 0 auto 40px;
            padding: 2.5rem 3rem;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(14px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
            text-align: center;
        }

        h1 {
            margin-top: 0;
            font-size: 3rem;
        }

        .pill {
            display: inline-block;
            padding: .5rem 1.4rem;
            border-radius: 999px;
            background: var(--accent);
            color: #000;
            font-weight: 700;
            font-size: .85rem;
            box-shadow: 0 10px 30px rgba(0, 229, 255, .45);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            font-size: 0.95rem;
        }

        th, td {
            padding: 14px 16px;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.15);
            word-break: break-all;
        }

        th {
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 1px;
            opacity: 0.8;
        }

        tr:hover {
            background: rgba(255,255,255,0.05);
        }

        footer {
            text-align: center;
            opacity: 0.5;
            font-size: .8rem;
        }
    </style>
</head>
<body>

<div class="card">
    <h1>Laravel Successfully Installed 🚀</h1>
    <p>by Khenert Catayao</p>
    <span class="pill">Database Connected</span>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Hashed Password</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->password }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

<footer>
    Laravel • MariaDB • Docker
</footer>

</body>
</html>
