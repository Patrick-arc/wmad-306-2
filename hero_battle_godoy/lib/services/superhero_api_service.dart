import 'package:dio/dio.dart';
import '../models/hero_model.dart';
class SuperheroApiService {
SuperheroApiService({required String apiToken})
: _token = apiToken,
_dio = Dio(BaseOptions(
baseUrl: 'https://superheroapi.com/api/',
connectTimeout: const Duration(seconds: 10),
));
final String _token;
final Dio _dio;
/// Fetch a single hero by numeric ID (1–731).
Future<HeroModel> fetchHero(int id) async {
final response = await _dio.get('$_token/$id');
return HeroModel.fromJson(response.data as Map<String, dynamic>);
}
/// Search heroes by name.
Future<List<HeroModel>> searchHeroes(String name) async {
final response = await _dio.get('$_token/search/$name');
final results = response.data['results'] as List<dynamic>? ?? [];
return results
.map((e) => HeroModel.fromJson(e as Map<String, dynamic>))
.toList();
}
/// Fetch a random selection of heroes.
Future<List<HeroModel>> fetchRandomHeroes({int count = 20}) async {
final ids = List.generate(731, (i) => i + 1)..shuffle();
final futures = ids.take(count).map(fetchHero);
return Future.wait(futures);
}
}