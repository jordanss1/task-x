import { ReactElement } from "react";
import SmallIcon from "./SmallIcon";
import Spinner from "./Spinner";

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

  return (
    <div className="w-5 h-5 p-3 flex rounded-full items-center justify-center">
      {isValidating ? <Spinner /> : renderIcon()}
    </div>
  );
};

export default ValidateIcons;
