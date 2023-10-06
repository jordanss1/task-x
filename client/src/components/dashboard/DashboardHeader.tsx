import { ReactElement } from "react";

const DashboardHeader = (): ReactElement => {
  const renderSignOutButton = (
    <div className="d-flex justify-content-center flex-row">
      <p className="mb-0">Sign out</p>
      <i className="google icon fs-4 pt-1 ps-2" />
    </div>
  );

  return (
    <nav>
      <ul>
        <li></li>
        <li>{renderSignOutButton}</li>
      </ul>
    </nav>
  );
};

export default DashboardHeader;
