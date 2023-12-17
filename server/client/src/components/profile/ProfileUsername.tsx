import { useField, useFormikContext } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../constants";
import TransformUnderline from "../__reusable/TransformUnderline";
import ValidateIcons from "../__reusable/ValidateIcons";

type ProfileUsernamePropsType = {
  mobile?: boolean;
  inputWidth?: string;
};

const ProfileUsername = ({
  mobile = false,
  inputWidth = "175px",
}: ProfileUsernamePropsType): ReactElement => {
  const [field, meta, helpers] = useField("userName");
  const { isValidating } = useFormikContext();

  return (
    <>
      <TransformUnderline
        backgroundColors={[
          "linear-gradient(90deg, rgb(153, 31, 255, 0), rgb(153, 31, 255,0) 0% 100%, rgb(202, 255, 159, 0)),",
          "linear-gradient(90deg, rgb(153, 31, 255, 0), rgb(153, 31, 255) 0% 100%, rgb(202, 255, 159, 0)),",
          "linear-gradient(90deg, rgb(202, 255, 159,0), rgb(153, 31, 255) 20% 80%, rgb(202, 255, 159,0))",
        ]}
      >
        <motion.h3
          key="heading2"
          animate={{
            opacity: [0, 1],
            transition: {
              opacity: {
                duration: 0.6,
                delay: 1,
              },
              ease: "easeInOut",
            },
          }}
          exit={{
            opacity: 0,
            x: mobile ? 0 : -20,
            y: mobile ? -20 : 0,
            transition: { duration: 0.4 },
          }}
          style={{
            fontFamily: fonts.jura,
            textShadow: `1px 1px 10px black`,
            color: colors.whiteShades[1],
            opacity: 0,
          }}
          className="w-fit whitespace-nowrap text-lg sm:text-xl leading-none font-bold select-none tracking-tight flex gap-1 items-center relative z-10"
        >
          Username:
        </motion.h3>
      </TransformUnderline>
      <div style={{ maxWidth: inputWidth }} className="relative w-full isolate">
        <AnimatePresence mode="wait">
          {((meta.error && meta.touched) ||
            meta.error === "Username is taken") && (
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: -22 }}
              exit={{ y: 0, transition: { type: "tween", duration: 0.2 } }}
              style={{
                background: colors.whiteShades[0],
                outline: "1px solid rgb(255, 0, 0)",
              }}
              className="absolute -z-10 w-[98%] left-[2px] whitespace-nowrap rounded-t-xl p-1 px-2 text-[11px] top-0 text-[rgb(40,40,40)]"
            >
              {meta.error}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.input
          key="input"
          initial={{ x: 20, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { delay: 0.6 },
          }}
          exit={{
            opacity: 0,
            x: mobile ? -20 : 0,
            y: mobile ? 0 : -20,
            transition: { duration: 0.4 },
          }}
          style={{ maxWidth: inputWidth }}
          {...field}
          className="rounded-lg max-w-[175px] w-full font-[jura] focus:outline-slate-500 focus:outline-offset-0 p-1 focus:outline-none border-4 border-solid border-[blue]"
          type="text"
        />
        <div className="absolute -right-8 top-2">
          {field.value.length > 2 && (
            <ValidateIcons
              error={meta.error === undefined ? false : true}
              isValidating={isValidating}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileUsername;
