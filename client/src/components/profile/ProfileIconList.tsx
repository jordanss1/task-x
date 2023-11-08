import { ReactElement } from "react";
import profilePhotos from "../../assets/profile-photos/profilePhotos";
import ProfileIcon from "../ProfileIcon";

const ProfileIconList = (): ReactElement => {
  return (
    <div className="grid">
      {profilePhotos.map((profilePhoto) => (
        <ProfileIcon />
      ))}
    </div>
  );
};

export default ProfileIconList;
