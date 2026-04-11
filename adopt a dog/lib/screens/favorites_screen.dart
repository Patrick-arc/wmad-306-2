import 'package:flutter/material.dart';
import '../services/dog_api_service.dart';
import '../services/prefs_service.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final prefs = PrefsService();
    final api = DogApiService();

    return Scaffold(
      appBar: AppBar(title: const Text('My Favorite')),
      body: FutureBuilder<String?>(
        future: prefs.loadFavorite(),
        builder: (context, prefSnap) {
          if (prefSnap.connectionState != ConnectionState.done) {
            return const Center(child: CircularProgressIndicator());
          }

          final breed = prefSnap.data;
          if (breed == null) {
            return const Center(
              child: Text(
                'No favorite saved yet!\n'
                'Tap ♥ on any breed photo.',
                textAlign: TextAlign.center,
              ),
            );
          }

          // Nested FutureBuilder for the image
          return FutureBuilder<String>(
            future: api.fetchRandomImage(breed),
            builder: (context, imgSnap) {
              if (imgSnap.connectionState != ConnectionState.done) {
                return const Center(child: CircularProgressIndicator());
              }

              if (imgSnap.hasError) {
                return Center(child: Text('${imgSnap.error}'));
              }

              return Column(
                children: [
                  Expanded(
                    child: Image.network(
                      imgSnap.data!,
                      fit: BoxFit.cover,
                      width: double.infinity,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text(
                      'Your favorite: $breed',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                  ),
                ],
              );
            },
          );
        },
      ),
    );
  }
}