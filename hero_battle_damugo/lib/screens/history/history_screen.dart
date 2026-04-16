import 'package:flutter/material.dart';

import '../../models/battle_record.dart';
import '../../router/app_router.dart';
import '../../services/database_service.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  void _goBack(BuildContext context) {
    final navigator = Navigator.of(context);
    if (navigator.canPop()) {
      navigator.pop();
      return;
    }
    navigator.pushReplacementNamed(RouteNames.home);
  }

  String _formatDate(String iso) {
    final parsed = DateTime.tryParse(iso);
    if (parsed == null) {
      return iso;
    }
    final local = parsed.toLocal();
    final mm = local.month.toString().padLeft(2, '0');
    final dd = local.day.toString().padLeft(2, '0');
    final hh = local.hour.toString().padLeft(2, '0');
    final min = local.minute.toString().padLeft(2, '0');
    return '${local.year}-$mm-$dd $hh:$min';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          tooltip: 'Back',
          onPressed: () => _goBack(context),
        ),
        title: const Text('Battle History'),
      ),
      body: FutureBuilder<List<BattleRecord>>(
        future: DatabaseService().loadHistory(),
        builder: (context, snapshot) {
          if (snapshot.connectionState != ConnectionState.done) {
            return const Center(child: CircularProgressIndicator());
          }
          final records = snapshot.data ?? <BattleRecord>[];
          if (records.isEmpty) {
            return const Center(child: Text('No battles recorded yet.'));
          }

          return ListView.builder(
            itemCount: records.length,
            itemBuilder: (context, index) {
              final r = records[index];
              final resultText = r.playerWon ? 'Win' : 'Loss';
              final resultColor = r.playerWon ? Colors.green : Colors.red;
              return ListTile(
                isThreeLine: true,
                leading: Icon(
                  r.playerWon ? Icons.emoji_events : Icons.close,
                  color: resultColor,
                ),
                title: Text('${r.playerHero} vs ${r.aiHero}'),
                subtitle: Text(
                  '$resultText • Rounds: ${r.roundsPlayed}\nDate: ${_formatDate(r.playedAt)}',
                ),
              );
            },
          );
        },
      ),
    );
  }
}
