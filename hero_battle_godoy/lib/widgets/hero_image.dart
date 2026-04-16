import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

/// A reusable hero image widget that handles 403 errors from superherodb.com
/// by sending a browser-like User-Agent header, with proper loading/error states.
class HeroImage extends StatelessWidget {
  final String imageUrl;
  final BoxFit fit;
  final double? width;
  final double? height;
  final BorderRadius? borderRadius;
  final Widget? placeholder;
  final Widget? errorWidget;

  const HeroImage({
    super.key,
    required this.imageUrl,
    this.fit = BoxFit.cover,
    this.width,
    this.height,
    this.borderRadius,
    this.placeholder,
    this.errorWidget,
  });

  /// Headers that mimic a browser request — prevents 403 from superherodb.com
  static const _browserHeaders = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
  };

  @override
  Widget build(BuildContext context) {
    if (imageUrl.isEmpty) {
      return errorWidget ?? _defaultError(context);
    }

    final image = CachedNetworkImage(
      imageUrl: imageUrl,
      httpHeaders: _browserHeaders,
      fit: fit,
      width: width,
      height: height,
      progressIndicatorBuilder: (context, url, progress) =>
          placeholder ??
          const Center(
            child: CircularProgressIndicator(strokeWidth: 2),
          ),
      errorWidget: (context, url, error) =>
          errorWidget ?? _defaultError(context),
    );

    if (borderRadius != null) {
      return ClipRRect(borderRadius: borderRadius!, child: image);
    }
    return image;
  }

  Widget _defaultError(BuildContext context) => Container(
        width: width,
        height: height,
        color: Colors.grey[300],
        child: const Icon(Icons.broken_image, color: Colors.grey),
      );
}
