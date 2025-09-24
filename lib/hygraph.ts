// lib\hygraph.ts
import { GraphQLClient } from 'graphql-request';

export const hygraph = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_API_ENDPOINT as string,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`
    }
  }
);
