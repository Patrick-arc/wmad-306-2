import 'package:shared_preferences/shared_preferences.dart';

class PrefsService {
  static const String _keyPlayerName = 'player_name';
  static const String _keyThemeDark = 'theme_dark';
  static const String _keyOnboarded = 'onboarded';
  static const String _keyLastSearchQuery = 'last_search_query';

  // Player Name
  Future<String?> loadPlayerName() async {
    final p = await SharedPreferences.getInstance();
    return p.getString(_keyPlayerName);
  }

  Future<void> savePlayerName(String name) async {
    final p = await SharedPreferences.getInstance();
    await p.setString(_keyPlayerName, name);
  }

  // Theme
  Future<bool> loadThemeDark() async {
    final p = await SharedPreferences.getInstance();
    return p.getBool(_keyThemeDark) ?? true;
  }

  Future<void> saveThemeDark(bool isDark) async {
    final p = await SharedPreferences.getInstance();
    await p.setBool(_keyThemeDark, isDark);
  }

  // Onboarding
  Future<bool> isOnboarded() async {
    final p = await SharedPreferences.getInstance();
    return p.getBool(_keyOnboarded) ?? false;
  }

  Future<void> setOnboarded(bool onboarded) async {
    final p = await SharedPreferences.getInstance();
    await p.setBool(_keyOnboarded, onboarded);
  }

  // Last Search Query
  Future<String?> loadLastSearchQuery() async {
    final p = await SharedPreferences.getInstance();
    return p.getString(_keyLastSearchQuery);
  }

  Future<void> saveLastSearchQuery(String query) async {
    final p = await SharedPreferences.getInstance();
    await p.setString(_keyLastSearchQuery, query);
  }

  Future<void> clearLastSearchQuery() async {
    final p = await SharedPreferences.getInstance();
    await p.remove(_keyLastSearchQuery);
  }
}
