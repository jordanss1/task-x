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
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        exit={{ opacity: 0, x: -20, transition: { delay: 0.1, duration: 0.4 } }}
        size={100}
        className="profile_setup_chosen_icon rounded-full bg-slate-400 p-2 w-fit h-fit outline-4 outline outline-gray-100"
      />
      <ProfileIconList
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.6 },
        }}
        exit={{ opacity: 0, x: 20, transition: { duration: 0.4 } }}
        iconSize={70}
        className="profile_setup_iconlist grid"
        style={{
          maxWidth: "400px",
        }}
      />
    </>
  );
};

export default ProfileSetupContentPicture;
