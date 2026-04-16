import 'package:flutter/material.dart';
import '../../models/hero_model.dart';
import '../../widgets/hero_image.dart';

class HeroDetailScreen extends StatelessWidget {
  final HeroModel hero;
  const HeroDetailScreen({super.key, required this.hero});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(hero.name)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: HeroImage(
                imageUrl: hero.imageUrl,
                height: 200,
                fit: BoxFit.contain,
              ),
            ),
            const SizedBox(height: 16),
            Text('Full Name: ${hero.fullName}', style: const TextStyle(fontSize: 16)),
            Text('Publisher: ${hero.publisher}', style: const TextStyle(fontSize: 16)),
            Text('Alignment: ${hero.alignment}', style: const TextStyle(fontSize: 16)),
            const SizedBox(height: 16),
            const Text('Power Stats', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Text('Intelligence: ${hero.powerStats.intelligence}'),
            Text('Strength: ${hero.powerStats.strength}'),
            Text('Speed: ${hero.powerStats.speed}'),
            Text('Durability: ${hero.powerStats.durability}'),
            Text('Power: ${hero.powerStats.power}'),
            Text('Combat: ${hero.powerStats.combat}'),
            const SizedBox(height: 16),
            const Text('Game Stats', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Text('Max HP: ${hero.maxHp}'),
            Text('Attack: ${hero.attack}'),
            Text('Special Attack: ${hero.specialAttack}'),
            Text('Defense: ${hero.defense}'),
            Text('Initiative: ${hero.initiative}'),
          ],
        ),
      ),
    );
  }
}
