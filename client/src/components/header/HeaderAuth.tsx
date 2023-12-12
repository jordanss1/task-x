import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../../app/store";
import keys from "../../config/keys";
import { colors, fonts } from "../../constants";
import { useMediaQuery } from "../../hooks/MediaQueryHooks";
import Button from "../Button";
import SmallIcon from "../SmallIcon";
import Google from "../svg/Google";

type HeaderAuthPropsType = {
  signedIn: boolean;
};

const HeaderAuth = ({ signedIn }: HeaderAuthPropsType) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();
  const mobile = useMediaQuery(640);

  useEffect(() => {
    // On page load, checks if the user is still logged in
  }, []);

  const renderContent = signedIn ? (
    <>
      <Link to="/dashboard">
        <Button
          style={{
            background: colors.whiteShades[0],
            fontFamily: fonts.orbitron,
            letterSpacing: "2px",
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
      </Link>
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
