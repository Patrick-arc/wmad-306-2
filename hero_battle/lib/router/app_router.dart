import 'package:flutter/material.dart';
import '../screens/home/home_screen.dart';
import '../screens/splash/splash_screen.dart';
import '../screens/deck/deck_builder_screen.dart';
import '../screens/battle/battle_screen.dart';
import '../screens/history/history_screen.dart';

class RouteNames {
  static const String splash = '';
  static const String home = '/home';
  static const String heroDetail = '/hero';
  static const String deckBuilder = '/deck';
  static const String battle = '/battle';
  static const String history = '/history';
  static const String profile = '/profile';
}

class AppRouter {
  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    Widget page;
    switch (settings.name) {
      case RouteNames.splash:
        page = const SplashScreen();
        break;
      case RouteNames.home:
        page = const HomeScreen();
        break;
      case RouteNames.heroDetail:
        page = const Placeholder();
        break;
      case RouteNames.deckBuilder:
        page = const DeckBuilderScreen();
        break;
      case RouteNames.battle:
        page = const BattleScreen();
        break;
      case RouteNames.history:
        page = const HistoryScreen();
        break;
      case RouteNames.profile:
        page = const Placeholder();
        break;
      default:
        page = const Placeholder();
    }

    return PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) => page,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        const begin = Offset(1.0, 0.0);
        const end = Offset.zero;
        const curve = Curves.easeInOutCubic;

        var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
        var offsetAnimation = animation.drive(tween);

        return SlideTransition(
          position: offsetAnimation,
          child: child,
        );
      },
      transitionDuration: const Duration(milliseconds: 400),
    );
  }
}
