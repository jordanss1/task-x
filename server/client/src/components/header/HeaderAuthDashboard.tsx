import { ReactElement, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { colors, fonts } from "../../constants";
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

  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () =>
      setTimeout(() => navigate(userDetails ? "/dashboard" : "/setup"), 300),
  });

  const timer = useRef<number | NodeJS.Timeout>(0);

  return (
    <Button
      style={{
        background: colors.whiteShades[0],
        fontFamily: fonts.orbitron,
        letterSpacing: "2px",
      }}
      onClick={async () => {
        //api call will be added to delay later once I have eastablished the database

        // if user.userDetails ? make api call for tasks and taskwall with action argument : () => {}
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
