import { ReactElement, useRef } from "react";
import { colors, fonts } from "../../constants";
import artificialDelay from "../../functions/artificialDelay";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import Button from "../__reusable/Button";
import Google from "../svg/Google";

type HeaderAuthSignInPropsType = {
  mobile?: boolean;
};

const HeaderAuthSignIn = ({
  mobile,
}: HeaderAuthSignInPropsType): ReactElement => {
  const timer = useRef<number | NodeJS.Timeout>(0);

  const timer2 = useRef<number | NodeJS.Timeout>(0);

  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () => handleFullProgress(),
  });

  const handleFullProgress = () => {
    clearTimeout(timer2.current);

    timer2.current = setTimeout(() => {
      window.location.href = "/api/auth/google";
    }, 300);
  };

  return (
    <Button
      style={{
        background: colors.whiteShades[0],
        fontFamily: fonts.orbitron,
        letterSpacing: "1px",
      }}
      onClick={async () =>
        await artificialDelay(timer, undefined, beginProgress, stopProgress)
      }
      fontSize={mobile ? 10 : 12}
      label={mobile ? "Sign in" : "Sign in with Google"}
      className="flex flex-row-reverse items-center text-slate-800 font-normal p-2 px-3 rounded-full gap-1 sm:gap-2 justify-center"
    >
      <Google size={mobile ? 17 : 20} />
    </Button>
  );
};

export default HeaderAuthSignIn;
