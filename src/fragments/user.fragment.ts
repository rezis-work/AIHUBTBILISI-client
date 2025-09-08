import { graphql } from "../gql";

export const userFragment = graphql(`
  fragment userFrangment on User {
    _id
    email
    username
    imageUrl
  }
`);
