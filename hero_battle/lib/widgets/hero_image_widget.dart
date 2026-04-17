import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../models/hero_model.dart';

class HeroImageWidget extends StatelessWidget {
  final HeroModel hero;
  final BoxFit fit;
  final double? width;
  final double? height;

  const HeroImageWidget({
    super.key,
    required this.hero,
    this.fit = BoxFit.cover,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: hero.images.url.isEmpty ? 'https://via.placeholder.com/300?text=${hero.name}' : hero.images.url,
      fit: fit,
      width: width,
      height: height,
      placeholder: (context, url) => _buildFallback(Colors.grey[400]!),
      errorWidget: (context, url, error) => _buildFallback(Colors.grey[600]!),
    );
  }

  Widget _buildFallback(Color bgColor) {
    // Generate a deterministic color based on hero name
    final hash = hero.name.hashCode;
    final colors = [
      Colors.red,
      Colors.blue,
      Colors.green,
      Colors.orange,
      Colors.purple,
      Colors.teal,
      Colors.pink,
      Colors.amber,
      Colors.indigo,
      Colors.cyan,
    ];
    final heroColor = colors[hash % colors.length];

    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            heroColor.withOpacity(0.8),
            heroColor.withOpacity(0.5),
          ],
        ),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Show initials or icon
            Text(
              hero.name.split(' ').map((e) => e[0]).join(''),
              style: const TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
              maxLines: 1,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              hero.name,
              style: const TextStyle(
                fontSize: 12,
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
              maxLines: 2,
              textAlign: TextAlign.center,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
