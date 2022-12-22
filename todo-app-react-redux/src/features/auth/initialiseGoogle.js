export const initialiseGoogle = (callbackResponse, google) => {
  /* global google */
  google.accounts.id.initialize({
    client_id: process.env.REACT_APP_ID,
    callback: callbackResponse,
  });
  window.google.accounts.id.renderButton(
    document.getElementsByClassName("buttonSignIn")[0],
    {
      shape: "circle",
      size: "medium",
      type: "standard",
    }
  );
};
