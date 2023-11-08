import { motion } from "framer-motion";
import { ReactElement } from "react";

const ProfileSetupBackground = (): ReactElement => {
  return (
    <motion.div className="absolute h-full w-full right-0 top-0">
      {/* <motion.div style={{skew: 30}} className="absolute -right-14 -top-14 w-40 h-40 outline outline-[15px] outline-slate-400 bg-transparent rounded-full" /> */}
    </motion.div>
  );
};

export default ProfileSetupBackground;
