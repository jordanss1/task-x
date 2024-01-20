import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../features/auth/authSlice";
import "../../../styles/dashboard.css";
import "../../../styles/profile.css";
import DashboardNav from "../../dashboard/DashboardNav";
import Header from "../../header/Header";
import ProfileEditForm from "./ProfileEditForm";

const ProfileEdit = (): ReactElement => {
  const { user } = useSelector(authSelector);

  return (
    <main className="profile_edit px-5 min-h-screen">
      {user && user.profile && (
        <>
          <Header
            profile
            link="/dashboard/home"
            containerClass="dashboard_header items-center sm:pt-0 pt-5"
            nav={<DashboardNav profile />}
          />
          <ProfileEditForm user={user.profile} />
        </>
      )}
    </main>
  );
};

export default ProfileEdit;
