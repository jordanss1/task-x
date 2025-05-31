import { ReactElement, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import artificialDelay from "../../functions/artificialDelay";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import LightBulb from "../svg/LightBulb";
import HeaderLogoText from "./HeaderLogoText";

type HeaderLogoPropsType = {
  fontSize?: number;
  iconSize?: number;
  link: string;
};

const HeaderLogo = ({
  fontSize = 20,
  iconSize,
  link,
}: HeaderLogoPropsType): ReactElement => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () => setTimeout(() => navigate(link), 300),
  });

  const timer = useRef<NodeJS.Timeout | number>(0);

  const handleClick = async () => {
    if (pathname !== link) {
      await artificialDelay(timer, undefined, beginProgress, stopProgress);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-1 h-full cursor-pointer items-center"
    >
      <LightBulb size={iconSize ?? 45} />
      <HeaderLogoText fontSize={fontSize} />
    </div>
  );
};

export default HeaderLogo;
