import { ReactElement, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colors, fonts } from "../../constants";
import { updateProgress } from "../../features/interface/interfaceSlice";
import artificialDelay from "../../functions/artificialDelay";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import { UserType } from "../../types";
import Button from "../__reusable/Button";
import SmallIcon from "../__reusable/SmallIcon";

type HeaderAuthDashboardPropsType = {
  mobile?: boolean;
  userDetails: UserType["userDetails"];
};

const HeaderAuthDashboard = ({
  mobile,
  userDetails,
}: HeaderAuthDashboardPropsType): ReactElement => {
  const navigate = useNavigate();

  const timer = useRef<number | NodeJS.Timeout>(0);
  const timer2 = useRef<number | NodeJS.Timeout>(0);

  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () => handleFullProgress(),
  });

  const handleFullProgress = () => {
    clearTimeout(timer2.current);

    timer2.current = setTimeout(() => {
      navigate(userDetails ? "/dashboard" : "/setup");
    }, 300);
  };

  return (
    <Button
      style={{
        background: colors.whiteShades[0],
        fontFamily: fonts.orbitron,
        letterSpacing: "2px",
      }}
      onClick={async () => {
        await artificialDelay(timer, undefined, beginProgress, stopProgress);
      }}
      className="flex h-9 flex-row-reverse text-slate-800 font-normal p-2 sm:px-3 rounded-full gap-2 justify-center"
      label={mobile ? null : "Dashboard"}
    >
      <SmallIcon
        size={17}
        className="text-[#991ff1]"
        icon="fa-solid fa-house"
      />
    </Button>
  );
};

export default HeaderAuthDashboard;
