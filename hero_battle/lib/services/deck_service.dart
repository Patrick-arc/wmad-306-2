import 'package:dio/dio.dart';
import '../models/hero_model.dart';
import 'superhero_api_service.dart';

class DeckService {
  final SuperheroApiService _apiService = SuperheroApiService();
  
  // List of popular superhero IDs from the API
  static const List<int> popularHeroIds = [
    1,    // Superman
    2,    // Batman
    3,    // Hulk
    4,    // Spider-Man
    5,    // Wolverine
    6,    // Iron Man
    7,    // Black Widow
    8,    // Thor
    9,    // Hawkeye
    10,   // Green Goblin
    15,   // Wonder Woman
    16,   // Black Panther
    17,   // Flash
    18,   // Green Lantern
    19,   // Aquaman
    20,   // Ant-Man
  ];

  Future<List<HeroModel>> fetchAvailableCards() async {
    List<HeroModel> availableCards = [];
    
    // Fetch heroes in batches to speed up loading
    const int batchSize = 10; // Number of concurrent requests
    const int maxHeroId = 200;
    
    for (int startId = 1; startId <= maxHeroId; startId += batchSize) {
      final endId = (startId + batchSize - 1).clamp(1, maxHeroId);
      final batchIds = List.generate(endId - startId + 1, (i) => startId + i);
      
      // Fetch this batch concurrently
      final futures = batchIds.map((heroId) => _fetchHeroSafely(heroId));
      final batchResults = await Future.wait(futures);
      
      // Add successful results to the list
      availableCards.addAll(batchResults.where((hero) => hero != null).cast<HeroModel>());
    }
    
    return availableCards;
  }
  
  Future<HeroModel?> _fetchHeroSafely(int heroId) async {
    try {
      return await _apiService.fetchHero(heroId);
    } catch (e) {
      // Skip invalid hero IDs silently
      return null;
    }
  }
}
