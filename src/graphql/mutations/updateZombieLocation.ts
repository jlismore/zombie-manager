import gql from "graphql-tag";

export const updateZombieLocationMutation = gql`
  mutation UpdateZombieLocation($id: ID!, $locationId: ID) {
    updateZomby(id: $id, location_id: $locationId) {
      id
      sex
      colour
      smell
      Location {
        id
      }
    }
  }
`;
