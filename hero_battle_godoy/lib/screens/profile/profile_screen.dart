import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/player_provider.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: Consumer<PlayerProvider>(
        builder: (context, player, _) {
          return Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Name: ${player.playerName}', style: const TextStyle(fontSize: 18)),
                const SizedBox(height: 8),
                Text('Total Wins: ${player.totalWins}', style: const TextStyle(fontSize: 18)),
                const SizedBox(height: 16),
                SwitchListTile(
                  title: const Text('Dark Theme'),
                  value: player.isDarkTheme,
                  onChanged: (_) => player.toggleTheme(),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
