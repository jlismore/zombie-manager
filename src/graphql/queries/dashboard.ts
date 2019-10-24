import gql from "graphql-tag";

export const dashboardQuery = gql`
  query DashboardLocations {
    allLocations {
      id
      name
      icon
      Zombies {
        id
      }
    }
  }
`;
