import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/deck_provider.dart';
import '../../widgets/hero_image.dart';

class DeckBuilderScreen extends StatelessWidget {
  const DeckBuilderScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Deck Builder')),
      body: Consumer<DeckProvider>(
        builder: (context, deck, _) {
          if (deck.deckSize == 0) {
            return const Center(child: Text('Your deck is empty. Add heroes from the roster!'));
          }
          return ListView.builder(
            itemCount: deck.deckSize,
            itemBuilder: (context, i) {
              final hero = deck.deck[i];
              return ListTile(
                leading: SizedBox(
                  width: 40,
                  height: 40,
                  child: HeroImage(
                    imageUrl: hero.imageUrl,
                    borderRadius: BorderRadius.circular(20),
                    errorWidget: const Icon(Icons.person),
                  ),
                ),
                title: Text(hero.name),
                subtitle: Text('ATK: ${hero.attack} | DEF: ${hero.defense} | HP: ${hero.maxHp}'),
                trailing: IconButton(
                  icon: const Icon(Icons.remove_circle),
                  onPressed: () => deck.removeHero(hero),
                ),
              );
            },
          );
        },
      ),
      bottomNavigationBar: Consumer<DeckProvider>(
        builder: (context, deck, _) => Padding(
          padding: const EdgeInsets.all(16),
          child: Text('${deck.deckSize}/${DeckProvider.maxDeckSize} heroes',
              style: const TextStyle(fontSize: 16)),
        ),
      ),
    );
  }
}
