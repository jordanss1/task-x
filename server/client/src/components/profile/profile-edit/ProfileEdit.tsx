import { ReactElement } from "react";
import "../../../styles/dashboard.css";
import "../../../styles/profile.css";
import DashboardNav from "../../dashboard/DashboardNav";
import Header from "../../header/Header";
import ProfileEditForm from "./ProfileEditForm";

const ProfileEdit = (): ReactElement => {
  return (
    <main className="profile_edit flex flex-col px-5 sm:px-[50px] sm:h-screen">
      <Header
        profile
        link="/dashboard"
        containerClass="dashboard_header items-center sm:pt-0 pt-5"
        nav={<DashboardNav profile />}
      />
      <ProfileEditForm />
    </main>
  );
};

export default ProfileEdit;
