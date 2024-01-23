import { Formik, FormikConfig } from "formik";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../../../app/store";
import { colors, fonts } from "../../../constants";
import {
  authSelector,
  deleteProfile,
  setDeletedProfile,
  updateProfile,
} from "../../../features/auth/authSlice";
import artificialDelay from "../../../functions/artificialDelay";
import useArtificialProgress from "../../../hooks/useArtificialProgress";
import { ProfileSchemaType, profileSchema } from "../../../schemas";
import { ValidUserType } from "../../../types";
import Button from "../../__reusable/Button";
import Popup, { PopupPropsType } from "../../__reusable/Popup";
import Spinner from "../../__reusable/Spinner";
import ProfilePicture from "../ProfilePicture";
import ProfileUsername from "../ProfileUsername";

const ProfileEditForm = ({
  user,
}: {
  user: ValidUserType["profile"];
}): ReactElement => {
  const { authFetching, deletedProfile } = useSelector(authSelector);
  const dispatch = useDispatch<AppThunkDispatch>();
  const [prompt, setPrompt] = useState<PopupPropsType["prompt"]>();
  const timer = useRef<NodeJS.Timeout | number>(0);
  const timer2 = useRef<NodeJS.Timeout | number>(0);

  const navigate = useNavigate();

  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () => {
      clearTimeout(timer2.current);

      timer2.current = setTimeout(() => navigate("/"), 300);
    },
  });

  useEffect(() => {
    return () => {
      if (deletedProfile) dispatch(setDeletedProfile(false));
    };
  }, []);

  useEffect(() => {
    if (deletedProfile) {
      const handleRedirect = async () => {
        await artificialDelay(timer, undefined, beginProgress, stopProgress);
      };

      handleRedirect();
    }
  }, [deletedProfile]);

  const handleSubmit: FormikConfig<ProfileSchemaType>["onSubmit"] = async (
    values,
    actions
  ) => {
    await dispatch(updateProfile(values));
    actions.resetForm({ values });
  };

  const handleDelete = async () => {
    setPrompt({
      message: (
        <div className="flex flex-col gap-2 max-w-[240px] pb-1">
          <span>
            This will delete all your tasks, community activity and account.
          </span>
          <br></br>
          Are you sure you want to delete it?
        </div>
      ),
      onAccept: async () => {
        await dispatch(deleteProfile());
        setPrompt(undefined);
      },
      onDeny: () => setPrompt(undefined),
    });
  };

  return (
    <>
      <section className="py-14 sm:py-14 min-h-screen h-full">
        {user && (
          <Formik<ProfileSchemaType>
            initialValues={{
              profilePicture: user.profilePicture,
              userName: user.userName,
            }}
            onSubmit={handleSubmit}
            validationSchema={profileSchema(user.userName)}
          >
            {(props) => {
              const { dirty, isValidating, errors, isSubmitting, submitForm } =
                props;

              return (
                <>
                  {prompt && <Popup prompt={prompt} />}
                  <form
                    style={{
                      background:
                        "linear-gradient(110deg, rgb(0, 0, 255), rgba(153, 31, 255, 0.8))",
                      boxShadow:
                        "inset 1px 1px 10px black, inset -1px -1px 10px white",
                      border: "4px solid black",
                    }}
                    className="py-5 min-h-screen rounded-2xl"
                  >
                    <div className="flex flex-col gap-10 mx-auto max-w-xl justify-evenly min-h-screen">
                      <div className="flex sm:ps-5 py-5 sm:[--input-width:300px] [--input-width:200px]  flex-col items-center gap-4 ">
                        <ProfileUsername inputWidth={"var(--input-width)"} />
                      </div>
                      <div className="flex justify-evenly flex-col items-center sm:px-0 px-4 gap-10">
                        <ProfilePicture />
                      </div>
                      <div className="w-full flex flex-col gap-10 px-5 max-w-[400px] mx-auto  justify-end pt-1 pb-4">
                        <Button
                          disabled={
                            Boolean(Object.keys(errors).length) ||
                            isValidating ||
                            !dirty ||
                            authFetching ||
                            isSubmitting
                          }
                          style={{
                            fontFamily: fonts.jura,
                          }}
                          onClick={() => submitForm()}
                          type="submit"
                          className="text-slate-900 w-full h-8 min-w-[75px] max-w-[75px] ms-auto disabled:text-slate-700 bg-[#e0dcd9] disabled:bg-[#e0dcd990] gap-1 rounded-xl"
                          fontSize={14}
                          label={
                            isSubmitting || isValidating ? (
                              <div className="w-full h-full flex justify-center items-center">
                                <Spinner
                                  position="initial"
                                  color={colors.purple}
                                />
                              </div>
                            ) : (
                              "Submit"
                            )
                          }
                        />
                        <div className="w-full mx-auto">
                          <Button
                            onClick={async () => await handleDelete()}
                            type="button"
                            disabled={
                              authFetching || isValidating || isSubmitting
                            }
                            style={{
                              fontFamily: fonts.jura,
                            }}
                            label={
                              authFetching ? (
                                <Spinner position="initial" />
                              ) : (
                                "Delete Account"
                              )
                            }
                            className="h-8 text-slate-200 w-full flex items-center justify-center disabled:text-slate-700 bg-red-500 disabled:bg-[#e0dcd990] gap-1 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              );
            }}
          </Formik>
        )}
      </section>
    </>
  );
};

export default ProfileEditForm;
