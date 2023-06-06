import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App.tsx";
import { customRender } from "../../test-utils/test-utils.tsx";
import { Provider } from "react-redux";
import { userProfile } from "../../mocks/index.tsx";
import { waitFor, act, findAllByText } from "@testing-library/react";
import { store } from "../../app/store.ts";
import { changeTodoHandler } from "../../mocks/handlers.ts";
import { todosExistForLoggedInUser } from "../../mocks/api.ts";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

const user = userEvent.setup();

describe("Tests where the todos don't matter", () => {
  beforeEach(() => {
    window.localStorage.setItem("user", JSON.stringify(userProfile));
    changeTodoHandler(todosExistForLoggedInUser);
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

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });
  });
});

describe("Logged in user has todos", () => {
  beforeEach(() => {
    window.localStorage.setItem("user", JSON.stringify(userProfile));
    changeTodoHandler(todosExistForLoggedInUser);
  });

  afterEach(() => window.localStorage.clear());

  it("After loading is done the user's todos can be seen", async () => {
    const { queryByTestId, getByText } = customRender(Wrapper, <App />);

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    expect(getByText("User added")).toBeInTheDocument();
  });

  it("User can create todos", async () => {
    const { queryByTestId, getByPlaceholderText, getByTestId, findByText } =
      customRender(Wrapper, <App />);

    const input = getByPlaceholderText("Enter todo...");
    const submitButton = getByTestId("submit-button");

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    changeTodoHandler({
      todo: "New todo",
      userId: "12345678",
      id: 13,
    });

    await user.type(input, "New todo");

    expect(input).toHaveValue("New todo");

    await user.click(submitButton);

    expect(await findByText("New todo")).toBeInTheDocument();
  });
});
