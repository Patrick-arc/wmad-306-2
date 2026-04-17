import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../providers/player_provider.dart';
import '../../router/app_router.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  static const String _openDrawerArg = 'openDrawer';
  static const String _fromDrawerArg = 'fromDrawer';

  late final TextEditingController _nameController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(
      text: context.read<PlayerProvider>().playerName,
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final player = context.watch<PlayerProvider>();

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          tooltip: 'Back',
          onPressed: () {
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
          },
        ),
        title: const Text('Player Profile'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: <Widget>[
          TextField(
            controller: _nameController,
            decoration: const InputDecoration(labelText: 'Player name'),
          ),
          const SizedBox(height: 10),
          FilledButton(
            onPressed: () async {
              final name = _nameController.text.trim();
              if (name.isEmpty) {
                return;
              }
              final messenger = ScaffoldMessenger.of(context);
              final playerProvider = context.read<PlayerProvider>();
              await playerProvider.updatePlayerName(name);
              if (!mounted) {
                return;
              }
              messenger.showSnackBar(
                const SnackBar(content: Text('Profile saved')),
              );
            },
            child: const Text('Save Name'),
          ),
          const SizedBox(height: 10),
          SwitchListTile(
            value: player.isDarkTheme,
            onChanged: (_) => context.read<PlayerProvider>().toggleTheme(),
            title: const Text('Dark theme'),
          ),
          const SizedBox(height: 8),
          Text('Total Wins: ${player.totalWins}'),
        ],
      ),
    );
  }
}
