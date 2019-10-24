import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Dashboard } from "./views/Dashboard";
import { Location } from "./views/Location";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/location/:locationId" component={Location} />
        <Route exact path="/location" component={Dashboard} />
        <Redirect to="/location" />
      </Switch>
    </BrowserRouter>
  );
};
