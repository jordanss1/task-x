import { Formik } from "formik";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import { ProfileSchemaType, profileSchema } from "../../../schemas";
import { ValidUserType } from "../../../types";
import Button from "../../__reusable/Button";
import SmallIcon from "../../__reusable/SmallIcon";
import ProfilePicture from "../ProfilePicture";
import ProfileUsername from "../ProfileUsername";

const user: ValidUserType = {
  userId: "33",
  _id: "34",
  __v: 3322,
  profile: {
    userName: "johnnyappleseed",
    profilePicture: "/src/assets/profile-photos/person-4.svg",
  },
};

const ProfileEditForm = (): ReactElement => {
  const { profilePicture, userName } = user.profile;
  return (
    <section className="py-14 sm:py-14 h-full flex-1">
      <Formik<ProfileSchemaType>
        initialValues={{
          profilePicture: profilePicture,
          userName: userName,
        }}
        onSubmit={() => {}}
        validationSchema={profileSchema}
      >
        {(props) => {
          const { profilePicture, userName } = props.values;

          const sameValues =
            profilePicture === props.initialValues.profilePicture &&
            userName === props.initialValues.userName;

          return (
            <form
              style={{
                background:
                  "linear-gradient(110deg, rgb(0, 0, 255), rgba(153, 31, 255, 0.8))",
                boxShadow:
                  "inset 1px 1px 10px black, inset -1px -1px 10px white",
                border: "4px solid black",
              }}
              className="px-5 py-5 sm:py-0 h-full overflow-scroll rounded-2xl"
            >
              <div className="flex flex-col mr-auto ml-auto max-w-xl justify-evenly sm:h-full">
                <div className="flex sm:ps-5 py-5 sm:[--input-width:300px] [--input-width:200px] sm:flex-row flex-col items-center gap-4 sm:gap-20">
                  <ProfileUsername inputWidth={"var(--input-width)"} />
                </div>
                <div className="flex justify-evenly flex-col sm:flex-row h-[520px] sm:h-fit items-center sm:gap-5">
                  <ProfilePicture />
                </div>
                <div className="w-full flex justify-end pt-1">
                  <Button
                    disabled={
                      Boolean(Object.keys(props.errors).length) ||
                      props.isValidating ||
                      sameValues
                    }
                    style={{
                      fontFamily: fonts.jura,
                    }}
                    type="submit"
                    className="p-[6px] text-slate-900 disabled:text-slate-700 bg-[#e0dcd9] disabled:bg-[#e0dcd990] gap-1 rounded-xl"
                    icon={
                      <SmallIcon
                        style={{ color: colors.purple }}
                        size={13}
                        icon="fa-solid fa-check"
                      />
                    }
                    fontSize={14}
                    label="Submit"
                  />
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </section>
  );
};

export default ProfileEditForm;
