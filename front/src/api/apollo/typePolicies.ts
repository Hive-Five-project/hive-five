import { TypePolicies } from '@apollo/client';

export enum Types {
  User = 'User',
}

export default {
  [Types.User]: {
    keyFields: ['uid'],
  },
  Query: {
    fields: {
      User: {
        merge: (existing, incoming) => ({ ...existing, ...incoming }),
        fields: {
          me: {
            merge: (existing: object, incoming: object) => ({ ...existing, ...incoming }),
          },
          list: {
            merge: (incoming: object) => incoming,
          },
        },
      },
    },
  },
} as TypePolicies;
