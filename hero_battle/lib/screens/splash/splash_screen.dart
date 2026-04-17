import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../providers/player_provider.dart';
import '../../router/app_router.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    // Load preferences into PlayerProvider before showing any screen
    await context.read<PlayerProvider>().loadFromPrefs();
    if (!mounted) return;
    // Replace splash so the user cannot pop back to it
    Navigator.pushReplacementNamed(context, RouteNames.home);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFE53935),
              Color(0xFFC62828),
            ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Animated logo/icon
              Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: const LinearGradient(
                    colors: [Colors.white, Colors.grey],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.3),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: const Icon(
                  Icons.shield,
                  size: 60,
                  color: Color(0xFFE53935),
                ),
              )
              .animate()
              .scale(duration: 800.ms, curve: Curves.elasticOut)
              .then()
              .shimmer(duration: 1200.ms),

              const SizedBox(height: 40),

              // Animated title
              const Text(
                'Hero Battle',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  letterSpacing: 2,
                ),
              )
              .animate()
              .fadeIn(duration: 600.ms, delay: 400.ms)
              .slideY(begin: 0.5, end: 0, duration: 600.ms, delay: 400.ms),

              const SizedBox(height: 20),

              // Animated subtitle
              const Text(
                'Epic battles await!',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.white70,
                ),
              )
              .animate()
              .fadeIn(duration: 600.ms, delay: 800.ms)
              .slideY(begin: 0.3, end: 0, duration: 600.ms, delay: 800.ms),

              const SizedBox(height: 60),

              // Animated loading indicator
              const CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
              )
              .animate()
              .fadeIn(duration: 600.ms, delay: 1200.ms)
              .scale(duration: 600.ms, delay: 1200.ms),
            ],
          ),
        ),
      ),
    );
  }
}
