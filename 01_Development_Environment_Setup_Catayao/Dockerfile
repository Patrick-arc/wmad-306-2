FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    curl \
    dos2unix \
    git \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libonig-dev \
    libpng-dev \
    libwebp-dev \
    libxml2-dev \
    libzip-dev \
    mariadb-client \
    unzip \
    zip \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    --with-webp

RUN docker-php-ext-install \
    bcmath \
    ctype \
    exif \
    gd \
    mbstring \
    pdo \
    pdo_mysql \
    pcntl \
    sockets \
    zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN a2enmod rewrite
COPY ./_setup/web_scripts/apache.conf /etc/apache2/sites-available/000-default.conf

# Node.js LTS (includes npm)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www/html
