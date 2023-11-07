import { motion } from "framer-motion";
import { ReactElement } from "react";

const ProfileSetupBackground = (): ReactElement => {
  return (
    <motion.div className="absolute h-full w-full right-0 top-0">
      <motion.div className="absolute right-10 top-0 bottom-10 mb-auto mt-auto w-32 h-32 bg-black rounded-full" />
    </motion.div>
  );
};

export default ProfileSetupBackground;
