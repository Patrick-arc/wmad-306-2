import 'package:flutter/foundation.dart';
import '../models/battle_record.dart';
import '../models/hero_model.dart';
import '../services/database_service.dart';

class BattleProvider extends ChangeNotifier {
  final DatabaseService _db = DatabaseService();

  List<BattleRecord> _battleHistory = [];
  bool _isLoading = false;
  String _error = '';

  List<BattleRecord> get battleHistory => _battleHistory;
  bool get isLoading => _isLoading;
  String get error => _error;

  Future<void> loadBattleHistory() async {
    _isLoading = true;
    _error = '';
    notifyListeners();

    try {
      _battleHistory = await _db.getAllBattleRecords();
    } catch (e) {
      _error = 'Failed to load battle history: $e';
      print('Error loading battle history: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> saveBattleResult({
    required List<HeroModel> playerDeck,
    required List<HeroModel> opponentDeck,
    required String result,
    required int playerScore,
    required int opponentScore,
    required int duration,
  }) async {
    try {
      final record = BattleRecord(
        playerDeck: playerDeck,
        opponentDeck: opponentDeck,
        result: result,
        playerScore: playerScore,
        opponentScore: opponentScore,
        timestamp: DateTime.now(),
        duration: '${duration}s',
      );

      await _db.insertBattleRecord(record);
      await loadBattleHistory();
    } catch (e) {
      _error = 'Failed to save battle result: $e';
      print('Error saving battle result: $e');
      notifyListeners();
    }
  }

  Future<void> deleteBattleRecord(int id) async {
    try {
      await _db.deleteBattleRecord(id);
      await loadBattleHistory();
    } catch (e) {
      _error = 'Failed to delete battle record: $e';
      notifyListeners();
    }
  }

  Future<void> clearHistory() async {
    try {
      await _db.clearAllBattleRecords();
      _battleHistory = [];
      notifyListeners();
    } catch (e) {
      _error = 'Failed to clear history: $e';
      notifyListeners();
    }
  }

  int get totalWins => _battleHistory.where((b) => b.result == 'win').length;
  int get totalLosses => _battleHistory.where((b) => b.result == 'loss').length;
  int get winRate {
    if (_battleHistory.isEmpty) return 0;
    return ((totalWins / _battleHistory.length) * 100).toInt();
  }
}
