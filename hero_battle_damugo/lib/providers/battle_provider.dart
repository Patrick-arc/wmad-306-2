import 'dart:async';

import 'package:flutter/foundation.dart';

import '../engine/battle_engine.dart';
import '../models/battle_record.dart';
import '../models/hero_model.dart';
import '../services/database_service.dart';

class BattleProvider extends ChangeNotifier {
	HeroModel? _playerHero;
	HeroModel? _aiHero;
	int _playerHp = 0;
	int _aiHp = 0;
	int _round = 0;
	bool _isBattleOver = false;
	bool _playerWon = false;
	List<String> _battleLog = <String>[];
  String? _roundWinner;

	HeroModel? get playerHero => _playerHero;
	HeroModel? get aiHero => _aiHero;
	int get playerHp => _playerHp;
	int get aiHp => _aiHp;
	int get round => _round;
	bool get isBattleOver => _isBattleOver;
	bool get playerWon => _playerWon;
	List<String> get battleLog => List.unmodifiable(_battleLog);
  String? get roundWinner => _roundWinner;

	void startBattle({required HeroModel playerHero, required HeroModel aiHero}) {
		_playerHero = playerHero;
		_aiHero = aiHero;
		_playerHp = playerHero.maxHp;
		_aiHp = aiHero.maxHp;
		_round = 0;
		_isBattleOver = false;
		_playerWon = false;
    _roundWinner = null;
		_battleLog = <String>[
			'Battle started: ${playerHero.name} vs ${aiHero.name}',
		];
		notifyListeners();
	}

	Future<void> nextTurn() async {
		if (_isBattleOver || _playerHero == null || _aiHero == null) {
			return;
		}

		_round++;

		final result = BattleEngine.resolveTurn(
			round: _round,
			playerAttack: _playerHero!.attack,
			playerSpecialAttack: _playerHero!.specialAttack,
			playerDefense: _playerHero!.defense,
			aiAttack: _aiHero!.attack,
			aiSpecialAttack: _aiHero!.specialAttack,
			aiDefense: _aiHero!.defense,
		);

		_aiHp = (_aiHp - result.playerDamage).clamp(0, _aiHero!.maxHp);
		_playerHp = (_playerHp - result.aiDamage).clamp(0, _playerHero!.maxHp);

    if (result.playerDamage > result.aiDamage) {
      _roundWinner = _playerHero!.name;
    } else if (result.aiDamage > result.playerDamage) {
      _roundWinner = _aiHero!.name;
    } else {
      _roundWinner = null;
    }

		_battleLog = <String>[
			..._battleLog,
			'Round $_round: ${_playerHero!.name} dealt ${result.playerDamage}',
			'Round $_round: ${_aiHero!.name} dealt ${result.aiDamage}',
		];

		if (_playerHp <= 0 || _aiHp <= 0) {
			_isBattleOver = true;
			_playerWon = _aiHp <= 0 && _playerHp > 0;
			final finishedAt = DateTime.now();
			final mm = finishedAt.month.toString().padLeft(2, '0');
			final dd = finishedAt.day.toString().padLeft(2, '0');
			final hh = finishedAt.hour.toString().padLeft(2, '0');
			final min = finishedAt.minute.toString().padLeft(2, '0');
			final playedAtLabel = '${finishedAt.year}-$mm-$dd $hh:$min';
			_battleLog = <String>[
				..._battleLog,
				_playerWon ? 'You won the battle!' : 'You lost the battle.',
				'Played at: $playedAtLabel',
			];

			unawaited(
				DatabaseService().saveBattleRecord(
					BattleRecord(
						playerHero: _playerHero!.name,
						aiHero: _aiHero!.name,
						playerWon: _playerWon,
						roundsPlayed: _round,
						playedAt: finishedAt.toIso8601String(),
					),
				),
			);
		}

		notifyListeners();
	}

	void reset({bool notify = true}) {
		_playerHero = null;
		_aiHero = null;
		_playerHp = 0;
		_aiHp = 0;
		_round = 0;
		_isBattleOver = false;
		_playerWon = false;
    _roundWinner = null;
		_battleLog = <String>[];
		if (notify) {
			notifyListeners();
		}
	}
}

