import { ReactElement } from "react";

const LandingFooter = (): ReactElement => {
  return (
    <footer className="footer">
      <div style={{ height: "75%" }} />
      <div className="footer_links d-flex justify-content-between">
        <p className="mb-0">About us</p>
      </div>
    </footer>
  );
};

export default LandingFooter;
