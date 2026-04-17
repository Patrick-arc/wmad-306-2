import 'package:flutter/foundation.dart';
import '../models/hero_model.dart';
import '../services/superhero_api_service.dart';
import '../services/prefs_service.dart';

class HeroSearchProvider extends ChangeNotifier {
  final SuperheroApiService _apiService = SuperheroApiService();
  final PrefsService _prefs = PrefsService();

  List<HeroModel> _heroes = [];
  bool _isLoading = false;
  String _error = '';
  String _lastSearchQuery = '';

  List<HeroModel> get heroes => _heroes;
  bool get isLoading => _isLoading;
  String get error => _error;
  String get lastSearchQuery => _lastSearchQuery;

  Future<void> loadLastSearchQuery() async {
    _lastSearchQuery = await _prefs.loadLastSearchQuery() ?? '';
    if (_lastSearchQuery.isNotEmpty) {
      await searchHeroes(_lastSearchQuery);
    }
  }

  Future<void> searchHeroes(String query) async {
    if (query.isEmpty) {
      _heroes = [];
      _error = '';
      _lastSearchQuery = '';
      await _prefs.clearLastSearchQuery();
      notifyListeners();
      return;
    }

    _isLoading = true;
    _error = '';
    _lastSearchQuery = query;
    notifyListeners();

    try {
      print('Searching for: $query');
      _heroes = await _apiService.searchHeroes(query);
      print('Found ${_heroes.length} heroes');
      if (_heroes.isEmpty) {
        _error = 'No heroes found for "$query"';
      }
      await _prefs.saveLastSearchQuery(query);
    } catch (e) {
      print('Error searching heroes: $e');
      _error = 'Error: ${e.toString()}';
      _heroes = [];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void clearSearch() {
    _heroes = [];
    _error = '';
    _lastSearchQuery = '';
    _prefs.clearLastSearchQuery();
    notifyListeners();
  }
}