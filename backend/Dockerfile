FROM php:8.4-cli

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apt-get update -qq && \
    apt-get install -y git unzip libpq-dev libzip-dev vim && \
    docker-php-ext-install pdo pdo_pgsql zip && \
    rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-interaction

COPY . .

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
