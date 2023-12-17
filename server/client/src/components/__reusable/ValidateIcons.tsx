import { motion } from "framer-motion";
import { ReactElement } from "react";
import { colors } from "../../constants";
import SmallIcon from "./SmallIcon";

type ValidateIconsPropsType = {
  isValidating: boolean;
  error: boolean;
};

const ValidateIcons = ({
  isValidating,
  error,
}: ValidateIconsPropsType): ReactElement => {
  const renderIcon = () => {
    switch (error) {
      case true:
        return (
          <SmallIcon
            size={20}
            className="text-red-500"
            icon="fa-solid fa-xmark"
          />
        );
      default:
        return (
          <SmallIcon
            size={18}
            className="text-green-600"
            icon="fa-solid fa-check"
          />
        );
    }
  };

  const renderLoader = (
    <motion.div
      className="h-5 w-5 p-2 rounded-xl z-10"
      style={{
        border: "4px solid rgb(150,150,150)",
        borderTop: `4px solid ${colors.whiteShades[1]}`,
      }}
      initial={{ rotate: 0 }}
      animate={{
        rotate: [0, 360],
        transition: {
          rotate: {
            duration: 1,
            repeat: Infinity,
            type: "tween",
            ease: "linear",
          },
        },
      }}
    />
  );

  return (
    <div
      className="w-5 h-5 p-3 flex rounded-full items-center justify-center"
      style={
        {
          // background: colors.whiteShades[2],
        }
      }
    >
      {isValidating ? renderLoader : renderIcon()}
    </div>
  );
};

export default ValidateIcons;
