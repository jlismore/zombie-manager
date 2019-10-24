import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Button,
  Classes,
  Drawer,
  FormGroup,
  ButtonGroup
} from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Formik, Form } from "formik";
import React from "react";

import { dashboardQuery } from "../graphql/queries/dashboard";
import {
  DashboardLocationsQuery,
  AddLocationMutation,
  AddLocationMutationVariables
} from "../generated/types";
import {
  FormikInputGroup,
  FormikSelect,
  FormikTextArea
} from "./FormikComponents";
import { addLocationMutation } from "../graphql/mutations/addLocation";

const initialValues = {
  name: "",
  desc: "",
  icon: "building"
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLocationDrawer = (props: Props) => {
  const { data } = useQuery<DashboardLocationsQuery>(dashboardQuery);
  const [addLocation] = useMutation<
    AddLocationMutation,
    AddLocationMutationVariables
  >(addLocationMutation, {
    update(cache, { data }) {
      if (!data || !data.createLocation) {
        return;
      }
      const cachedQuery = cache.readQuery<DashboardLocationsQuery>({
        query: dashboardQuery
      });
      if (!cachedQuery || !cachedQuery.allLocations) {
        return;
      }
      const { allLocations } = cachedQuery;
      const { createLocation } = data;
      cache.writeQuery<DashboardLocationsQuery>({
        query: dashboardQuery,
        data: { allLocations: allLocations.concat(createLocation) }
      });
    }
  });
  const onSubmit = ({ name, desc, icon }: typeof initialValues) => {
    if (!data || !data.allLocations) {
      return;
    }
    // Creating a new location shouldn't require supplying the id. Bad auto-backend!
    const maxId = data.allLocations.reduce(
      (accum, value) =>
        value ? (Number(value.id) > accum ? Number(value.id) : accum) : accum,
      0
    );
    addLocation({
      variables: { id: (maxId + 1).toString(), name, icon, desc }
    });
    props.onClose();
  };
  return (
    <Drawer
      icon="office"
      title="Add Location"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Formik<any>
        initialValues={initialValues}
        onSubmit={onSubmit}
        onReset={props.onClose}
      >
        {({ values }) => {
          return (
            <Form>
              <div className={Classes.DRAWER_BODY}>
                <div className={Classes.DIALOG_BODY}>
                  <FormGroup label="Name" labelInfo="(required)">
                    <Field
                      name="name"
                      placeholder="Name"
                      required
                      component={FormikInputGroup}
                    />
                  </FormGroup>
                  <FormGroup label="Icon" labelInfo="(required)">
                    <Field
                      iconProps={{
                        icon: (
                          <FontAwesomeIcon
                            className={Classes.ICON}
                            icon={values.icon}
                            size="lg"
                          />
                        )
                      }}
                      name="icon"
                      required
                      component={FormikSelect}
                    >
                      <option value="building">Building</option>
                      <option value="church">Church</option>
                      <option value="clinic-medical">Clinic</option>
                      <option value="hospital">Hospital</option>
                      <option value="hotel">Hotel</option>
                      <option value="industry">Factory</option>
                      <option value="store">Store</option>
                      <option value="university">University</option>
                      <option value="school">School</option>
                      <option value="warehouse">Warehouse</option>
                    </Field>
                  </FormGroup>
                  <FormGroup label="Description">
                    <Field
                      name="desc"
                      placeholder="Description"
                      component={FormikTextArea}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className={Classes.DRAWER_FOOTER}>
                <ButtonGroup>
                  <Button type="reset">Cancel</Button>
                  <Button type="submit" intent="primary">
                    Save
                  </Button>
                </ButtonGroup>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Drawer>
  );
};
