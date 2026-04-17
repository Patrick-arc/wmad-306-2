import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'dart:async';
import '../../providers/hero_search_provider.dart';
import '../../providers/player_provider.dart';
import '../../models/hero_model.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();
  Timer? _searchDebounce;

  @override
  void initState() {
    super.initState();
    _loadLastSearchQuery();
  }

  Future<void> _loadLastSearchQuery() async {
    await context.read<HeroSearchProvider>().loadLastSearchQuery();
    final lastQuery = context.read<HeroSearchProvider>().lastSearchQuery;
    if (lastQuery.isNotEmpty && mounted) {
      _searchController.text = lastQuery;
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    _searchDebounce?.cancel();
    super.dispose();
  }

  void _onSearchChanged(String query) {
    _searchDebounce?.cancel();
    _searchDebounce = Timer(const Duration(milliseconds: 500), () {
      if (mounted) {
        context.read<HeroSearchProvider>().searchHeroes(query);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hero Roster')
            .animate()
            .fadeIn(duration: 600.ms)
            .slideY(begin: -0.5, end: 0, duration: 600.ms),
        backgroundColor: Theme.of(context).colorScheme.primaryContainer,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.style),
            onPressed: () {
              Navigator.pushNamed(context, '/deck');
            },
          )
          .animate()
          .fadeIn(duration: 600.ms, delay: 200.ms)
          .scale(duration: 400.ms, delay: 200.ms),
          Consumer<PlayerProvider>(
            builder: (context, player, _) {
              return IconButton(
                icon: Icon(player.isDarkTheme ? Icons.light_mode : Icons.dark_mode),
                onPressed: () {
                  player.toggleTheme();
                },
              )
              .animate()
              .fadeIn(duration: 600.ms, delay: 300.ms)
              .scale(duration: 400.ms, delay: 300.ms);
            },
          ),
          IconButton(
            icon: const Icon(Icons.history),
            onPressed: () {
              Navigator.pushNamed(context, '/history');
            },
          )
          .animate()
          .fadeIn(duration: 600.ms, delay: 400.ms)
          .scale(duration: 400.ms, delay: 400.ms),
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.notifications),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('You have 5 notifications'),
                      duration: Duration(seconds: 2),
                    ),
                  );
                },
              ),
              Positioned(
                right: 6,
                top: 6,
                child: Container(
                  padding: const EdgeInsets.all(2),
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  constraints: const BoxConstraints(
                    minWidth: 16,
                    minHeight: 16,
                  ),
                  child: const Text(
                    '5',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          )
          .animate()
          .fadeIn(duration: 600.ms, delay: 500.ms)
          .scale(duration: 400.ms, delay: 500.ms),
        ],
      ),
      body: Column(
        children: [
          // Search bar
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primaryContainer,
              borderRadius: const BorderRadius.only(
                bottomLeft: Radius.circular(20),
                bottomRight: Radius.circular(20),
              ),
            ),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Search heroes...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: Consumer<HeroSearchProvider>(
                  builder: (context, provider, child) {
                    return provider.isLoading
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                        : IconButton(
                            icon: const Icon(Icons.clear),
                            onPressed: () {
                              _searchController.clear();
                              provider.clearSearch();
                            },
                          );
                  },
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Theme.of(context).colorScheme.surface,
              ),
              onChanged: _onSearchChanged,
            ),
          )
          .animate()
          .fadeIn(duration: 600.ms, delay: 600.ms)
          .slideY(begin: -0.3, end: 0, duration: 600.ms, delay: 600.ms),

          // Results
          Expanded(
            child: Consumer<HeroSearchProvider>(
              builder: (context, provider, child) {
                if (provider.error.isNotEmpty) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.error_outline, size: 64, color: Colors.red)
                            .animate()
                            .scale(duration: 400.ms),
                        const SizedBox(height: 16),
                        Text(
                          provider.error,
                          style: const TextStyle(fontSize: 16),
                          textAlign: TextAlign.center,
                        )
                        .animate()
                        .fadeIn(duration: 400.ms, delay: 200.ms),
                      ],
                    ),
                  );
                }

                if (provider.heroes.isEmpty && !provider.isLoading) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.search, size: 64, color: Colors.grey)
                            .animate()
                            .scale(duration: 400.ms),
                        const SizedBox(height: 16),
                        const Text(
                          'Search for heroes to get started!',
                          style: TextStyle(fontSize: 18, color: Colors.grey),
                        )
                        .animate()
                        .fadeIn(duration: 400.ms, delay: 200.ms),
                      ],
                    ),
                  );
                }

                return ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: provider.heroes.length,
                  itemBuilder: (context, index) {
                    final hero = provider.heroes[index];
                    return HeroCard(hero: hero)
                        .animate()
                        .fadeIn(duration: 400.ms, delay: (index * 100).ms)
                        .slideX(begin: 0.3, end: 0, duration: 400.ms, delay: (index * 100).ms);
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class HeroCard extends StatelessWidget {
  final HeroModel hero;

  const HeroCard({super.key, required this.hero});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: () {
          // Navigate to hero detail
          print('Tap on ${hero.name}');
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              // Hero image
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: CachedNetworkImage(
                  imageUrl: hero.images.url,
                  width: 80,
                  height: 80,
                  fit: BoxFit.cover,
                  placeholder: (context, url) => Container(
                    width: 80,
                    height: 80,
                    color: Colors.grey[300],
                    child: const Icon(Icons.person, size: 40),
                  ),
                  errorWidget: (context, url, error) => Container(
                    width: 80,
                    height: 80,
                    color: Colors.grey[300],
                    child: const Icon(Icons.error),
                  ),
                ),
              )
              .animate()
              .scale(duration: 300.ms),

              const SizedBox(width: 16),

              // Hero info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      hero.name,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    )
                    .animate()
                    .fadeIn(duration: 300.ms),

                    const SizedBox(height: 4),

                    Text(
                      hero.biography.publisher,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[600],
                      ),
                    )
                    .animate()
                    .fadeIn(duration: 300.ms, delay: 100.ms),

                    const SizedBox(height: 8),

                    // Power stats
                    Row(
                      children: [
                        _buildStat('STR', hero.powerstats.strength),
                        const SizedBox(width: 12),
                        _buildStat('SPD', hero.powerstats.speed),
                        const SizedBox(width: 12),
                        _buildStat('PWR', hero.powerstats.power),
                      ],
                    )
                    .animate()
                    .fadeIn(duration: 300.ms, delay: 200.ms),
                  ],
                ),
              ),

              const Icon(Icons.chevron_right)
                  .animate()
                  .fadeIn(duration: 300.ms, delay: 300.ms),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStat(String label, int value) {
    return Column(
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: Colors.grey,
          ),
        ),
        Text(
          value.toString(),
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
}