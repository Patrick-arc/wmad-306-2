import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import '../models/hero_model.dart';

class SuperheroApiService {
  static const String _baseUrl = 'https://superheroapi.com/api';
  static const String _apiKey = '04712930a1318d524a91d7b02314cb11';
  
  // Use a CORS proxy for web platform to bypass browser restrictions
  static const String _corsProxyUrl = 'https://cors-anywhere.herokuapp.com';
  
  late final Dio _dio;

  SuperheroApiService() {
    _dio = Dio();
    
    // Add interceptors for CORS handling on web
    if (kIsWeb) {
      _dio.options.headers['Access-Control-Allow-Origin'] = '*';
    }
  }

  Future<HeroModel?> fetchHero(int id) async {
    try {
      final url = '$_baseUrl/$_apiKey/$id';
      print('🎯 Fetching hero $id: $url');
      final response = await _dio.get(url);
      if (response.statusCode == 200) {
        print('✅ Fetched hero: ${response.data['name']}');
        return HeroModel.fromJson(response.data);
      } else {
        throw Exception('Failed to load hero: ${response.statusCode}');
      }
    } on DioException catch (e) {
      print('🚨 DioException fetching hero: ${e.message}');
      return null;
    } catch (e) {
      print('🚨 Error fetching hero: $e');
      return null;
    }
  }

  Future<List<HeroModel>> searchHeroes(String query) async {
    try {
      final url = '$_baseUrl/$_apiKey/search/$query';
      print('🔍 Searching: $url');
      final response = await _dio.get(url);
      print('📡 Response status: ${response.statusCode}');
      print('📦 Response data: ${response.data}');
      
      if (response.statusCode == 200) {
        final data = response.data;
        if (data['response'] == 'success' && data['results'] != null) {
          final results = data['results'] as List;
          print('✅ Found ${results.length} heroes');
          final heroes = results.map((json) => HeroModel.fromJson(json)).toList();
          return heroes;
        } else {
          print('❌ API returned: ${data['response']}');
          return [];
        }
      } else {
        throw Exception('Failed to search heroes: ${response.statusCode}');
      }
    } on DioException catch (e) {
      print('🚨 DioException: ${e.message}');
      print('🚨 Error type: ${e.type}');
      print('🚨 Response: ${e.response?.data}');
      return [];
    } catch (e) {
      print('🚨 Error searching heroes: $e');
      return [];
    }
  }
}