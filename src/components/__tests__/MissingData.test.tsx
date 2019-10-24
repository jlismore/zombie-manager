import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { MemoryRouter, Router } from "react-router-dom";

import { MissingData } from "../MissingData";

describe("MissingData", () => {
  test("Show correct title", () => {
    const { getByText } = render(
      <MissingData icon="add" noun="thing" id="1" resetPath="/" />,
      { wrapper: MemoryRouter }
    );
    const text = getByText(/Missing/i);
    expect(text.innerHTML).toEqual("Missing thing");
  });

  test("Redirects", () => {
    const history = createMemoryHistory();
    history.push("/some/route");
    expect(history.location.pathname).toEqual("/some/route");

    const { getByText } = render(
      <Router history={history}>
        <MissingData icon="add" noun="thing" id="1" resetPath="/" />
      </Router>
    );
    fireEvent.click(getByText(/Clear selection/i));
    expect(history.location.pathname).toEqual("/");
  });
});
