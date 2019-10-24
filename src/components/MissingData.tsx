import { Button, IconName, NonIdealState } from "@blueprintjs/core";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const GrowingContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
`;

interface Props {
  icon: IconName;
  noun: string;
  id: string;
  resetPath: string;
}

export const MissingData = (props: Props) => {
  const history = useHistory();
  const clearSelection = () => history.push(props.resetPath);
  return (
    <GrowingContainer>
      <NonIdealState
        icon={props.icon}
        title={`Missing ${props.noun}`}
        description={`No ${props.noun} with id ${props.id} exists in the database`}
        action={<Button text="Clear selection" onClick={clearSelection} />}
      />
    </GrowingContainer>
  );
};
