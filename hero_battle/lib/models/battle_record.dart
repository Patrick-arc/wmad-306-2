import 'dart:convert';
import 'hero_model.dart';

class BattleRecord {
  final int id;
  final List<HeroModel> playerDeck;
  final List<HeroModel> opponentDeck;
  final String result; // 'win', 'loss', 'draw'
  final int playerScore;
  final int opponentScore;
  final DateTime timestamp;
  final String duration; // e.g., "2m 30s"

  BattleRecord({
    this.id = 0,
    required this.playerDeck,
    required this.opponentDeck,
    required this.result,
    required this.playerScore,
    required this.opponentScore,
    required this.timestamp,
    required this.duration,
  });

  factory BattleRecord.fromJson(Map<String, dynamic> json) {
    return BattleRecord(
      id: json['id'] ?? 0,
      playerDeck: (json['playerDeck'] as List)
          .map((e) => HeroModel.fromJson(e))
          .toList(),
      opponentDeck: (json['opponentDeck'] as List)
          .map((e) => HeroModel.fromJson(e))
          .toList(),
      result: json['result'],
      playerScore: json['playerScore'],
      opponentScore: json['opponentScore'],
      timestamp: DateTime.parse(json['timestamp']),
      duration: json['duration'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'playerDeck': playerDeck.map((e) => e.toJson()).toList(),
    'opponentDeck': opponentDeck.map((e) => e.toJson()).toList(),
    'result': result,
    'playerScore': playerScore,
    'opponentScore': opponentScore,
    'timestamp': timestamp.toIso8601String(),
    'duration': duration,
  };

  String toJsonString() => jsonEncode(toJson());

  factory BattleRecord.fromJsonString(String jsonString) {
    return BattleRecord.fromJson(jsonDecode(jsonString));
  }
}
