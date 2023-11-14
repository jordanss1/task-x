import { useField } from "formik";
import { motion } from "framer-motion";
import { ReactElement } from "react";

const ProfileSetupContentUsername = (): ReactElement => {
  const [] = useField("userName");

  return (
    <>
      <motion.input />
    </>
  );
};

export default ProfileSetupContentUsername;
