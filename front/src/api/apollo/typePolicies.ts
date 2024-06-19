import { TypePolicies } from '@apollo/client';

export enum Types {
  User = 'User',
  Apiary = 'Apiary',
}

export default {
  [Types.User]: {
    keyFields: ['uid'],
  },
  [Types.Apiary]: {
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
      Apiary: {
        merge: (existing, incoming) => ({ ...existing, ...incoming }),
        fields: {
          listMyApiaries: {
            merge: (incoming: object) => incoming,
          },
        },
      },
    },
  },
} as TypePolicies;
