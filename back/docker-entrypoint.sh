#!/bin/sh
set -e

if [ -z "$(ls -A 'vendor/' 2>/dev/null)" ]; then
		composer install --prefer-dist --no-progress --no-interaction
fi

if grep -q ^DATABASE_URL= .env; then
    echo "Waiting for database to be ready..."
    ATTEMPTS_LEFT_TO_REACH_DATABASE=60
    until [ $ATTEMPTS_LEFT_TO_REACH_DATABASE -eq 0 ] || DATABASE_ERROR=$(php bin/console dbal:run-sql -q "SELECT 1" 2>&1); do
        if [ $? -eq 255 ]; then
            # If the Doctrine command exits with 255, an unrecoverable error occurred
            ATTEMPTS_LEFT_TO_REACH_DATABASE=0
            break
        fi
        sleep 1
        ATTEMPTS_LEFT_TO_REACH_DATABASE=$((ATTEMPTS_LEFT_TO_REACH_DATABASE - 1))
        echo "Still waiting for database to be ready... Or maybe the database is not reachable. $ATTEMPTS_LEFT_TO_REACH_DATABASE attempts left."
    done

    if [ $ATTEMPTS_LEFT_TO_REACH_DATABASE -eq 0 ]; then
        echo "The database is not up or not reachable:"
        echo "$DATABASE_ERROR"
        exit 1
    else
        echo "The database is now ready and reachable"
    fi

    if [ "$(find ./migrations -iname '*.php' -print -quit)" ]; then
        php bin/console doctrine:migrations:migrate --no-interaction
    fi
fi

mkdir -p var
chmod -R u+rwX var
chown -R www-data:$(whoami) var

make db.install
make install.jwt
rm -rf /root/.symfony5
ps ax | grep 'php-fpm' | awk -F ' ' '{print $1}' | xargs kill -9 2>/dev/null || true
exec docker-php-entrypoint "$@"
