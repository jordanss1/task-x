import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../features/auth/authSlice";
import { interfaceSelector } from "../../../features/interface/interfaceSlice";
import "../../../styles/dashboard.css";
import "../../../styles/profile.css";
import ProgressBar from "../../__reusable/ProgressBar";
import DashboardNav from "../../dashboard/DashboardNav";
import Header from "../../header/Header";
import ProfileEditForm from "./ProfileEditForm";

const ProfileEdit = (): ReactElement => {
  const { user } = useSelector(authSelector);
  const { progress } = useSelector(interfaceSelector);

  return (
    <>
      {(user === null || (user && !user.profile)) && (
        <div className="z-100 h-screen w-full bg-white" />
      )}
      <ProgressBar progress={progress} />
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
    </>
  );
};

export default ProfileEdit;
