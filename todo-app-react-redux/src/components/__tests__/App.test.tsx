import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App.tsx";
import { customRender } from "../../test-utils/test-utils.tsx";
import { Provider } from "react-redux";
import { userProfile } from "../../mocks/index.tsx";
import { waitFor, act } from "@testing-library/react";
import { store } from "../../app/store.ts";
import { changeTodoHandler } from "../../mocks/handlers.ts";
import {
  multipleTodosExistForLoggedInUser,
  oneTodoExistsForLoggedInUser,
} from "../../mocks/api.ts";
import { TodoType } from "../../features/todos/todosSlice.ts";

type CreateTodoType = (
  queries: (HTMLInputElement | HTMLButtonElement)[],
  todo: TodoType
) => Promise<void>;

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

const user = userEvent.setup();

const createTodoFunction: CreateTodoType = async (queries, todo) => {
  const input = queries[0];
  const submitButton = queries[1];

  changeTodoHandler(todo);

  await user.type(input, "New todo");

  expect(input).toHaveValue("New todo");

  await user.click(submitButton);
};

describe("Tests where the todos don't matter", () => {
  beforeEach(() => {
    window.localStorage.setItem("user", JSON.stringify(userProfile));
    changeTodoHandler(oneTodoExistsForLoggedInUser);
  });

  afterEach(() => window.localStorage.clear());

  it("When signed in the the sign-out button and welcome message should be visible", async () => {
    const { getByText } = await customRender(Wrapper, <App />);

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
    changeTodoHandler(oneTodoExistsForLoggedInUser);
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

    const input = getByPlaceholderText("Enter todo...") as HTMLInputElement;
    const submitButton = getByTestId("submit-button") as HTMLButtonElement;

    const queries = [input, submitButton];

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    await createTodoFunction(queries, {
      todo: "New todo",
      userId: "12345678",
      id: 13,
    });

    expect(await findByText("New todo")).toBeInTheDocument();
  });

  it("User can edit todo", async () => {
    const { queryByTestId, getByTestId, findByText } = customRender(
      Wrapper,
      <App />
    );

    let windowPrompt = jest
      .spyOn(window, "prompt")
      .mockImplementation(() => "done");

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    changeTodoHandler({
      todo: "done",
      userId: "12345678",
      id: 12,
    });

    const editButton = getByTestId("edit-todo");

    await user.click(editButton);

    expect(windowPrompt).toHaveBeenCalled();

    expect(await findByText("done")).toBeInTheDocument();
  });

  it("User can delete todo", async () => {
    const {
      queryByText,
      getByTestId,
      queryByTestId,
      getByPlaceholderText,
      findByText,
      getAllByTestId,
    } = customRender(Wrapper, <App />);

    const input = getByPlaceholderText("Enter todo...") as HTMLInputElement;
    const submitButton = getByTestId("submit-button") as HTMLButtonElement;

    const queries = [input, submitButton];

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    await createTodoFunction(queries, {
      todo: "New todo",
      userId: "12345678",
      id: 13,
    });

    changeTodoHandler();

    expect(await findByText("New todo")).toBeInTheDocument();

    await user.click(getAllByTestId("delete-todo")[1]);

    await waitFor(() => expect(queryByText("New todo")).toBeNull());
  });
});
