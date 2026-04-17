import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'dart:math';
import '../../models/hero_model.dart';
import '../../providers/deck_provider.dart';
import '../../providers/battle_provider.dart';
import '../../services/superhero_api_service.dart';
import '../../services/deck_service.dart';

class BattleScreen extends StatefulWidget {
  const BattleScreen({super.key});

  @override
  State<BattleScreen> createState() => _BattleScreenState();
}

class _BattleScreenState extends State<BattleScreen> {
  late List<HeroModel> playerDeck;
  late List<HeroModel> aiDeck;
  late BattleResult battleResult;
  bool _isLoading = true;
  String? _error;
  late int totalPlayerScore;
  late int totalAiScore;

  @override
  void initState() {
    super.initState();
    _initiateBattle();
  }

  Future<void> _initiateBattle() async {
    try {
      // Get player's selected deck
      playerDeck = context.read<DeckProvider>().selectedCards;

      if (playerDeck.length < 5) {
        if (mounted) {
          setState(() {
            _error = 'Please select 5 cards for battle';
            _isLoading = false;
          });
        }
        return;
      }

      // Generate random AI deck
      aiDeck = await _generateAIOpponent();

      // Calculate battle result
      battleResult = _calculateBattle(playerDeck, aiDeck);

      // Save battle result to database
      if (mounted) {
        await context.read<BattleProvider>().saveBattleResult(
          playerDeck: playerDeck,
          opponentDeck: aiDeck,
          result: battleResult.result,
          playerScore: battleResult.playerScore,
          opponentScore: battleResult.aiScore,
          duration: 60,
        );
      }

      if (mounted) {
        setState(() {
          totalPlayerScore = battleResult.playerScore;
          totalAiScore = battleResult.aiScore;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = 'Error initiating battle: $e';
          _isLoading = false;
        });
      }
      print('Battle error: $e');
    }
  }

  Future<List<HeroModel>> _generateAIOpponent() async {
    final SuperheroApiService apiService = SuperheroApiService();
    final random = Random();
    final List<HeroModel> aiCards = [];
    final List<int> selectedIds = [];

    // Pick 5 random hero IDs
    while (selectedIds.length < 5) {
      int randomId = DeckService.popularHeroIds[random.nextInt(DeckService.popularHeroIds.length)];
      if (!selectedIds.contains(randomId)) {
        selectedIds.add(randomId);
      }
    }

    // Fetch the heroes
    for (int id in selectedIds) {
      try {
        final hero = await apiService.fetchHero(id);
        if (hero != null) {
          aiCards.add(hero);
        }
      } catch (e) {
        print('Error fetching AI hero $id: $e');
      }
    }

    return aiCards;
  }

  BattleResult _calculateBattle(List<HeroModel> playerCards, List<HeroModel> aiCards) {
    int playerScore = 0;
    int aiScore = 0;

    // Compare each pair of cards
    for (int i = 0; i < playerCards.length && i < aiCards.length; i++) {
      final playerCard = playerCards[i];
      final aiCard = aiCards[i];

      int playerCardScore = _calculateCardScore(playerCard);
      int aiCardScore = _calculateCardScore(aiCard);

      playerScore += playerCardScore;
      aiScore += aiCardScore;

      print('🎮 Round ${i + 1}: ${playerCard.name} ($playerCardScore) vs ${aiCard.name} ($aiCardScore)');
    }

    // Determine winner
    final result = playerScore > aiScore
        ? 'win'
        : playerScore < aiScore
            ? 'loss'
            : 'draw';

    print('⚔️ Battle Result: Player: $playerScore | AI: $aiScore | Result: $result');

    return BattleResult(
      playerScore: playerScore,
      aiScore: aiScore,
      result: result,
    );
  }

  int _calculateCardScore(HeroModel hero) {
    // Sum all power stats to get total card power
    final stats = hero.powerstats;
    final totalScore = stats.intelligence +
        stats.strength +
        stats.speed +
        stats.durability +
        stats.power +
        stats.combat;
    return totalScore;
  }

  void _goHome() {
    Navigator.popUntil(context, (route) => route.isFirst);
    Navigator.pushReplacementNamed(context, '/home');
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        body: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Color(0xFFE53935),
                Color(0xFFC62828),
              ],
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.shield, size: 80, color: Colors.white)
                    .animate()
                    .scale(duration: 800.ms, curve: Curves.elasticOut)
                    .then()
                    .shimmer(duration: 1200.ms),
                const SizedBox(height: 24),
                const Text(
                  'Initializing Battle...',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                )
                .animate()
                .fadeIn(duration: 600.ms, delay: 200.ms),
              ],
            ),
          ),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Battle'),
          backgroundColor: const Color(0xFFE53935),
          actions: [
            IconButton(
              icon: const Icon(Icons.home),
              onPressed: _goHome,
              tooltip: 'Return to Home',
            )
          ],
        ),
        body: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Color(0xFFE53935),
                Color(0xFFC62828),
              ],
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error_outline, size: 80, color: Colors.white),
                const SizedBox(height: 24),
                Text(
                  _error!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 18,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _goHome,
                  child: const Text('Go Home'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final isPlayerWinner = battleResult.result == 'win';
    final isDraw = battleResult.result == 'draw';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Battle Results'),
        backgroundColor: const Color(0xFFE53935),
        actions: [
          IconButton(
            icon: const Icon(Icons.home),
            onPressed: _goHome,
            tooltip: 'Return to Home',
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFE53935),
              Color(0xFFC62828),
            ],
          ),
        ),
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const SizedBox(height: 24),

                // Battle Header
                const Text(
                  'BATTLE RESULTS',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    letterSpacing: 2,
                  ),
                )
                .animate()
                .fadeIn(duration: 600.ms)
                .scale(duration: 600.ms),

                const SizedBox(height: 32),

                // Player vs AI cards comparison
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.white.withOpacity(0.3)),
                  ),
                  child: Column(
                    children: [
                      // Player deck
                      _buildDeckDisplay(
                        'YOUR DECK',
                        playerDeck,
                        Colors.blue,
                        0,
                      ),

                      const SizedBox(height: 24),

                      // VS
                      const Text(
                        'VS',
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          letterSpacing: 1,
                        ),
                      )
                      .animate()
                      .fadeIn(duration: 600.ms, delay: 300.ms)
                      .scale(duration: 400.ms, delay: 300.ms),

                      const SizedBox(height: 24),

                      // AI deck
                      _buildDeckDisplay(
                        'AI OPPONENT',
                        aiDeck,
                        Colors.amber,
                        600,
                      ),
                    ],
                  ),
                )
                .animate()
                .fadeIn(duration: 600.ms, delay: 200.ms),

                const SizedBox(height: 32),

                // Score display
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.white.withOpacity(0.3)),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildScoreCard(
                            'YOUR SCORE',
                            totalPlayerScore.toString(),
                            Colors.blue,
                            0,
                          ),
                          _buildScoreCard(
                            'AI SCORE',
                            totalAiScore.toString(),
                            Colors.amber,
                            300,
                          ),
                        ],
                      ),
                    ],
                  ),
                )
                .animate()
                .fadeIn(duration: 600.ms, delay: 400.ms),

                const SizedBox(height: 32),

                // Result banner
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: isPlayerWinner
                        ? Colors.green.withOpacity(0.2)
                        : isDraw
                            ? Colors.yellow.withOpacity(0.2)
                            : Colors.red.withOpacity(0.2),
                    border: Border.all(
                      color: isPlayerWinner
                          ? Colors.green
                          : isDraw
                              ? Colors.yellow
                              : Colors.red,
                      width: 2,
                    ),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    children: [
                      Icon(
                        isPlayerWinner
                            ? Icons.celebration
                            : isDraw
                                ? Icons.balance
                                : Icons.sentiment_very_dissatisfied,
                        size: 64,
                        color: isPlayerWinner
                            ? Colors.green
                            : isDraw
                                ? Colors.yellow
                                : Colors.red,
                      )
                      .animate()
                      .scale(duration: 800.ms, curve: Curves.elasticOut),
                      const SizedBox(height: 16),
                      Text(
                        isPlayerWinner
                            ? '🎉 VICTORY!'
                            : isDraw
                                ? '⚖️ DRAW'
                                : '😢 DEFEAT',
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: isPlayerWinner
                              ? Colors.green
                              : isDraw
                                  ? Colors.yellow
                                  : Colors.red,
                        ),
                      )
                      .animate()
                      .fadeIn(duration: 600.ms, delay: 400.ms)
                      .slideY(begin: 0.5, end: 0, duration: 600.ms, delay: 400.ms),
                    ],
                  ),
                )
                .animate()
                .fadeIn(duration: 600.ms, delay: 600.ms),

                const SizedBox(height: 32),

                // Return to home button
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFFE53935),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 32,
                      vertical: 16,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  onPressed: _goHome,
                  icon: const Icon(Icons.home, size: 24),
                  label: const Text(
                    'Return to Home',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                )
                .animate()
                .fadeIn(duration: 600.ms, delay: 800.ms)
                .slideY(begin: 0.5, end: 0, duration: 600.ms, delay: 800.ms),

                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDeckDisplay(
    String title,
    List<HeroModel> deck,
    Color titleColor,
    int delay,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: titleColor,
            letterSpacing: 1,
          ),
        )
        .animate()
        .fadeIn(duration: 400.ms, delay: delay.ms),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: List.generate(deck.length, (index) {
            final hero = deck[index];
            return _buildHeroCard(hero, index, delay);
          }),
        ),
      ],
    );
  }

  Widget _buildHeroCard(HeroModel hero, int index, int delay) {
    return Container(
      width: 70,
      height: 100,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.white.withOpacity(0.5), width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(6),
        child: Stack(
          children: [
            // Hero image or fallback
            CachedNetworkImage(
              imageUrl: hero.images.url,
              fit: BoxFit.cover,
              placeholder: (context, url) => Container(
                color: Colors.grey[700],
                child: const Icon(Icons.person, size: 30, color: Colors.white),
              ),
              errorWidget: (context, url, error) => Container(
                color: Colors.grey[700],
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.person, size: 25, color: Colors.white),
                      const SizedBox(height: 2),
                      Text(
                        hero.name.substring(0, (hero.name.length ~/ 2).clamp(0, hero.name.length)).split(' ')[0],
                        style: const TextStyle(
                          fontSize: 8,
                          color: Colors.white,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            // Hero name overlay
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.7),
                ),
                child: Text(
                  hero.name,
                  style: const TextStyle(
                    fontSize: 8,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    overflow: TextOverflow.ellipsis,
                  ),
                  maxLines: 1,
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ],
        ),
      ),
    )
    .animate()
    .fadeIn(duration: 300.ms, delay: (delay + (index * 100)).ms)
    .scale(duration: 300.ms, delay: (delay + (index * 100)).ms);
  }

  Widget _buildScoreCard(String label, String score, Color color, int delay) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.white.withOpacity(0.7),
            fontWeight: FontWeight.bold,
            letterSpacing: 1,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          score,
          style: TextStyle(
            fontSize: 36,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
      ],
    )
    .animate()
    .fadeIn(duration: 400.ms, delay: delay.ms)
    .slideY(begin: -0.5, end: 0, duration: 400.ms, delay: delay.ms);
  }
}

class BattleResult {
  final int playerScore;
  final int aiScore;
  final String result; // 'win', 'loss', or 'draw'

  BattleResult({
    required this.playerScore,
    required this.aiScore,
    required this.result,
  });
}
