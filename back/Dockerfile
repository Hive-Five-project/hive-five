FROM php:8.2-fpm AS php_upstream
FROM composer/composer:2.6.5 AS composer_upstream

FROM php_upstream AS hivefive_base

WORKDIR /app/backend

RUN apt update

RUN apt-get update && apt-get install -y \
    dos2unix \
    gnupg \
    g++ \
    procps \
    openssl \
    git \
    unzip \
    zlib1g-dev \
    libzip-dev \
    libfreetype6-dev \
    libpng-dev \
    libjpeg-dev \
    libicu-dev  \
    libonig-dev \
    libxslt1-dev \
    acl \
    libpq-dev \
    postgresql \
    && echo 'alias sf="php bin/console"' >> ~/.bashrc

# install symfony cli
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash; \
	apt install symfony-cli -y;

# Config nginx


# Install PHP extensions


RUN docker-php-ext-configure gd --with-jpeg --with-freetype 

RUN docker-php-ext-install \
    pdo pdo_mysql pdo_pgsql pgsql zip xsl gd intl opcache exif mbstring && \
    docker-php-ext-enable pdo pdo_mysql pdo_pgsql pgsql zip xsl gd intl opcache exif mbstring


# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PATH="${PATH}:/root/.composer/vendor/bin"

COPY --from=composer_upstream --link /usr/bin/composer /usr/bin/composer
COPY --link --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN dos2unix /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]

# Packages

COPY --link composer.* symfony.* ./
RUN composer install --no-cache --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress --no-suggest --optimize-autoloader;

# Copy project files

COPY --link . ./

RUN mkdir -p var/cache var/log; \
	composer dump-autoload --classmap-authoritative --no-dev; \
	composer dump-env prod; \
	chmod +x bin/console; \
	chown -R www-data var;

# Install sympfony deps
RUN make install

# RUN APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear

# Open port (63280, 63290)

EXPOSE 63280 63290
