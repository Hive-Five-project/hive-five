# HIVE FIVE

HIVE FIVE app is composed of:

- A [front application](front/README.md), as an IHM developed with React
- A [back application](./back/README.md), as a web API developed with Symfony

## Requirements

- [Node.js](https://nodejs.org/en/) (>= 18)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/) (>= 13) (Optional)
- [PHP](https://www.php.net/) (>= 8.2) (Optional)
- [Symfony CLI](https://symfony.com/download) (Optional)

## Quickstart

### Development tools

You can install the development environment with the following command:

```bash
npm i && npm run install
```
This command will install the git hooks on your local repository.

### Starting the app

As we use Docker, you can start the app with the following command:

```bash
docker compose up -d
```

This command will start the following containers:
| Container | Description | Port (Host side) |
| --- | --- | --- |
| symfony | The Symfony app (GraphQL) with dev tools (profiler, mailer, etc.) | 63280 |
| react | The React app (dev) | 63281 |
| postgres | The PostgreSQL database | 62529 |
| mailer | The mailer container | 62551 |

### Stopping the app

```bash
docker compose down
```

### Alternative

Maintainer can also decide to not use Docker and use their own environment by stopping the containers they don't need or work with. This require to have the required specifics tools installed on the host machine to run the app.

To stop a container, you can use the following command:

```bash
docker compose stop <container_name>
```

## URLs

- Application back : http://127.0.0.1:63280
- Application front : http://127.0.0.1:63281
- Mailer : http://127.0.0.1:62551
- GraphiQL : http://127.0.0.1:63280/graphiql
- Symfony profiler : http://127.0.0.1:63280/_profiler

## Fixtures

The application is shipped with fixtures to help you to start with the app. You can load them with the following command:

```bash
docker compose exec symfony make db.fixtures
```

### Users

| Email | Password | Admin | Active |
| --- | --- | --- | --- |
| admin@example.com | password | ✓ | ✓ |
| user@example.com | password | ✕ | ✓ |
| inactive@example.com | password | ✕ | ✕ |

### Model

![](./back/docs/model.png)


## Deploy

- [Release & deploy process](./docs/release+deploy.md)

## Going further

Also have a look at:

- [The front app README.md](front/README.md)
- [The back app README.md](./back/README.md)
