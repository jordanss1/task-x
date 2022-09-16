export const initialiseGoogle = (callbackResponse) => {
  /* global google */
  const google = window.google;
  google.accounts.id.initialize({
    client_id:
      "600309209777-29sff65hsmud4j0gpt5icis5meaud1de.apps.googleusercontent.com",
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
};
