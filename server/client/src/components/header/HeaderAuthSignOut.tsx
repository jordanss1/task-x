import { ReactElement, useRef } from "react";
import { colors, fonts } from "../../constants";
import artificialDelay from "../../functions/artificialDelay";
import useArtificialProgress from "../../hooks/useArtificialProgress";
import Button from "../__reusable/Button";
import Google from "../svg/Google";

type HeaderAuthSignOutPropsType = {
  mobile?: boolean;
};

const HeaderAuthSignOut = ({
  mobile,
}: HeaderAuthSignOutPropsType): ReactElement => {
  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () =>
      setTimeout(() => {
        console.log("href");
        window.location.href = "/api/logout";
      }, 300),
  });

  const timer = useRef<number | NodeJS.Timeout>(0);

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
      label="Sign out"
      fontSize={mobile ? 10 : 12}
      className="flex h-9 flex-row-reverse text-slate-800 font-normal p-2 px-3 rounded-full gap-2 justify-center items-center"
    >
      <Google size={mobile ? 17 : 20} />
    </Button>
  );
};

export default HeaderAuthSignOut;
