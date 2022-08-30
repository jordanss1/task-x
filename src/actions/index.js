import { SIGN_IN, SIGN_OUT, CREATE_TODO } from "./types";
import todoList from "../apiAxios/todos";

export const signIn = (userObject) => {
  return {
    type: SIGN_IN,
    payload: {
      userId: userObject.sub,
      name: userObject.name,
      img: userObject.picture,
    },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createTodo = (formValues) => {
  return (dispatch, getState) => {
    const { userId } = getState().auth.userProfile;
    todoList.put("", { ...formValues, userId }).then(({ data }) => {
      dispatch({
        type: CREATE_TODO,
        payload: data,
      });
    });
  };
};
