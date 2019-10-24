import gql from "graphql-tag";

export const addLocationMutation = gql`
  mutation AddLocation(
    $id: ID!
    $name: String!
    $desc: String!
    $icon: String!
  ) {
    createLocation(id: $id, name: $name, desc: $desc, icon: $icon) {
      id
      name
      icon
      Zombies {
        id
      }
    }
  }
`;
