// Allow the IDEs to statically recognise graphql files importe from TS files
// https://stackoverflow.com/a/67577233
declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export = value;
}
