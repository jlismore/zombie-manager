import { useQuery, useMutation } from "@apollo/react-hooks";
import { HTMLSelect, Spinner, Button, ControlGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import {
  DashboardLocationsQuery,
  UpdateZombieLocationMutation,
  UpdateZombieLocationMutationVariables
} from "../generated/types";
import { dashboardQuery } from "../graphql/queries/dashboard";
import { notEmpty } from "../helpers/typeguards";
import { updateZombieLocationMutation } from "../graphql/mutations/updateZombieLocation";

interface Props {
  currentLocationId: string;
  zombieId: string;
}
export const MoveZombieButton = (props: Props) => {
  const [newLocationId, setNewLocationId] = useState("");
  const { data, loading } = useQuery<DashboardLocationsQuery>(dashboardQuery, {
    onCompleted: data => {
      if (data.allLocations) {
        const firstNonSelf = data.allLocations
          .filter(notEmpty)
          .filter(location => location.id !== props.currentLocationId)[0];
        setNewLocationId(firstNonSelf ? firstNonSelf.id : "");
      }
    }
  });
  const [moveZombie] = useMutation<
    UpdateZombieLocationMutation,
    UpdateZombieLocationMutationVariables
  >(updateZombieLocationMutation, {
    refetchQueries: ["DashboardLocations", "SingleLocation"]
  });
  if (loading) {
    return <Spinner size={Spinner.SIZE_SMALL} />;
  }
  if (!data || !data.allLocations) {
    return null;
  }
  const otherLocations = data.allLocations
    .filter(notEmpty)
    .filter(location => location.id !== props.currentLocationId);
  const onChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewLocationId(e.currentTarget.value);
  };
  const onMove = () =>
    moveZombie({
      variables: { id: props.zombieId, locationId: newLocationId }
    });
  return (
    <ControlGroup>
      <HTMLSelect value={newLocationId} onChange={onChangeLocation}>
        {otherLocations.map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </HTMLSelect>
      <Button
        aria-label="Move this zombie to another location"
        icon="arrow-right"
        intent="primary"
        onClick={onMove}
      />
    </ControlGroup>
  );
};
