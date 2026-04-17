import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/battle_record.dart';

class DatabaseService {
  static final DatabaseService _instance = DatabaseService._internal();

  factory DatabaseService() {
    return _instance;
  }

  DatabaseService._internal();

  static Database? _database;

  Future<Database> get database async {
    _database ??= await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'hero_battle.db');

    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE battle_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        playerDeck TEXT NOT NULL,
        opponentDeck TEXT NOT NULL,
        result TEXT NOT NULL,
        playerScore INTEGER NOT NULL,
        opponentScore INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        duration TEXT NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE saved_decks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cards TEXT NOT NULL,
        timestamp TEXT NOT NULL
      )
    ''');
  }

  // Battle Records
  Future<int> insertBattleRecord(BattleRecord record) async {
    final db = await database;
    return await db.insert('battle_records', {
      'playerDeck': record.toJsonString(),
      'opponentDeck': record.opponentDeck.map((e) => e.toJson()).toList().toString(),
      'result': record.result,
      'playerScore': record.playerScore,
      'opponentScore': record.opponentScore,
      'timestamp': record.timestamp.toIso8601String(),
      'duration': record.duration,
    });
  }

  Future<List<BattleRecord>> getAllBattleRecords() async {
    final db = await database;
    final maps = await db.query('battle_records', orderBy: 'timestamp DESC');

    return List.generate(maps.length, (i) {
      return BattleRecord.fromJsonString(maps[i]['playerDeck'] as String);
    });
  }

  Future<List<BattleRecord>> getBattleRecordsPaginated(int limit, int offset) async {
    final db = await database;
    final maps = await db.query(
      'battle_records',
      orderBy: 'timestamp DESC',
      limit: limit,
      offset: offset,
    );

    return List.generate(maps.length, (i) {
      return BattleRecord.fromJsonString(maps[i]['playerDeck'] as String);
    });
  }

  Future<int> deleteBattleRecord(int id) async {
    final db = await database;
    return await db.delete('battle_records', where: 'id = ?', whereArgs: [id]);
  }

  Future<int> clearAllBattleRecords() async {
    final db = await database;
    return await db.delete('battle_records');
  }

  // Saved Decks
  Future<int> saveDeck(String name, String cardsJson) async {
    final db = await database;
    return await db.insert('saved_decks', {
      'name': name,
      'cards': cardsJson,
      'timestamp': DateTime.now().toIso8601String(),
    });
  }

  Future<List<Map<String, dynamic>>> getAllSavedDecks() async {
    final db = await database;
    return await db.query('saved_decks', orderBy: 'timestamp DESC');
  }

  Future<int> deleteSavedDeck(int id) async {
    final db = await database;
    return await db.delete('saved_decks', where: 'id = ?', whereArgs: [id]);
  }

  Future<void> closeDatabase() async {
    if (_database != null) {
      await _database!.close();
      _database = null;
    }
  }
}
