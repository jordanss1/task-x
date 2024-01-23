import { ReactElement, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { colors, fonts } from "../../constants";
import artificialDelay from "../../functions/artificialDelay";
import useArtificialProgress from "../../hooks/useArtificialProgress";

const LandingHeroFooter = (): ReactElement => {
  const timer = useRef<NodeJS.Timeout | number>(0);
  const navigate = useNavigate();

  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () => setTimeout(() => navigate("/privacy"), 300),
  });

  return (
    <div
      style={{
        fontFamily: fonts.jura,
        boxShadow: `0px -1px 10px rgb(0,0,0,.3)`,
      }}
      className="absolute h-7 text-slate-600 items-center font-semibold text-xs bottom-0 left-0 w-full flex justify-start  min-[800px]:px-24 px-10"
    >
      <ul>
        <li
          onClick={async () =>
            await artificialDelay(timer, undefined, beginProgress, stopProgress)
          }
          className="cursor-pointer"
        >
          Privacy Policy
        </li>
      </ul>
    </div>
  );
};

export default LandingHeroFooter;
