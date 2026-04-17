import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../app_config.dart';
import '../../models/hero_model.dart';
import '../../providers/deck_provider.dart';
import '../../providers/hero_search_provider.dart';
import '../../router/app_router.dart';
import '../../services/superhero_api_service.dart';
import '../../widgets/hero_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  static const String _openDrawerArg = 'openDrawer';
  static const String _fromDrawerArg = 'fromDrawer';

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final SuperheroApiService _api =
      SuperheroApiService(apiToken: AppConfig.superheroApiToken);
  final TextEditingController _searchController = TextEditingController();
  late Future<List<HeroModel>> _heroesFuture;
  String _searchInput = '';
  Timer? _searchDebounce;
  Object? _lastHandledDrawerArgs;

  void _openDrawerWhenReady({int attempt = 0}) {
    if (!mounted) {
      return;
    }

    final state = _scaffoldKey.currentState;
    if (state != null) {
      if (!state.isDrawerOpen) {
        state.openDrawer();
      }
      return;
    }

    if (attempt >= 5) {
      return;
    }

    unawaited(
      Future<void>.delayed(
        const Duration(milliseconds: 90),
        () => _openDrawerWhenReady(attempt: attempt + 1),
      ),
    );
  }

  void _runSearch(String value, {bool immediate = false}) {
    final trimmed = value.trim();

    _searchDebounce?.cancel();
    if (immediate) {
      context.read<HeroSearchProvider>().setQuery(trimmed, _api);
      return;
    }

    _searchDebounce = Timer(const Duration(milliseconds: 350), () {
      if (!mounted) {
        return;
      }
      context.read<HeroSearchProvider>().setQuery(trimmed, _api);
    });
  }

  @override
  void initState() {
    super.initState();
    _heroesFuture = _api.fetchRandomHeroes(count: 20);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final searchProvider = context.read<HeroSearchProvider>();
      searchProvider.hydrateLastSearch().then((_) async {
        if (!mounted) {
          return;
        }
        final restored = searchProvider.query;
        _searchController.text = restored;
        setState(() {
          _searchInput = restored;
        });
        if (restored.isNotEmpty) {
          await searchProvider.setQuery(restored, _api);
        }
      });
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final args = ModalRoute.of(context)?.settings.arguments;
    final shouldOpenDrawer =
        args is Map<String, dynamic> && args[_openDrawerArg] == true;
    if (!shouldOpenDrawer || identical(_lastHandledDrawerArgs, args)) {
      return;
    }

    _lastHandledDrawerArgs = args;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) {
        return;
      }
      _openDrawerWhenReady();
    });
  }

  @override
  void dispose() {
    _searchDebounce?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final search = context.watch<HeroSearchProvider>();
    final theme = Theme.of(context);
    final currentRoute = ModalRoute.of(context)?.settings.name;

    return Scaffold(
      key: _scaffoldKey,
      drawer: Drawer(
        width: MediaQuery.of(context).size.width.clamp(300.0, 360.0),
        elevation: 0,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: <Color>[Color(0xFF181627), Color(0xFF120F20)],
            ),
          ),
          child: SafeArea(
            child: Column(
              children: <Widget>[
                Container(
                  margin: const EdgeInsets.fromLTRB(12, 8, 12, 10),
                  padding: const EdgeInsets.fromLTRB(14, 14, 14, 12),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16),
                    color: Colors.white.withValues(alpha: 0.05),
                    border: Border.all(
                      color: Colors.white.withValues(alpha: 0.12),
                    ),
                  ),
                  child: Row(
                    children: <Widget>[
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: <Color>[
                              theme.colorScheme.primary,
                              theme.colorScheme.tertiary,
                            ],
                          ),
                        ),
                        alignment: Alignment.center,
                        child: const Icon(
                          Icons.shield,
                          color: Colors.white,
                          size: 20,
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              'Hero Battle',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'Command Center',
                              style: TextStyle(
                                color: Colors.white70,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: ListView(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    children: <Widget>[
                      _DrawerNavTile(
                        label: 'Home',
                        icon: Icons.home_rounded,
                        selected: currentRoute == RouteNames.home,
                        onTap: () => _navigateFromDrawer(RouteNames.home),
                      ),
                      _DrawerNavTile(
                        label: 'Deck Builder',
                        icon: Icons.style_rounded,
                        selected: currentRoute == RouteNames.deckBuilder,
                        onTap: () =>
                            _navigateFromDrawer(RouteNames.deckBuilder),
                      ),
                      _DrawerNavTile(
                        label: 'Battle',
                        icon: Icons.sports_martial_arts_rounded,
                        selected: currentRoute == RouteNames.battle,
                        onTap: () => _navigateFromDrawer(RouteNames.battle),
                      ),
                      _DrawerNavTile(
                        label: 'History',
                        icon: Icons.history_rounded,
                        selected: currentRoute == RouteNames.history,
                        onTap: () => _navigateFromDrawer(RouteNames.history),
                      ),
                      _DrawerNavTile(
                        label: 'Profile',
                        icon: Icons.person_rounded,
                        selected: currentRoute == RouteNames.profile,
                        onTap: () => _navigateFromDrawer(RouteNames.profile),
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
                  child: Row(
                    children: <Widget>[
                      Icon(
                        Icons.auto_awesome,
                        color: Colors.white.withValues(alpha: 0.45),
                        size: 16,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Fight smart. Build better decks.',
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.58),
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      appBar: AppBar(
        title: const Text('Hero Roster'),
        actions: [
          Consumer<DeckProvider>(
            builder: (context, deck, _) => Stack(
              alignment: Alignment.center,
              children: <Widget>[
                IconButton(
                  icon: const Icon(Icons.style),
                  onPressed: () =>
                      Navigator.pushNamed(context, RouteNames.deckBuilder),
                ),
                if (deck.deckSize > 0)
                  Positioned(
                    right: 6,
                    top: 6,
                    child: CircleAvatar(
                      radius: 8,
                      child: Text(
                        '${deck.deckSize}',
                        style: const TextStyle(fontSize: 10),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: <Widget>[
            TextField(
              controller: _searchController,
              textInputAction: TextInputAction.search,
              onChanged: (value) {
                setState(() {
                  _searchInput = value;
                });
                _runSearch(value);
              },
              onSubmitted: (value) => _runSearch(value, immediate: true),
              decoration: InputDecoration(
                hintText: 'Search hero by name',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.arrow_forward),
                  tooltip: 'Search',
                  onPressed: () =>
                      _runSearch(_searchController.text, immediate: true),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: FutureBuilder<List<HeroModel>>(
                future: _heroesFuture,
                builder: (context, snapshot) {
                  if (search.query.isNotEmpty || _searchInput.isNotEmpty) {
                    if (search.isLoading) {
                      return const Center(child: CircularProgressIndicator());
                    }
                    if (search.error != null) {
                      return Center(child: Text(search.error!));
                    }
                    if (search.results.isEmpty) {
                      return const Center(
                        child: Text('No heroes found.'),
                      );
                    }
                    return _buildGrid(search.results);
                  }

                  if (snapshot.connectionState != ConnectionState.done) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (snapshot.hasError) {
                    return Center(
                      child: FilledButton.tonal(
                        onPressed: () {
                          setState(() {
                            _heroesFuture = _api.fetchRandomHeroes(count: 20);
                          });
                        },
                        child: const Text('Retry loading heroes'),
                      ),
                    );
                  }
                  final heroes = snapshot.data ?? <HeroModel>[];
                  return _buildGrid(heroes);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _navigateFromDrawer(String routeName) {
    final currentRoute = ModalRoute.of(context)?.settings.name;
    Navigator.pop(context);

    if (currentRoute == routeName) {
      return;
    }

    unawaited(
      Future<void>.delayed(Duration.zero, () {
        if (!mounted) {
          return;
        }
        Navigator.pushReplacementNamed(
          context,
          routeName,
          arguments: <String, dynamic>{_fromDrawerArg: true},
        );
      }),
    );
  }

  Widget _buildGrid(List<HeroModel> heroes) {
    return GridView.builder(
      itemCount: heroes.length,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
        childAspectRatio: 0.72,
      ),
      itemBuilder: (_, i) {
        final hero = heroes[i];
        final inDeck = context.read<DeckProvider>().contains(hero);
        return HeroCard(
          hero: hero,
          onTap: () => Navigator.pushNamed(
            context,
            RouteNames.heroDetail,
            arguments: hero,
          ),
          trailing: Icon(
            inDeck ? Icons.check_circle : Icons.add_circle_outline,
            color: inDeck ? Colors.green : null,
          ),
        );
      },
    );
  }
}

class _DrawerNavTile extends StatelessWidget {
  const _DrawerNavTile({
    required this.label,
    required this.icon,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final selectedColor = theme.colorScheme.primary;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(14),
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            curve: Curves.easeOut,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              color: selected
                  ? selectedColor.withValues(alpha: 0.22)
                  : Colors.white.withValues(alpha: 0.03),
              border: Border.all(
                color: selected
                    ? selectedColor.withValues(alpha: 0.60)
                    : Colors.white.withValues(alpha: 0.08),
              ),
            ),
            child: Row(
              children: <Widget>[
                Icon(
                  icon,
                  size: 21,
                  color: selected
                      ? selectedColor
                      : Colors.white.withValues(alpha: 0.86),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    label,
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                      color: selected
                          ? selectedColor
                          : Colors.white.withValues(alpha: 0.95),
                    ),
                  ),
                ),
                if (selected)
                  Container(
                    width: 8,
                    height: 8,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: selectedColor,
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}