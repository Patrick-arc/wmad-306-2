class HeroModel {
  final int id;
  final String name;
  final Powerstats powerstats;
  final Biography biography;
  final Appearance appearance;
  final Work work;
  final Connections connections;
  final Images images;

  HeroModel({
    required this.id,
    required this.name,
    required this.powerstats,
    required this.biography,
    required this.appearance,
    required this.work,
    required this.connections,
    required this.images,
  });

  factory HeroModel.fromJson(Map<String, dynamic> json) {
    return HeroModel(
      id: int.parse(json['id']),
      name: json['name'],
      powerstats: Powerstats.fromJson(json['powerstats']),
      biography: Biography.fromJson(json['biography']),
      appearance: Appearance.fromJson(json['appearance']),
      work: Work.fromJson(json['work']),
      connections: Connections.fromJson(json['connections']),
      images: Images.fromJson(json['image']),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'powerstats': powerstats.toJson(),
    'biography': biography.toJson(),
    'appearance': appearance.toJson(),
    'work': work.toJson(),
    'connections': connections.toJson(),
    'image': images.toJson(),
  };
}

class Powerstats {
  final int intelligence;
  final int strength;
  final int speed;
  final int durability;
  final int power;
  final int combat;

  Powerstats({
    required this.intelligence,
    required this.strength,
    required this.speed,
    required this.durability,
    required this.power,
    required this.combat,
  });

  factory Powerstats.fromJson(Map<String, dynamic> json) {
    return Powerstats(
      intelligence: int.tryParse(json['intelligence']) ?? 0,
      strength: int.tryParse(json['strength']) ?? 0,
      speed: int.tryParse(json['speed']) ?? 0,
      durability: int.tryParse(json['durability']) ?? 0,
      power: int.tryParse(json['power']) ?? 0,
      combat: int.tryParse(json['combat']) ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
    'intelligence': intelligence,
    'strength': strength,
    'speed': speed,
    'durability': durability,
    'power': power,
    'combat': combat,
  };
}

class Biography {
  final String fullName;
  final String alterEgos;
  final List<String> aliases;
  final String placeOfBirth;
  final String firstAppearance;
  final String publisher;
  final String alignment;

  Biography({
    required this.fullName,
    required this.alterEgos,
    required this.aliases,
    required this.placeOfBirth,
    required this.firstAppearance,
    required this.publisher,
    required this.alignment,
  });

  factory Biography.fromJson(Map<String, dynamic> json) {
    return Biography(
      fullName: json['full-name'] ?? '',
      alterEgos: json['alter-egos'] ?? '',
      aliases: (json['aliases'] != null) ? List<String>.from(json['aliases'] as List) : [],
      placeOfBirth: json['place-of-birth'] ?? '',
      firstAppearance: json['first-appearance'] ?? '',
      publisher: json['publisher'] ?? '',
      alignment: json['alignment'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'full-name': fullName,
    'alter-egos': alterEgos,
    'aliases': aliases,
    'place-of-birth': placeOfBirth,
    'first-appearance': firstAppearance,
    'publisher': publisher,
    'alignment': alignment,
  };
}

class Appearance {
  final String gender;
  final String race;
  final List<String> height;
  final List<String> weight;
  final String eyeColor;
  final String hairColor;

  Appearance({
    required this.gender,
    required this.race,
    required this.height,
    required this.weight,
    required this.eyeColor,
    required this.hairColor,
  });

  factory Appearance.fromJson(Map<String, dynamic> json) {
    return Appearance(
      gender: json['gender'] ?? '',
      race: json['race'] ?? '',
      height: (json['height'] != null) ? List<String>.from(json['height'] as List) : [],
      weight: (json['weight'] != null) ? List<String>.from(json['weight'] as List) : [],
      eyeColor: json['eye-color'] ?? '',
      hairColor: json['hair-color'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'gender': gender,
    'race': race,
    'height': height,
    'weight': weight,
    'eye-color': eyeColor,
    'hair-color': hairColor,
  };
}

class Work {
  final String occupation;
  final String base;

  Work({
    required this.occupation,
    required this.base,
  });

  factory Work.fromJson(Map<String, dynamic> json) {
    return Work(
      occupation: json['occupation'],
      base: json['base'],
    );
  }

  Map<String, dynamic> toJson() => {
    'occupation': occupation,
    'base': base,
  };
}

class Connections {
  final String groupAffiliation;
  final String relatives;

  Connections({
    required this.groupAffiliation,
    required this.relatives,
  });

  factory Connections.fromJson(Map<String, dynamic> json) {
    return Connections(
      groupAffiliation: json['group-affiliation'],
      relatives: json['relatives'],
    );
  }

  Map<String, dynamic> toJson() => {
    'group-affiliation': groupAffiliation,
    'relatives': relatives,
  };
}

class Images {
  final String url;

  Images({
    required this.url,
  });

  factory Images.fromJson(Map<String, dynamic> json) {
    return Images(
      url: json['url'],
    );
  }

  Map<String, dynamic> toJson() => {
    'url': url,
  };
}