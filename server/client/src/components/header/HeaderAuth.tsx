import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import { UserStateType } from "../../types";
import HeaderAuthDashboard from "./HeaderAuthDashboard";
import HeaderAuthSignIn from "./HeaderAuthSignIn";
import HeaderAuthSignOut from "./HeaderAuthSignOut";

type HeaderAuthPropsType = {
  user: UserStateType;
};

const HeaderAuth = ({ user }: HeaderAuthPropsType) => {
  const mobile = useMediaQuery(640);

  const renderButtons = user ? (
    <>
      <HeaderAuthDashboard userDetails={user.userDetails} mobile={mobile} />
      <HeaderAuthSignOut mobile={mobile} />
    </>
  ) : (
    <HeaderAuthSignIn mobile={mobile} />
  );

  return (
    <div className="h-11 w-3/4 flex justify-end items-center gap-1 sm:gap-4">
      {renderButtons}
    </div>
  );
};

export default HeaderAuth;
