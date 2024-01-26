# --------------------------------#
# "make" command
# --------------------------------#

-include ../make/text.mk
-include ../make/help.mk
-include ../make/url.mk

###########
# Install #
###########

## Install dependencies
install: install.composer install.jwt

install@integration: install.composer@integration install.jwt

install.composer:
	symfony composer install
	symfony composer --working-dir=tools/php-cs-fixer install

install.jwt:
	php bin/console lexik:jwt:generate-keypair --skip-if-exists

install.composer@integration:
	symfony composer install --ansi --verbose --no-interaction --no-progress --prefer-dist --optimize-autoloader --no-scripts --ignore-platform-reqs

install.composer.tools@integration:
	symfony composer --working-dir=tools/php-cs-fixer install --ansi --verbose --no-interaction --no-progress --prefer-dist --optimize-autoloader --no-scripts --ignore-platform-reqs

## Update dependencies
update: update.composer

## Update Symfony dependencies only
update.symfony:
	symfony composer update "symfony/*"

update.composer:
	symfony composer update

############
# Database #
############

## Database - Init (create+schema)
db.install: db.create db.update-force

## Database - Create (db only)
db.create:
	symfony console doctrine:database:create --if-not-exists

## Database - Drop
db.drop:
	symfony console doctrine:database:drop --force --if-exists

## Database - Reset
db.reset: db.drop db.install

## Database - Load data fixtures
db.fixtures:
	symfony console doctrine:fixtures:load --no-interaction

# Database - Force update the database schema
db.update-force: db.create
	symfony console doctrine:schema:update --force --complete

# Generate hash-password
db.hash-password:
	symfony php bin/console security:hash-password

###############
# Development #
###############

serve.reset:
	symfony server:stop && echo "Symfony server stopped" || echo "Symfony server not running"

## Dev - Start the whole application for development purposes
serve:
	# https://www.npmjs.com/package/concurrently
	npx concurrently "make serve.docker" "make serve.php" --names="Docker,Symfony" --prefix=name --kill-others --kill-others-on-fail

## Dev - Start Symfony web server
serve.php: serve.reset
	symfony server:start --port=63280

## Dev - Start Docker services
serve.docker:
	docker compose --profile=local up

## Dev - Start Docker services in background
serve.docker+detached:
	docker compose --profile=local up -d

## Test - Start the whole application for test purposes (debug)
serve@test:
	# https://www.npmjs.com/package/concurrently
	npx concurrently "make serve.docker" "make serve.php@test" --names="Docker,Symfony" --prefix=name --kill-others --kill-others-on-fail

serve.php@test: export APP_ENV = test
serve.php@test: export APP_DEBUG = 1
serve.php@test: serve.reset
	symfony server:start --port=63290

## Stop Symfony web server
stop.php:
	symfony server:stop

## Stop Docker services
stop.docker:
	docker compose down

## Clear cache
cache-clear:
	symfony console cache:clear

########
# Lint #
########

## Lint - Lint
lint: lint.php-cs-fixer lint.phpstan lint.twig lint.yaml lint.container lint.doctrine lint.graphql lint.composer

lint@integration: lint.php-cs-fixer@integration lint.phpstan@integration lint.twig@integration lint.yaml@integration lint.container@integration lint.doctrine@integration lint.graphql@integration lint.composer@integration

lint.composer:
	symfony composer validate --no-check-publish

lint.composer@integration:
	symfony composer validate --no-check-publish --ansi --no-interaction

lint.container:
	symfony console lint:container

lint.container@integration:
	symfony console lint:container --ansi --no-interaction

lint.doctrine:
	symfony console doctrine:schema:validate

lint.doctrine@integration:
	symfony console doctrine:schema:validate --ansi --no-interaction --skip-sync

lint.php-cs-fixer:
	symfony php tools/php-cs-fixer/vendor/bin/php-cs-fixer fix

lint.php-cs-fixer@integration:
	symfony php tools/php-cs-fixer/vendor/bin/php-cs-fixer fix --ansi --dry-run --diff

lint.twig:
	symfony console lint:twig templates --show-deprecations

lint.twig@integration:
	symfony console lint:twig templates --show-deprecations --ansi --no-interaction

lint.graphql:
	symfony console graphql:validate

lint.graphql@integration:
	symfony console graphql:validate --ansi --no-interaction

lint.yaml:
	symfony console lint:yaml config translations --parse-tags

lint.yaml@integration:
	symfony console lint:yaml config translations --parse-tags --ansi --no-interaction

lint.phpstan:
	symfony console cache:clear --ansi
	symfony console cache:warmup --ansi
	symfony php vendor/bin/phpstan analyse --memory-limit=-1

lint.phpstan@integration: export APP_ENV = dev
lint.phpstan@integration:
	symfony console cache:clear --ansi
	symfony console cache:warmup --ansi
	symfony php vendor/bin/phpstan --no-progress --ansi --no-interaction analyse --configuration phpstan.dist.neon

############
# Security #
############

security.symfony:
	symfony check:security

password:
	symfony php bin/console security:hash-password

########
# Test #
########

## Test - Test
test:
	symfony php bin/phpunit

## Test - Test & update deprecations baseline (see ./docs/res/tests.md)
test.update-baseline: export UPDATE_DEPRECATIONS_BASELINE = 1
test.update-baseline: test

test.phpunit@integration: export APP_ENV = test
test.phpunit@integration:
	php bin/phpunit --colors=always --testdox
