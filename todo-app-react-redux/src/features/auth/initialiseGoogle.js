export const initialiseGoogle = (callbackResponse) => {
  /* global google */
  const google = window.google;
  if (google) {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_ID,
      callback: callbackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonSignIn"),
      {
        shape: "circle",
        size: "medium",
        type: "standard",
      }
    );
  }
};
