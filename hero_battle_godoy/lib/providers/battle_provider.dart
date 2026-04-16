import 'package:flutter/foundation.dart';
import '../models/hero_model.dart';
import '../models/battle_record.dart';
import '../services/database_service.dart';

class BattleProvider extends ChangeNotifier {
  final DatabaseService _db = DatabaseService();

  List<HeroModel> _playerDeck = [];
  HeroModel? _playerHero;
  HeroModel? _aiHero;
  int _playerHp = 0;
  int _aiHp = 0;
  int _round = 0;
  bool _battleOver = false;
  bool _playerWon = false;
  String _battleLog = '';

  List<HeroModel> get playerDeck => _playerDeck;
  HeroModel? get playerHero => _playerHero;
  HeroModel? get aiHero => _aiHero;
  int get playerHp => _playerHp;
  int get aiHp => _aiHp;
  int get round => _round;
  bool get battleOver => _battleOver;
  bool get playerWon => _playerWon;
  String get battleLog => _battleLog;

  void setPlayerDeck(List<HeroModel> deck) {
    _playerDeck = deck;
    notifyListeners();
  }

  void startBattle(HeroModel player, HeroModel ai) {
    _playerHero = player;
    _aiHero = ai;
    _playerHp = player.maxHp;
    _aiHp = ai.maxHp;
    _round = 0;
    _battleOver = false;
    _playerWon = false;
    _battleLog = 'Battle starts: ${player.name} vs ${ai.name}!\n';
    notifyListeners();
  }

  void playRound() {
    if (_battleOver) return;
    _round++;

    // Initiative check
    final playerFirst = (_playerHero!.initiative) >= (_aiHero!.initiative);

    if (playerFirst) {
      _attack(attacker: _playerHero!, defender: _aiHero!, isPlayer: true);
      if (!_battleOver) {
        _attack(attacker: _aiHero!, defender: _playerHero!, isPlayer: false);
      }
    } else {
      _attack(attacker: _aiHero!, defender: _playerHero!, isPlayer: false);
      if (!_battleOver) {
        _attack(attacker: _playerHero!, defender: _aiHero!, isPlayer: true);
      }
    }

    notifyListeners();
  }

  void _attack({
    required HeroModel attacker,
    required HeroModel defender,
    required bool isPlayer,
  }) {
    final damage = (attacker.attack - defender.defense).clamp(1, attacker.attack);
    final isSpecial = _round % 3 == 0;
    final actualDamage = isSpecial ? damage + attacker.specialAttack ~/ 2 : damage;

    if (isPlayer) {
      _aiHp = (_aiHp - actualDamage).clamp(0, _aiHp - actualDamage > 0 ? _aiHp - actualDamage : 0);
      if (_aiHp < 0) _aiHp = 0;
      _battleLog += 'R$_round: ${attacker.name} ${isSpecial ? "SPECIAL" : "attacks"} for $actualDamage dmg! AI HP: $_aiHp\n';
      if (_aiHp <= 0) {
        _battleOver = true;
        _playerWon = true;
        _battleLog += '${_playerHero!.name} wins!\n';
        _saveRecord();
      }
    } else {
      _playerHp = (_playerHp - actualDamage).clamp(0, _playerHp);
      if (_playerHp < 0) _playerHp = 0;
      _battleLog += 'R$_round: ${attacker.name} ${isSpecial ? "SPECIAL" : "attacks"} for $actualDamage dmg! Player HP: $_playerHp\n';
      if (_playerHp <= 0) {
        _battleOver = true;
        _playerWon = false;
        _battleLog += '${_aiHero!.name} wins!\n';
        _saveRecord();
      }
    }
  }

  Future<void> _saveRecord() async {
    final record = BattleRecord(
      playerHero: _playerHero!.name,
      aiHero: _aiHero!.name,
      playerWon: _playerWon,
      roundsPlayed: _round,
      playedAt: DateTime.now().toIso8601String(),
    );
    await _db.saveBattleRecord(record);
  }

  void resetBattle() {
    _playerHero = null;
    _aiHero = null;
    _playerHp = 0;
    _aiHp = 0;
    _round = 0;
    _battleOver = false;
    _playerWon = false;
    _battleLog = '';
    notifyListeners();
  }
}
