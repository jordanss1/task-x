import { Formik } from "formik";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";

const ProfileEditForm = (): ReactElement => {
  return (
    <section className="h-screen p-14">
      <Formik></Formik>
    </section>
  );
};

export default ProfileEditForm;
