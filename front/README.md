HIVE FIVE Front
===========

HIVE FIVE front is a React web application consuming a GraphQL API.

## Installation


## Development

Start the dev server / watcher:

```shell
````

Linting:

```shell
```

## Configuration

The app exposes some configuration variables through env vars.  
By default, it loads vars from env files depending on the context, in the
following order:

1. `.env`
1. `.env.local`
1. `.env.{production,staging,development}`
1. `.env.{production,staging,development}.local`

Last defined value wins. Actual env var always wins.

To add new configuration variables, add these to the main `.env` file
and provide a development value (if relevent) in the `.env.development` file.

## Build

Build for production using:

```shell
```

Build for staging using:

```shell
```

## Serve

Serve a build:

```shell
```

## Going further


## References

- [TypeScript](https://www.typescriptlang.org/)
- [TypeScript Cheatscheet](https://react-typescript-cheatsheet.netlify.app/)
- [Apollo GraphQL Client](https://www.apollographql.com/docs/react/)
- [Using Apollo with TypeScript](https://www.apollographql.com/docs/react/development-testing/static-typing/)

---  
⬆︎ [**Back to README.md**](../README.md)  
