import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App.tsx";
import { customRender } from "../../test-utils/test-utils.tsx";
import { Provider } from "react-redux";
import { userProfile } from "../../mocks/index.tsx";
import { waitFor } from "@testing-library/react";
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

  it("When signed in the sign-out button and welcome message should be visible", async () => {
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

  it("When signed in the the user can press the Sign Out button and see the 'Login to create todos' message", async () => {
    const { getByText, findByText, queryByText } = customRender(
      Wrapper,
      <App />
    );

    const signOutButton = getByText("Sign out") as HTMLButtonElement;

    expect(signOutButton).toBeInTheDocument();

    await user.click(signOutButton);

    expect(
      await findByText("Login to view and create todos..")
    ).toBeInTheDocument();

    expect(queryByText("Sign out")).toBeNull();
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

  it("User deletes final todo and the page implores user to create todos", async () => {
    const { queryByText, getByTestId, queryByTestId, getByText } = customRender(
      Wrapper,
      <App />
    );

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    expect(getByText("User added")).toBeInTheDocument();

    changeTodoHandler();

    await user.click(getByTestId("delete-todo"));

    await waitFor(
      () => {
        expect(queryByText("User added")).toBeNull();
        expect(getByText("Start creating todos!")).toBeInTheDocument();
      },
      {
        timeout: 1700,
      }
    );
  });
});

describe("Logged in user has many todos and arrows that change pages work as they should", () => {
  beforeEach(() => {
    window.localStorage.setItem("user", JSON.stringify(userProfile));
    changeTodoHandler(multipleTodosExistForLoggedInUser);
  });

  afterEach(() => window.localStorage.clear());

  it("With six todos both arrows are disabled and when clicked the arrows can't change the page", async () => {
    const { getByTestId, queryByTestId, getAllByTestId } = customRender(
      Wrapper,
      <App />
    );

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    const firstPageTodos = getAllByTestId("todo-item");

    expect(firstPageTodos.length).toBe(6);

    const leftArrow = getByTestId("left-arrow");
    const rightArrow = getByTestId("right-arrow");

    expect(leftArrow && rightArrow).not.toHaveClass("arrow-enabled");

    await user.click(leftArrow && rightArrow);

    expect(firstPageTodos[0]).toBeInTheDocument();
  });

  it("When adding more than six todos the right arrow is activated and clicking it changes to second page. Then clicking the left arrow changes the page back and the arrows have the styles and class to reflect functionality of hover and todos", async () => {
    const {
      getByTestId,
      queryByTestId,
      findByText,
      findAllByText,
      getByPlaceholderText,
      getAllByTestId,
    } = customRender(Wrapper, <App />);

    const input = getByPlaceholderText("Enter todo...") as HTMLInputElement;
    const submitButton = getByTestId("submit-button") as HTMLButtonElement;

    const queries = [input, submitButton];

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    const leftArrow = getByTestId("left-arrow");
    const rightArrow = getByTestId("right-arrow");

    expect(getAllByTestId("todo-item").length).toBe(6);

    await createTodoFunction(queries, {
      todo: "Second page todo",
      userId: "12345678",
      id: 18,
    });

    await waitFor(async () => {
      expect(rightArrow).toHaveClass("arrow-enabled");
      await user.hover(rightArrow);
      expect(rightArrow).toHaveClass("arrow-div-hover");
      await user.click(rightArrow);
    });

    const secondPageTodo = await findByText("Second page todo");

    expect(secondPageTodo).toBeInTheDocument();

    await waitFor(async () => {
      expect(leftArrow).toHaveClass("arrow-enabled");
      expect(rightArrow).not.toHaveClass("arrow-enabled");
      await user.hover(leftArrow);
      expect(leftArrow).toHaveClass("arrow-div-hover");
      await user.hover(rightArrow);
      user.click(leftArrow);
    });

    expect((await findAllByText("First page todos"))[0]).toBeInTheDocument();
  });

  it("With seven todos the seventh while on the second page, the page is automatically set backwards so you can see the only six todos left", async () => {
    const {
      getByTestId,
      queryByTestId,
      findByText,
      findAllByText,
      getByPlaceholderText,
      getAllByTestId,
    } = customRender(Wrapper, <App />);

    const input = getByPlaceholderText("Enter todo...") as HTMLInputElement;
    const submitButton = getByTestId("submit-button") as HTMLButtonElement;

    const queries = [input, submitButton];

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 2500,
    });

    const rightArrow = getByTestId("right-arrow");

    await createTodoFunction(queries, {
      todo: "Second page todo",
      userId: "12345678",
      id: 18,
    });

    await user.click(rightArrow);

    const secondPageTodo = await findByText("Second page todo");

    expect(secondPageTodo).toBeInTheDocument();

    changeTodoHandler();

    await user.click(getByTestId("delete-todo"));

    expect((await findAllByText("First page todos"))[0]).toBeInTheDocument();
  });
});
