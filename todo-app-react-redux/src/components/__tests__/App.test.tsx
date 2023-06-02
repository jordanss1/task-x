import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App.tsx";
import { customRender } from "../../test-utils/test-utils.tsx";
import { Provider } from "react-redux";
import { initial } from "../../mocks/index.tsx";
import { waitFor } from "@testing-library/react";
import { store } from "../../app/store.ts";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

const user = userEvent.setup();

describe("Tests where the todos don't matter", () => {
  beforeEach(() => {
    window.localStorage.setItem("user", JSON.stringify(initial.userProfile));
  });

  afterEach(() => window.localStorage.clear());

  it("When signed in the the sign-out button and welcome message should be visible", async () => {
    const { getByText } = customRender(Wrapper, <App />);

    expect(getByText("Sign out")).toBeInTheDocument();
    expect(getByText("Hi, Jordan")).toBeInTheDocument();
  });

  it("When user first logs in they should see the loading placeholder before todos load in", async () => {
    const { getByTestId, queryByTestId } = customRender(Wrapper, <App />);

    expect(getByTestId("placeholder")).toBeInTheDocument();

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull());
  });
});

describe("Logged in user has todos", () => {
  beforeEach(() => {
    window.localStorage.setItem("user", JSON.stringify(initial.userProfile));
  });

  afterEach(() => window.localStorage.clear());

  it("After loading is done the user's todos can be seen", async () => {
    const { getByTestId, queryByTestId, findByText, debug } = customRender(
      Wrapper,
      <App />
    );

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull());

    expect(await findByText("User added")).toBeInTheDocument();
  });
});
