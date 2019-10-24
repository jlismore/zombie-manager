import { useQuery } from "@apollo/react-hooks";
import { H1, Button, Intent } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Zombie } from "../components/Zombie";
import { dashboardQuery } from "../graphql/queries/dashboard";
import {
  DashboardLocationsQuery,
  DashboardLocationsQueryVariables
} from "../generated/types";
import { notEmpty } from "../helpers/typeguards";
import { AddLocationDrawer } from "../components/AddLocationDrawer";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  button {
    margin: 1rem;
  }
`;

const Label = styled.span`
  margin: 0 1rem;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
`;

const Count = styled(Label)`
  font-size: 2em;
  margin-right: unset;
`;

const FlexButtonContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 15rem;
  min-height: 5rem;
`;

const Intents = [Intent.PRIMARY, Intent.WARNING, Intent.SUCCESS, Intent.DANGER];

export const Dashboard = () => {
  const { data, loading } = useQuery<
    DashboardLocationsQuery,
    DashboardLocationsQueryVariables
  >(dashboardQuery);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const onDrawerClose = () => setShowAddLocation(false);
  const onDrawerOpen = () => setShowAddLocation(true);
  const locationCounts =
    data && data.allLocations ? data.allLocations.filter(notEmpty) : [];
  return (
    <>
      <Helmet>
        <title>Zombie Manager</title>
      </Helmet>
      <Body>
        <HeaderContainer>
          <H1>Locations</H1>
          <Button icon="office" small onClick={onDrawerOpen}>
            Add location
          </Button>
        </HeaderContainer>
        <CardContainer>
          {locationCounts.map((location, ndx) => (
            <Link key={location.id} to={`/location/${location.id}`}>
              <Button intent={Intents[ndx % Intents.length]} loading={loading}>
                <FlexButtonContents>
                  <div>
                    <p>
                      <Label>{location.name}</Label>
                    </p>
                    <p>
                      <Count>
                        {location.Zombies ? location.Zombies.length : 0}
                      </Count>
                      <Zombie fill="white" size="2x" />
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={location.icon as any}
                    size="3x"
                    color="white"
                  />
                </FlexButtonContents>
              </Button>
            </Link>
          ))}
        </CardContainer>
        <AddLocationDrawer isOpen={showAddLocation} onClose={onDrawerClose} />
      </Body>
    </>
  );
};
