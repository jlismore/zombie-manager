import gql from "graphql-tag";

export const singleLocationQuery = gql`
  query SingleLocation($id: ID!) {
    Location(id: $id) {
      id
      name
      desc
      icon
      Zombies {
        id
        sex
        colour
        smell
      }
    }
  }
`;
