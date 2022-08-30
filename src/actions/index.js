import { SIGN_IN, SIGN_OUT } from "./types";

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
