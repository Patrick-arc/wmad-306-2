import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/battle_provider.dart';

class BattleScreen extends StatelessWidget {
  const BattleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Battle')),
      body: Consumer<BattleProvider>(
        builder: (context, battle, _) {
          if (battle.playerHero == null) {
            return const Center(child: Text('No battle in progress. Start one from your deck!'));
          }
          return Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(children: [
                      Text(battle.playerHero!.name, style: const TextStyle(fontWeight: FontWeight.bold)),
                      Text('HP: ${battle.playerHp}/${battle.playerHero!.maxHp}'),
                    ]),
                    const Text('VS', style: TextStyle(fontSize: 24)),
                    Column(children: [
                      Text(battle.aiHero!.name, style: const TextStyle(fontWeight: FontWeight.bold)),
                      Text('HP: ${battle.aiHp}/${battle.aiHero!.maxHp}'),
                    ]),
                  ],
                ),
              ),
              LinearProgressIndicator(value: battle.playerHp / battle.playerHero!.maxHp),
              const SizedBox(height: 8),
              LinearProgressIndicator(value: battle.aiHp / battle.aiHero!.maxHp),
              const SizedBox(height: 16),
              Text('Round: ${battle.round}'),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(16),
                  child: Text(battle.battleLog),
                ),
              ),
              if (!battle.battleOver)
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: ElevatedButton(
                    onPressed: () => battle.playRound(),
                    child: const Text('Fight Round'),
                  ),
                ),
              if (battle.battleOver)
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text(
                    battle.playerWon ? 'You Win!' : 'You Lose!',
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                ),
            ],
          );
        },
      ),
    );
  }
}
