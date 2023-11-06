import { ReactElement } from "react";
import DashboardNav from "../../dashboard/DashboardNav";
import Header from "../../header/Header";
import HeaderLogo from "../../header/HeaderLogo";
import "../../styles/dashboard.css";
import "../../styles/profile.css";
import ProfileEditForm from "./ProfileEditForm";

const ProfileEdit = (): ReactElement => {
  return (
    <main className="profile px-[50px] h-screen">
      <Header
        profile
        link="/dashboard"
        containerClass="dashboard_header"
        nav={<DashboardNav profile />}
      />
      <ProfileEditForm />
    </main>
  );
};

export default ProfileEdit;
