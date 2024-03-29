import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthStateType } from "../features/auth/authSlice";
import todosReducer from "../features/todos/todosSlice";

export const userProfile = { sub: "12345678", name: "Jordan", picture: "" };

// export const initial: AuthStateType = {
//   isSignedIn: true,
//   userProfile: { _user: "12345678", name: "Jordan", img: "" },
//   beenSignedIn: true,
//   beenSignedOut: false,
//   loading: true,
// };

// const storeConfigure = (state: AuthStateType) => {
//   return configureStore({
//     reducer: {
//       auth: authReducer,
//       todos: todosReducer,
//       classes: classesReducer,
//     },
//     preloadedState: {
//       auth: state,
//     },
//   });
// };

// export const loggedInStore = storeConfigure(initial);

// export const GoogleMock = () => {
//   const { handleCallbackResponse } = usePreLoginLogout();

//   const GoogleLoginMockFn = jest.fn(() => GoogleLogin);
//   const GoogleLoginMock = GoogleLoginMockFn();

//   const GoogleProviderMockFn = jest.fn(() => GoogleOAuthProvider);
//   const GoogleProviderMock = GoogleProviderMockFn();

//   const handleCallbackResponseMock = jest.fn((response: CredentialResponse) =>
//     handleCallbackResponse(response)
//   );

//   return (
//     <GoogleProviderMock
//       onScriptLoadError={() => console.log("error")}
//       onScriptLoadSuccess={() => console.log("success")}
//       clientId={process.env.REACT_APP_ID as string}
//     >
//       <GoogleLoginMock
//         onSuccess={(response) => handleCallbackResponseMock(response)}
//         shape="circle"
//         size="medium"
//         type="standard"
//       />
//     </GoogleProviderMock>
//   );
// };
