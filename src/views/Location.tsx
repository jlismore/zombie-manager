import { useQuery } from "@apollo/react-hooks";
import { H1, Spinner, HTMLTable, Button } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { RouteComponentProps, Link } from "react-router-dom";

import { MissingData } from "../components/MissingData";
import { singleLocationQuery } from "../graphql/queries/singleLocation";
import {
  SingleLocationQuery,
  SingleLocationQueryVariables
} from "../generated/types";
import { notEmpty } from "../helpers/typeguards";
import { MoveZombieButton } from "../components/MoveZombieButton";
import { Zombie } from "../components/Zombie";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
`;

const BackLink = styled(Link)`
  margin-top: -1.5rem;
  margin-bottom: 1.5rem;
  margin-left: -2rem;
`;

const VerticallyCentredCell = styled.td`
  vertical-align: middle !important;
`;

const Placeholder = styled.td`
  color: darkgray !important;
  text-align: center !important;
`;

export const Location = (
  props: RouteComponentProps<{ locationId: string }>
) => {
  const { data, loading } = useQuery<
    SingleLocationQuery,
    SingleLocationQueryVariables
  >(singleLocationQuery, {
    variables: { id: props.match.params.locationId },
    skip: !props.match.params.locationId
  });
  if (loading) {
    return <Spinner />;
  }
  if (!data || !data.Location) {
    return (
      <MissingData
        id={props.match.params.locationId}
        icon="office"
        noun="location"
        resetPath="/"
      />
    );
  }
  const location = data.Location;
  const zombies = location.Zombies ? location.Zombies.filter(notEmpty) : [];
  return (
    <>
      <Helmet>
        <title>Location - {location.name}</title>
      </Helmet>
      <Body>
        <BackLink to="/">
          <Button icon="arrow-left" minimal>
            Back to locations
          </Button>
        </BackLink>
        <H1>
          <FontAwesomeIcon
            icon={location.icon as any}
            size="2x"
            transform="shrink-3"
          />
          {location.name}
        </H1>
        <p>{location.desc}</p>
        <HTMLTable striped interactive={!!zombies.length}>
          <thead>
            <tr>
              <th aria-label="zombie icon" />
              <th aria-label="zombie id">ID</th>
              <th aria-label="zombie colour">Colour</th>
              <th aria-label="zombie sex">Sex</th>
              <th aria-label="zombie smell">Smell</th>
              <th aria-label="zombie action">Transfer zombie</th>
            </tr>
          </thead>
          <tbody>
            {zombies.map(zombie => (
              <tr key={zombie.id}>
                <VerticallyCentredCell>
                  <Zombie size="2x" fill={zombie.colour} />
                </VerticallyCentredCell>
                <VerticallyCentredCell>{zombie.id}</VerticallyCentredCell>
                <VerticallyCentredCell>{zombie.colour}</VerticallyCentredCell>
                <VerticallyCentredCell>{zombie.sex}</VerticallyCentredCell>
                <VerticallyCentredCell>{zombie.smell}</VerticallyCentredCell>
                <VerticallyCentredCell>
                  <MoveZombieButton
                    currentLocationId={location.id}
                    zombieId={zombie.id}
                  />
                </VerticallyCentredCell>
              </tr>
            ))}
            {!zombies.length && (
              <tr>
                <Placeholder colSpan={6} align="center" valign="bottom">
                  No zombies at this location
                </Placeholder>
              </tr>
            )}
          </tbody>
        </HTMLTable>
        <br />
        <p>
          <strong>Total:</strong> {zombies.length} zombies in this location
        </p>
      </Body>
    </>
  );
};
