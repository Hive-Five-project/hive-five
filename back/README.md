HIVE FIVE Back
=========

HIVE FIVE back is a Symfony app containing:

- a database models & connection PostgreSQL + doctrine
- a GraphQL API for the React front client.

## Requirements

- Symfony CLI
- Docker

## Model
```mermaid
classDiagram
    class User 
    User : -UUID uid
    User : -string email
    User : -string password
    User : -string firstName
    User : -string lastName
    User : -bool admin
    User : -Collection<Apiary> apiaries
    User : -DateTime createdAt
    User : -DateTime updatedAt
    User : -DateTime deletedAt
    
    class Apiary
    Apiary : -UUID uid
    Apiary : -string name
    Apiary : -string address
    Apiary : -User user
    Apiary : -Collection<Beehive> beehives
    Apiary : -DateTime createdAt
    Apiary : -DateTime updatedAt
    Apiary : -DateTime deletedAt
    
    class Beehive
    Beehive : -UUID uid
    Beehive : -string name
    Beehive : -BeeType bee
    Beehive : -int age
    Beehive : -Apiary apiary
    Beehive : -Collection<Riser> risers
    Beehive : -Collection<Frame> frames
    Beehive : -DateTime createdAt
    Beehive : -DateTime updatedAt
    Beehive : -DateTime deletedAt
    
    class BeeType{
        <<enumeration>>
        Black
        Italian
        Caucasian
        Carnolien
        Buckfast
    }
    
    class Riser
    Riser : -UUID uid
    Riser : -string name
    Riser : -Beehive beehive
    Riser : -User user
    Riser : -Collection<Frame> frames
    Riser : -DateTime createdAt
    Riser : -DateTime updatedAt
    Riser : -DateTime deletedAt
    
    class Frame
    Frame : -UUID uid
    Frame : -string label
    Frame : -FrameType type
    Frame : -User user
    Frame : -DateTime createdAt
    Frame : -DateTime updatedAt
    Frame : -DateTime deletedAt
    
    class FrameType{
        <<enumeration>>
        Riser
        Beehive
    }
    
    User --|> Apiary: has
    Apiary --|> Beehive: has
    Beehive --|> Riser: has
    Riser --|> Frame: has
```

## Setup

When using Symfony CLI locally, you're done!

## How to connect with DBeaver to database

![dbeaver config](./docs/dbeaverconf.png)

## List all commands for Makefile

```shell
make
make help
```
## Installation

```shell
make install
```

## Linting

```shell
make lint
```

## Tests

Read for debug and understanding : [How to do testing here](./docs/tests.md)

```shell
make test
```
### How to filter for tests :
```shell
symfony php bin/phpunit --filter='test-name'
```
### How to update snapshot
```shell
UP=1 symfony php bin/phpunit --filter='test-name'
```
>/!\ Carefull with updates snapshots before commit push. Look at diff.

## App specific commands

## Database

### Update

Force update your database schema to match your model:

```shell
make db.update
```

### Fixtures

```shell
make db.fixtures
```

### Reset

Drop and recreate the database:

```shell
make db.reset
```
## Application

### Serve symfony
```shell
make serve
```

### Stop symfony
```shell
make stop
```

## Going further

- [How to authenticate as a User for GraphiQL console](./docs/graphiql_auth.md)

## Refs

- [GraphiQL (QraphQL Web console)](http://[URL]/graphiql)

## Useful tools

- [PhpStorm GraphQL Extension](https://plugins.jetbrains.com/plugin/8097-graphql): provides GraphQL support in PhpStorm
  as well as syntax highlight, schema discovery and autocompletion.
- [PhpStorm UUID/ULID Generator Extension](https://plugins.jetbrains.com/plugin/8320-uuid-generator): provides UUID/ULID generation in PhpStorm.

---  
⬆︎ [**Back to README.md**](../README.md)  
