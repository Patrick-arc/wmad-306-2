import 'package:flutter/material.dart';
import '../models/breed.dart';
import '../services/dog_api_service.dart';
import 'breed_detail_screen.dart';
import 'favorites_screen.dart';

class BreedListScreen extends StatefulWidget {
  const BreedListScreen({super.key});

  @override
  State<BreedListScreen> createState() => _BreedListScreenState();
}

class _BreedListScreenState extends State<BreedListScreen> {
  // Store the Future once so rebuilds don't re-fetch.
  late final Future<List<Breed>> _breedsFuture;
  final _service = DogApiService();

  @override
  void initState() {
    super.initState();
    _breedsFuture = _service.fetchBreeds();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Choose a Breed'),
        actions: [
          IconButton(
            icon: const Icon(Icons.favorite),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const FavoritesScreen()),
            ),
          ),
        ],
      ),
      body: FutureBuilder<List<Breed>>(
        future: _breedsFuture,
        builder: (context, snapshot) {
          // ① Still waiting
          if (snapshot.connectionState != ConnectionState.done) {
            return const Center(child: CircularProgressIndicator());
          }

          // ② Error
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          // ③ Data ready
          final breeds = snapshot.data!;
          return ListView.builder(
            itemCount: breeds.length,
            itemBuilder: (context, index) {
              final breed = breeds[index];
              return ListTile(
                leading: const Icon(Icons.pets),
                title: Text(
                  breed.name[0].toUpperCase() + breed.name.substring(1),
                ),
                subtitle: breed.subBreeds.isNotEmpty
                    ? Text('Sub-breeds: ${breed.subBreeds.join(', ')}')
                    : null,
                trailing: const Icon(Icons.chevron_right),
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => BreedDetailScreen(breed: breed),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}