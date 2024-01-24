import { ReactElement } from "react";
import { colors, fonts } from "../../constants";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import "../../styles/privacy.css";
import Header from "../header/Header";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import PrivacyPolicyText from "./PrivacyPolicyText";

const PrivacyPolicy = (): ReactElement => {
  const is920 = useMediaQuery(920);

  const blueSeperator = (
    <div className="w-full">
      <div className="h-1 rounded-3xl w-full max-w-[120px] sm:max-w-xs mx-auto bg-sky-600" />
    </div>
  );

  return (
    <main className="privacy px-[90px] py-5 min-h-screen">
      <Header profile containerClass="pb-1" link="/" />
      <section className="privacy_1st flex-col gap-24 sm:gap-32 flex pt-24 pb-10 ">
        <div className="privacy_1st_grid grid w-full px-5 sm:px-0 max min-[920px]:gap-10 gap-10 h-full">
          <PrivacyPolicyText className="min-[920px]:max-w-3xl min-[920px]:mx-0 mx-auto max-w-xl sm:px-0 px-1 w-full gap-10 pt-14 justify-center flex flex-col h-4/6">
            <h1
              style={{ fontFamily: fonts.exo }}
              className="privacy_heading text-neutral-800 relative text-2xl"
            >
              Privacy Policy
            </h1>
            <article
              style={{ fontFamily: fonts.jura }}
              className="max-w-2xl text-sm sm:text-lg z-10"
            >
              To use our website you are required to login with google. We only
              take what is necessary when you sign up which is only a google ID
              used to identify you. We are open source. View the code{" "}
              <a
                target="_blank"
                style={{ textShadow: ".5px .5px rgb(0,0,0,.5)" }}
                className="text-sky-500 cursor-pointer underline underline-offset-3"
                href="https://github.com/jordanss1/task-x/blob/master/server/src/services/passport.ts#L13"
              >
                here
              </a>
              .
            </article>
          </PrivacyPolicyText>
          <div className="privacy_1st_img_section  isolate w-full relative rounded-2xl flex justify-center items-center">
            <div
              style={{
                boxShadow: is920
                  ? "-3px -1px 10px rgb(20,20,20), 20px 20px 30px rgb(0,0,0,.8), 30px -30px 0 0px rgb(153, 31, 255)"
                  : "-3px -1px 10px rgb(20,20,20), 20px 20px 30px rgb(0,0,0,.8), 30px 30px 0 0px rgb(153, 31, 255)",
                outline: "7px solid rgb(14 165 233)",
              }}
              className="relative max-w-[300px] sm:max-w-[400px] privacy_1st_img  min-w-xs sm:h-96 h-60 overflow-hidden w-full rounded-3xl"
            >
              <div
                style={{
                  fontFamily: fonts.orbitron,
                  textShadow: "1px 1px rgb(14 165 233)",
                  letterSpacing: "1px",
                }}
                className="absolute inset-0 h-2/4 max-w-xs flex items-center z-10 mx-auto text-white text-xs sm:text-lg px-4 sm:px-2"
              >
                On creation of your account, your google id is all we take from
                your Google Account{" "}
              </div>
              <img
                className="absolute h-full min-w-xs object-cover object-left"
                src="new_user.png"
              />
            </div>
          </div>
        </div>
        {blueSeperator}
      </section>
      <section className="privacy_2nd relative flex items-center px-4 h-[100vh] pt-5 w-full">
        <div
          style={{
            boxShadow:
              "-3px -1px 10px rgb(20,20,20), 60px 60px 40px rgb(0,0,0,.8)",
            background: colors.purpleGradients[1],
            outline: "15px solid rgb(14 165 233)",
          }}
          className="privacy_2nd_grid max-w-[834px] mx-auto grid overflow-hidden w-full rounded-3xl relative px-0 max gap-10 h-3/4"
        >
          <div>
            <article
              style={{
                fontFamily: fonts.jura,
                textShadow: "1px 1px rgb(14 165 233)",
                letterSpacing: "1px",
              }}
              className="absolute inset-0 pt-5 sm:pt-14 mx-auto sm:h-2/4 text-center leading-7 items-center z-10 text-white text-sm sm:text-lg px-7"
            >
              When you use our website, we{" "}
              <span className="font-extrabold text-lg">don't</span> collect
              information about your device, your IP address, the type of device
              you are using, the type of web browser you are using, or any
              similar information. Despite our support of your privacy you can
              delete your account anytime.
            </article>
            <div
              style={{
                boxShadow:
                  "-3px -1px 1px rgb(20,20,20), 20px 20px 20px rgb(0,0,0,.8)",
                outline: "4px solid rgb(14 165 233)",
              }}
              className="absolute bottom-28 -left-3 w-full rounded-2xl overflow-auto  max-w-[400px] min-w-xs h-[400px]"
            >
              <img
                className="absolute h-full min-w-xs object-center"
                src="delete account.png"
              />
            </div>
            <div
              style={{
                boxShadow:
                  "-3px -1px 1px rgb(20,20,20), 20px 20px 20px rgb(0,0,0,.8)",
                outline: "4px solid rgb(14 165 233)",
              }}
              className="absolute -bottom-14 -right-20 w-full rounded-2xl overflow-auto  max-w-[400px] min-w-xs h-[400px]"
            >
              <img
                className="absolute h-full min-w-xs object-center"
                src="edit profile.png"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
