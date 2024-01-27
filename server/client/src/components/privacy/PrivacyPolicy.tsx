import { motion, useInView } from "framer-motion";
import { ReactElement, useRef } from "react";
import { useSelector } from "react-redux";
import { colors, fonts } from "../../constants";
import { interfaceSelector } from "../../features/interface/interfaceSlice";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import "../../styles/privacy.css";
import ProgressBar from "../__reusable/ProgressBar";
import Header from "../header/Header";

const seperator = (color: "white" | "blue") => (
  <div className="w-full z-20">
    <div
      style={{
        background: color === "blue" ? "rgb(2 132 199)" : colors.whiteShades[1],
      }}
      className="h-1 rounded-3xl w-full max-w-[120px] sm:max-w-xs mx-auto bg-sky-600"
    />
  </div>
);

const PrivacyPolicy = (): ReactElement => {
  const is920 = useMediaQuery(920);
  const { progress } = useSelector(interfaceSelector);

  return (
    <main className="privacy px-[90px] py-5 min-h-screen">
      <ProgressBar progress={progress} />
      <Header profile containerClass="pb-1" link="/" />
      <PrivacyPolicyFirstSection is920={is920} />
      <PrivacyPolicySecondSection is920={is920} />
    </main>
  );
};

export default PrivacyPolicy;

const PrivacyPolicyFirstSection = ({
  is920,
}: {
  is920: boolean;
}): ReactElement => {
  return (
    <section className="privacy_1st flex-col gap-24 sm:gap-36 flex pt-24 pb-20 ">
      <div className="privacy_1st_grid grid w-full px-5 sm:px-0 max min-[920px]:gap-10 gap-10 h-full">
        <div className="min-[920px]:max-w-3xl min-[920px]:mx-0 mx-auto max-w-xl sm:px-0 px-1 w-full gap-10 pt-14 justify-center flex flex-col h-4/6">
          <h1
            style={{ fontFamily: fonts.orbitron }}
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
        </div>
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
      {seperator("blue")}
    </section>
  );
};

const PrivacyPolicySecondSection = ({
  is920,
}: {
  is920: boolean;
}): ReactElement => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="privacy_2nd relative justify-evenly flex flex-col gap-20   [@media(min-width:920px)]:gap-5 items-center sm:px-4  [@media(min-width:920px)]:h-[120vh] [@media(min-width:920px)]:py-10  py-20 w-full">
      <motion.div
        animate={{
          scale: isInView ? 1 : 0.95,
          opacity: isInView ? 1 : 0,
          filter: isInView ? "blur(0px)" : "blur(2px)",
          x: isInView ? 0 : 40,
          transition: {
            type: "tween",
            ease: "easeIn",
            duration: 0.3,
            opacity: {
              duration: 0.6,
            },
          },
        }}
        className="min-[920px]:max-w-3xl min-[920px]:mx-0 mx-auto max-w-xl sm:px-0 px-1 w-full justify-center gap-5 flex flex-col"
      >
        <h2
          style={{ fontFamily: fonts.orbitron, color: colors.whiteShades[1] }}
          className="text-neutral-800 relative text-2xl"
        >
          Deleting account
        </h2>
        <article
          style={{
            fontFamily: fonts.jura,
            letterSpacing: "1px",
            color: colors.whiteShades[1],
          }}
          className="pt-2 mx-auto leading-2 items-center z-10 text-white text-sm sm:text-lg"
        >
          When you use our website, we{" "}
          <span className="font-extrabold text-sm sm:text-lg">don't</span>{" "}
          collect information about your device, your IP address, the type of
          device you are using, the type of web browser you are using, or any
          similar information. Despite our support of your privacy you can
          delete your account anytime.
        </article>
      </motion.div>
      <div className="w-full h-fit z-20">{seperator("white")}</div>
      <motion.div
        ref={ref}
        animate={{
          boxShadow: isInView
            ? "-3px -1px 10px rgb(20,20,20), 40px 40px 30px rgb(0,0,0)"
            : "-30px -30px 40px rgb(20,20,20), 60px 60px 40px rgb(0,0,0,0)",
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : -20,
          transition: {
            type: "tween",
            ease: "easeIn",
            duration: 0.3,
            delay: 0.5,
            boxShadow: {
              duration: 0.3,
              delay: 0.5,
            },
          },
        }}
        style={{
          boxShadow:
            "-3px -1px 10px rgb(20,20,20), 60px 60px 40px rgb(0,0,0,0)",
          background: colors.purpleGradients[1],
          outline: "7px solid rgb(14 165 233)",
        }}
        className="privacy_2nd_grid [@media(min-width:920px)]:max-w-[834px] max-w-xl mx-auto grid overflow-hidden w-full rounded-3xl relative px-0 max gap-10 h-[500px] sm:h-[650px] [@media(min-width:920px)]:h-2/4"
      >
        <div>
          <motion.article
            animate={{
              opacity: isInView ? 1 : 0,
              transition: {
                delay: 0.5,
              },
            }}
            style={{
              fontFamily: fonts.jura,
              textShadow: "1px 2px rgb(14 165 233)",
            }}
            className="absolute inset-0 max-w-lg pt-5 mx-auto flex flex-col gap-2 justify-center h-2/4 text-center leading-7 whitespace-nowrap sm:whitespace-normal items-center z-10 text-white text-[16px] font-bold sm:text-2xl px-7"
          >
            <span>Delete your account by following:</span> <br></br>
            Account &gt; Edit Profile
          </motion.article>
          <motion.div
            style={{
              boxShadow:
                "-3px -1px 1px rgb(20,20,20), 20px 20px 20px rgb(0,0,0,.8)",
              outline: "4px solid rgb(14 165 233)",
            }}
            className="absolute -top-0 [@media(min-width:920px)]:top-auto [@media(min-width:920px)]:bottom-24 [@media(min-width:920px)]:-left-20 -left-24 w-full rounded-2xl overflow-auto max-w-xs h-[320px] sm:max-w-[400px] sm:min-w-xs sm:h-[400px]"
          >
            <img
              className="absolute h-full min-w-xs object-center"
              src="delete account.png"
            />
          </motion.div>
          <motion.div
            style={{
              boxShadow:
                "-3px -1px 1px rgb(20,20,20), 20px 20px 20px rgb(0,0,0,.8)",
              outline: "4px solid rgb(14 165 233)",
            }}
            className="absolute [@media(min-width:920px)]:-bottom-20 [@media(min-width:920px)]:-right-20 -right-28 sm:-right-24 w-full bottom-10 rounded-2xl overflow-auto max-w-xs  h-[320px] sm:max-w-[400px] sm:min-w-xs sm:h-[400px]"
          >
            <img
              className="absolute h-full min-w-xs object-center"
              src="edit profile.png"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
