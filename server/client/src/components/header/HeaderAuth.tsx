import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { colors, fonts } from "../../constants";
import artificialDelay from "../../functions/artificialDelay";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import { UserStateType, UserType } from "../../types";
import Button from "../__reusable/Button";
import SmallIcon from "../__reusable/SmallIcon";
import Google from "../svg/Google";

type HeaderAuthPropsType = {
  user: UserStateType;
};

const HeaderAuth = ({ user }: HeaderAuthPropsType) => {
  const navigate = useNavigate();
  const mobile = useMediaQuery(640);

  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () =>
      setTimeout(
        () => navigate(user && user.userDetails ? "/dashboard" : "/setup"),
        300
      ),
  });

  const timer = useRef<number | NodeJS.Timeout>(0);

  const renderContent = user ? (
    <>
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
      <a href="/api/logout">
        <Button
          style={{
            background: colors.whiteShades[0],
            fontFamily: fonts.orbitron,
            letterSpacing: "1px",
          }}
          label="Sign out"
          fontSize={mobile ? 10 : 12}
          className="flex h-9 flex-row-reverse text-slate-800 font-normal p-2 px-3 rounded-full gap-2 justify-center items-center"
        >
          <Google size={mobile ? 17 : 20} />
        </Button>
      </a>
    </>
  ) : (
    <a href="/api/auth/google">
      <Button
        style={{
          background: colors.whiteShades[0],
          fontFamily: fonts.orbitron,
          letterSpacing: "1px",
        }}
        fontSize={mobile ? 10 : 12}
        label={mobile ? "Sign in" : "Sign in with Google"}
        className="flex flex-row-reverse items-center text-slate-800 font-normal p-2 px-3 rounded-full gap-1 sm:gap-2 justify-center"
      >
        <Google size={mobile ? 17 : 20} />
      </Button>
    </a>
  );

  return (
    <div className="h-11 w-3/4 flex justify-end items-center gap-1 sm:gap-4">
      {renderContent}
    </div>
  );
};

export default HeaderAuth;
