import 'package:flutter/foundation.dart';
import 'dart:convert';
import '../models/hero_model.dart';
import '../services/database_service.dart';

class DeckProvider extends ChangeNotifier {
  static const int maxCards = 5;
  
  final DatabaseService _db = DatabaseService();
  final List<HeroModel> _selectedCards = [];
  final List<HeroModel> _allAvailableCards = [];
  final List<Map<String, dynamic>> _savedDecks = [];

  List<HeroModel> get selectedCards => _selectedCards;
  List<HeroModel> get availableCards => _allAvailableCards;
  List<Map<String, dynamic>> get savedDecks => _savedDecks;
  int get selectedCount => _selectedCards.length;
  bool get isDeckComplete => _selectedCards.length == maxCards;

  void setAvailableCards(List<HeroModel> cards) {
    _allAvailableCards.clear();
    _allAvailableCards.addAll(cards);
    notifyListeners();
  }

  void selectCard(HeroModel card) {
    if (_selectedCards.length < maxCards && !isCardSelected(card)) {
      _selectedCards.add(card);
      notifyListeners();
    }
  }

  void deselectCard(HeroModel card) {
    _selectedCards.removeWhere((c) => c.id == card.id);
    notifyListeners();
  }

  bool isCardSelected(HeroModel card) {
    return _selectedCards.any((c) => c.id == card.id);
  }

  void clearSelection() {
    _selectedCards.clear();
    notifyListeners();
  }

  void resetDeck() {
    _selectedCards.clear();
    notifyListeners();
  }

  Future<void> saveDeck(String name) async {
    try {
      final cardsJson = jsonEncode(
        _selectedCards.map((card) => card.toJson()).toList(),
      );
      await _db.saveDeck(name, cardsJson);
      await loadSavedDecks();
    } catch (e) {
      print('Error saving deck: $e');
    }
  }

  Future<void> loadSavedDecks() async {
    try {
      final decks = await _db.getAllSavedDecks();
      _savedDecks.clear();
      _savedDecks.addAll(decks);
      notifyListeners();
    } catch (e) {
      print('Error loading saved decks: $e');
    }
  }

  Future<void> loadDeckFromSaved(int deckId) async {
    try {
      final savedDeck = _savedDecks.firstWhere((d) => d['id'] == deckId);
      final cardsJson = jsonDecode(savedDeck['cards']);
      _selectedCards.clear();
      for (final cardJson in cardsJson) {
        _selectedCards.add(HeroModel.fromJson(cardJson));
      }
      notifyListeners();
    } catch (e) {
      print('Error loading deck: $e');
    }
  }

  Future<void> deleteSavedDeck(int deckId) async {
    try {
      await _db.deleteSavedDeck(deckId);
      await loadSavedDecks();
    } catch (e) {
      print('Error deleting deck: $e');
    }
  }
}
