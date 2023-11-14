import { ReactElement } from "react";
import ProfileChosenIcon from "../../ProfileChosenIcon";
import ProfileIconList from "../../ProfileIconList";

const ProfileSetupContentPicture = ({
  mobile,
}: {
  mobile: boolean;
}): ReactElement => {
  return (
    <>
      <ProfileChosenIcon
        size={80}
        className="rounded-full w-fit h-fit border border-red-50"
      />
      <ProfileIconList
        className="profile_setup_iconlist grid"
        iconSize={70}
        style={{
          maxWidth: "400px",
        }}
      />
    </>
  );
};

export default ProfileSetupContentPicture;
