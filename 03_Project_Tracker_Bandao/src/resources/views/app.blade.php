<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Default Title (will be overridden by Inertia <Head>) -->
    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Vite React -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])

    <!-- Ziggy: expose Laravel routes to JS -->
    @routes

    <!-- Inertia Head -->
    @inertiaHead
</head>
<body class="antialiased">
    <!-- Inertia App Mount -->
    @inertia
</body>
</html>
