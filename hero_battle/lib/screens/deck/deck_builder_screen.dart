import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../providers/deck_provider.dart';
import '../../models/hero_model.dart';
import '../../services/deck_service.dart';
import '../../widgets/hero_image_widget.dart';

class DeckBuilderScreen extends StatefulWidget {
  const DeckBuilderScreen({super.key});

  @override
  State<DeckBuilderScreen> createState() => _DeckBuilderScreenState();
}

class _DeckBuilderScreenState extends State<DeckBuilderScreen> {
  final DeckService _deckService = DeckService();
  bool _isLoading = true;
  String? _error;
  String _selectedStatFilter = 'All';
  int _cardsPerRow = 2;
  double _statThreshold = 0;

  static const List<String> _statOptions = [
    'All',
    'Intelligence',
    'Strength',
    'Speed',
    'Durability',
    'Power',
    'Combat',
  ];

  static const List<int> _rowOptions = [2, 5, 10];

  final Map<String, int Function(HeroModel)> _statSelectors = {
    'Intelligence': (hero) => hero.powerstats.intelligence,
    'Strength': (hero) => hero.powerstats.strength,
    'Speed': (hero) => hero.powerstats.speed,
    'Durability': (hero) => hero.powerstats.durability,
    'Power': (hero) => hero.powerstats.power,
    'Combat': (hero) => hero.powerstats.combat,
  };

  @override
  void initState() {
    super.initState();
    _loadAvailableCards();
  }

  Future<void> _loadAvailableCards() async {
    try {
      final cards = await _deckService.fetchAvailableCards();
      if (mounted) {
        context.read<DeckProvider>().setAvailableCards(cards);
        setState(() => _isLoading = false);
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  void _showConfirmationModal(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => _buildConfirmationModal(context),
    );
  }

  List<HeroModel> _filterCards(List<HeroModel> allCards) {
    if (_selectedStatFilter == 'All') {
      return allCards;
    }

    final selector = _statSelectors[_selectedStatFilter]!;
    return allCards
        .where((hero) => selector(hero) >= _statThreshold)
        .toList();
  }

  String _getStatLabelValue(HeroModel hero) {
    if (_selectedStatFilter == 'All') {
      return '';
    }
    final value = _statSelectors[_selectedStatFilter]!(hero);
    return '${_selectedStatFilter.substring(0, 3)}: $value';
  }

  Widget _buildConfirmationModal(BuildContext context) {
    final selectedCards = context.read<DeckProvider>().selectedCards;
    
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(
            colors: [Color(0xFFE53935), Color(0xFFC62828)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Deck Complete!',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            )
            .animate()
            .fadeIn(duration: 400.ms)
            .slideY(begin: -0.5, end: 0, duration: 400.ms),

            const SizedBox(height: 16),

            const Text(
              'Your 5 selected cards:',
              style: TextStyle(
                fontSize: 16,
                color: Colors.white70,
              ),
            )
            .animate()
            .fadeIn(duration: 400.ms, delay: 200.ms),

            const SizedBox(height: 16),

            // Selected cards list
            Container(
              constraints: const BoxConstraints(maxHeight: 200),
              child: ListView.builder(
                shrinkWrap: true,
                itemCount: selectedCards.length,
                itemBuilder: (context, index) {
                  final card = selectedCards[index];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: Colors.white.withOpacity(0.3),
                      ),
                    ),
                    child: Row(
                      children: [
                        Text(
                          '${index + 1}.',
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            card.name,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  )
                  .animate()
                  .fadeIn(duration: 300.ms, delay: (300 + index * 100).ms)
                  .slideX(begin: 0.5, end: 0, duration: 300.ms, delay: (300 + index * 100).ms);
                },
              ),
            ),

            const SizedBox(height: 24),

            // Buttons
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.grey[600],
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    child: const Text(
                      'Rechoose Cards',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  )
                  .animate()
                  .fadeIn(duration: 400.ms, delay: 800.ms)
                  .slideY(begin: 0.5, end: 0, duration: 400.ms, delay: 800.ms),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    onPressed: () {
                      Navigator.pop(context); // Close modal
                      Navigator.pushNamed(context, '/battle');
                    },
                    child: const Text(
                      'Start Battle',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  )
                  .animate()
                  .fadeIn(duration: 400.ms, delay: 900.ms)
                  .slideY(begin: 0.5, end: 0, duration: 400.ms, delay: 900.ms),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Deck Builder'),
          backgroundColor: Theme.of(context).colorScheme.primaryContainer,
        ),
        body: const Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Deck Builder'),
          backgroundColor: Theme.of(context).colorScheme.primaryContainer,
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 64, color: Colors.red),
              const SizedBox(height: 16),
              Text(
                'Error: $_error',
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    _isLoading = true;
                    _error = null;
                  });
                  _loadAvailableCards();
                },
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Deck Builder')
            .animate()
            .fadeIn(duration: 600.ms)
            .slideY(begin: -0.5, end: 0, duration: 600.ms),
        backgroundColor: Theme.of(context).colorScheme.primaryContainer,
        elevation: 0,
      ),
      body: Consumer<DeckProvider>(
        builder: (context, deckProvider, child) {
          final filteredCards = _filterCards(deckProvider.availableCards);
          return Column(
            children: [
              // Header with selection counter
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(20),
                    bottomRight: Radius.circular(20),
                  ),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Select Your Deck',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Cards selected: ${deckProvider.selectedCount}/${DeckProvider.maxCards}',
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: deckProvider.isDeckComplete
                                ? Colors.green
                                : Colors.grey[400],
                          ),
                          child: Text(
                            '${deckProvider.selectedCount}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                        ),
                      ],
                    ),
                    if (deckProvider.isDeckComplete)
                      Padding(
                        padding: const EdgeInsets.only(top: 12),
                        child: SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.green,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            onPressed: () {
                              _showConfirmationModal(context);
                            },
                            child: const Text(
                              'Confirm Deck',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          )
                          .animate()
                          .fadeIn(duration: 400.ms)
                          .slideY(begin: -0.3, end: 0, duration: 400.ms),
                        ),
                      ),
                  ],
                ),
              )
              .animate()
              .fadeIn(duration: 600.ms, delay: 200.ms)
              .slideY(begin: -0.3, end: 0, duration: 600.ms, delay: 200.ms),

              // Stat filter and row count controls
              Container(
                width: double.infinity,
                color: Theme.of(context).colorScheme.surfaceVariant,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Filter by stat',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: _statOptions.map((stat) {
                        final isSelected = _selectedStatFilter == stat;
                        return ChoiceChip(
                          label: Text(stat),
                          selected: isSelected,
                          onSelected: (_) {
                            setState(() {
                              _selectedStatFilter = stat;
                              _statThreshold = 0;
                            });
                          },
                          selectedColor: Colors.red.shade700,
                          backgroundColor: Colors.grey.shade800,
                          labelStyle: TextStyle(
                            color: isSelected ? Colors.white : Colors.white70,
                          ),
                        );
                      }).toList(),
                    ),
                    if (_selectedStatFilter != 'All') ...[
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Slider.adaptive(
                              value: _statThreshold,
                              min: 0,
                              max: 100,
                              divisions: 10,
                              label: _statThreshold.toInt().toString(),
                              onChanged: (value) {
                                setState(() {
                                  _statThreshold = value;
                                });
                              },
                            ),
                          ),
                          const SizedBox(width: 12),
                          SizedBox(
                            width: 50,
                            child: Text(
                              '${_statThreshold.toInt()}',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ],
                      ),
                    ],
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        const Text(
                          'Cards per row:',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Wrap(
                          spacing: 8,
                          children: _rowOptions.map((count) {
                            final isSelected = _cardsPerRow == count;
                            return ChoiceChip(
                              label: Text(count.toString()),
                              selected: isSelected,
                              onSelected: (_) {
                                setState(() {
                                  _cardsPerRow = count;
                                });
                              },
                              selectedColor: Colors.red.shade700,
                              backgroundColor: Colors.grey.shade800,
                              labelStyle: TextStyle(
                                color: isSelected ? Colors.white : Colors.white70,
                              ),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ],
                ),
              )
              .animate()
              .fadeIn(duration: 600.ms, delay: 300.ms)
              .slideY(begin: -0.2, end: 0, duration: 600.ms, delay: 300.ms),

              // Available cards grid
              Expanded(
                child: filteredCards.isEmpty
                    ? Center(
                        child: Text(
                          _selectedStatFilter == 'All'
                              ? 'No hero cards available.'
                              : 'No heroes match $_selectedStatFilter ≥ ${_statThreshold.toInt()}',
                          style: const TextStyle(
                            color: Colors.white70,
                            fontSize: 16,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      )
                    : GridView.builder(
                        padding: const EdgeInsets.all(16),
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: _cardsPerRow,
                          childAspectRatio: 0.7,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                        ),
                        itemCount: filteredCards.length,
                        itemBuilder: (context, index) {
                          final card = filteredCards[index];
                          final isSelected = deckProvider.isCardSelected(card);

                    return HeroCardSelector(
                      card: card,
                      isSelected: isSelected,
                      canSelect: !isSelected && !deckProvider.isDeckComplete,
                      statBadge: _selectedStatFilter != 'All' ? _getStatLabelValue(card) : null,
                      onTap: () {
                        if (isSelected) {
                          deckProvider.deselectCard(card);
                        } else if (!deckProvider.isDeckComplete) {
                          deckProvider.selectCard(card);
                        }
                      },
                    )
                    .animate()
                    .fadeIn(duration: 400.ms, delay: (index * 50).ms)
                    .slideY(begin: 0.3, end: 0, duration: 400.ms, delay: (index * 50).ms);
                  },
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

class HeroCardSelector extends StatelessWidget {
  final HeroModel card;
  final bool isSelected;
  final bool canSelect;
  final String? statBadge;
  final VoidCallback onTap;

  const HeroCardSelector({
    super.key,
    required this.card,
    required this.isSelected,
    required this.canSelect,
    this.statBadge,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Stack(
        children: [
          // Card background
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: isSelected ? Colors.green : Colors.grey[300]!,
                width: isSelected ? 3 : 1,
              ),
              boxShadow: [
                if (isSelected)
                  BoxShadow(
                    color: Colors.green.withOpacity(0.5),
                    blurRadius: 10,
                    spreadRadius: 2,
                  ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(14),
              child: Stack(
                children: [
                  // Hero image with fallback
                  HeroImageWidget(
                    hero: card,
                    fit: BoxFit.cover,
                  ),
                  // Gradient overlay
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.transparent,
                          Colors.black.withOpacity(0.7),
                        ],
                      ),
                    ),
                  ),
                  if (statBadge != null)
                    Positioned(
                      top: 8,
                      left: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.7),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          statBadge!,
                          style: const TextStyle(
                            fontSize: 10,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  // Card info
                  Positioned(
                    bottom: 0,
                    left: 0,
                    right: 0,
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            card.name,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 4),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'STR: ${card.powerstats.strength}',
                                style: const TextStyle(
                                  color: Colors.white70,
                                  fontSize: 12,
                                ),
                              ),
                              Text(
                                'SPD: ${card.powerstats.speed}',
                                style: const TextStyle(
                                  color: Colors.white70,
                                  fontSize: 12,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Selection indicator
          if (isSelected)
            Positioned(
              top: 8,
              right: 8,
              child: Container(
                padding: const EdgeInsets.all(8),
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.green,
                ),
                child: const Icon(
                  Icons.check,
                  color: Colors.white,
                  size: 20,
                ),
              )
              .animate()
              .scale(duration: 300.ms)
              .rotate(duration: 300.ms),
            ),

          // Disabled overlay
          if (!canSelect && !isSelected)
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14),
                  color: Colors.black.withOpacity(0.4),
                ),
                child: Center(
                  child: Text(
                    'Deck Full',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                      shadows: [
                        Shadow(
                          offset: const Offset(0, 2),
                          blurRadius: 4,
                          color: Colors.black.withOpacity(0.5),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
