import 'package:flutter/foundation.dart';
import '../models/hero_model.dart';
import '../services/superhero_api_service.dart';

class HeroSelectionProvider extends ChangeNotifier {
  final SuperheroApiService _api;

  HeroSelectionProvider(this._api);

  List<HeroModel> _fullDatabase = [];
  List<HeroModel> _searchResults = [];
  bool _isLoading = false;
  String _error = '';

  List<HeroModel> get results => _searchResults.isEmpty ? _fullDatabase.take(50).toList() : _searchResults;
  bool get isLoading => _isLoading;
  String get error => _error;

  Future<void> initialize() async {
    if (_fullDatabase.isNotEmpty) return;
    _isLoading = true;
    notifyListeners();
    try {
      _fullDatabase = await _api.fetchAllHeroes();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> search(String query) async {
    final trimmed = query.trim();
    if (trimmed.isEmpty) {
      _searchResults = [];
      notifyListeners();
      return;
    }

    _isLoading = true;
    notifyListeners();

    try {
      if (_fullDatabase.isEmpty) {
        _fullDatabase = await _api.fetchAllHeroes();
      }
      _searchResults = _fullDatabase
          .where((h) => h.name.toLowerCase().contains(trimmed.toLowerCase()) || 
                       h.fullName.toLowerCase().contains(trimmed.toLowerCase()))
          .toList();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
