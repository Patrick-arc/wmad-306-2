import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../providers/battle_provider.dart';
import '../../providers/deck_provider.dart';
import '../../router/app_router.dart';

class DeckBuilderScreen extends StatefulWidget {
  const DeckBuilderScreen({super.key});

  @override
  State<DeckBuilderScreen> createState() => _DeckBuilderScreenState();
}

class _DeckBuilderScreenState extends State<DeckBuilderScreen> {
  static const String _openDrawerArg = 'openDrawer';
  static const String _fromDrawerArg = 'fromDrawer';

  void _goBack() {
    final args = ModalRoute.of(context)?.settings.arguments;
    final openedFromDrawer =
        args is Map<String, dynamic> && args[_fromDrawerArg] == true;
    if (openedFromDrawer) {
      Navigator.of(context).pushNamedAndRemoveUntil(
        RouteNames.home,
        (_) => false,
        arguments: <String, dynamic>{_openDrawerArg: true},
      );
      return;
    }

    final navigator = Navigator.of(context);
    if (navigator.canPop()) {
      navigator.pop();
      return;
    }
    navigator.pushReplacementNamed(
      RouteNames.home,
      arguments: <String, dynamic>{_openDrawerArg: true},
    );
  }

  Future<void> _promptSaveDeck(DeckProvider deck) async {
    final controller = TextEditingController(text: 'My Deck');
    final saved = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Save Deck'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(labelText: 'Deck name'),
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Save'),
          ),
        ],
      ),
    );

    if (saved == true && controller.text.trim().isNotEmpty) {
        try {
          await deck.saveDeckToDb(controller.text.trim());
          if (!mounted) {
            return;
          }
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Deck Saved')),
          );
        } catch (e) {
          if (!mounted) {
            return;
          }
          final message = e.toString().contains(
                'same name and heroes already exists',
              )
              ? 'This deck is already saved.'
              : 'Could not save deck. Please try again.';
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(message)),
          );
        }
    }
  }

  @override
  Widget build(BuildContext context) {
    final deck = context.watch<DeckProvider>();

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          tooltip: 'Back',
          onPressed: _goBack,
        ),
        title: const Text('Deck Builder'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: <Widget>[
          Text('Current Deck (${deck.deckSize}/${DeckProvider.maxDeckSize})'),
          const SizedBox(height: 8),
          if (deck.deck.isEmpty)
            const Card(child: Padding(padding: EdgeInsets.all(12), child: Text('No heroes yet. Add heroes from Home.')))
          else
            ...deck.deck.map(
              (h) => Card(
                child: ListTile(
                  title: Text(h.name),
                  subtitle: Text('HP ${h.maxHp} • ATK ${h.attack}'),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete_outline),
                    onPressed: () => deck.removeHero(h),
                  ),
                ),
              ),
            ),
          const SizedBox(height: 8),
          Row(
            children: <Widget>[
              Expanded(
                child: FilledButton.icon(
                  onPressed: deck.deck.isEmpty ? null : () => _promptSaveDeck(deck),
                  icon: const Icon(Icons.save_outlined),
                  label: const Text('Save Deck'),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: FilledButton.tonalIcon(
                  onPressed: deck.isReady
                      ? () {
                          context.read<BattleProvider>().reset(notify: false);
                          Navigator.pushNamed(context, RouteNames.battle);
                        }
                      : null,
                  icon: const Icon(Icons.sports_martial_arts),
                  label: const Text('Battle'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          FilledButton.tonalIcon(
            onPressed: () => Navigator.pushNamed(context, RouteNames.savedDecks),
            icon: const Icon(Icons.inventory_2_outlined),
            label: const Text('View Saved Decks'),
          ),
        ],
      ),
    );
  }
}
