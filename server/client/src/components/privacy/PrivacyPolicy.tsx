import { ReactElement } from "react";
import { colors, fonts } from "../../constants";
import "../../styles/privacy.css";
import Header from "../header/Header";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import PrivacyPolicyText from "./PrivacyPolicyText";

const PrivacyPolicy = (): ReactElement => {
  return (
    <main className="privacy px-[90px] py-5 min-h-screen">
      <Header profile containerClass="pb-1" link="/" />
      <section className="privacy_1st flex pt-5 h-[85vh] justify-center items-center flex-col w-full">
        <div className="flex w-full gap-3 h-full">
          <PrivacyPolicyText className="max-w-3xl w-full gap-10 pt-14 justify-center flex flex-col h-4/6">
            <h1
              style={{ fontFamily: fonts.exo }}
              className="privacy_heading text-neutral-800 w-fit relative text-2xl"
            >
              Privacy Policy
            </h1>
            <article
              style={{ fontFamily: fonts.jura }}
              className="max-w-md z-10"
            >
              To use our website you are required to login with google. To
              start, we only take what is necessary when you sign up which is
              only a google ID used to identify you. We are open source. View
              the code{" "}
              <a
                style={{ textShadow: ".5px .5px rgb(0,0,0,.5)" }}
                className="text-sky-500 cursor-pointer underline underline-offset-3"
                href="https://github.com/jordanss1/task-x/blob/master/server/src/services/passport.ts#L13"
              >
                here
              </a>
              .
            </article>
          </PrivacyPolicyText>
          <div className="privacy_1st_img_section isolate w-full left-10 relative rounded-2xl flex justify-center items-center">
            <div
              style={{
                boxShadow:
                  "-3px -1px 1px rgb(20,20,20), 20px 20px 10px rgb(0,0,0,.8), 50px 50px 0 10px blue",
                outline: "5px solid rgb(0,0,0)",
              }}
              className="relative privacy_1st_img  max-w-sm h-96 overflow-hidden w-full rounded-3xl"
            >
              <img
                className="absolute h-full object-cover object-left"
                src="new_user.png"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
