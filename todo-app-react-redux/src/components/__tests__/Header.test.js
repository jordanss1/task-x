import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import App from "../App";
import { customRender } from "../../test-utils/test-utils";
import { Provider } from "react-redux";
import { store } from "../../app/store.ts";

const Wrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const user = userEvent.setup();

test("When signed in the the sign-out button and name should be visible", async () => {
  const { debug, findByTitle, findByText } = customRender(Wrapper, <App />);

  // await expect(findByTitle("Sign in with Google Button")).toBeInTheDocument();

  debug();
});
