import { ReactElement, useRef } from "react";
import { useNavigate } from "react-router-dom";
import artificialDelay from "../../functions/artificialDelay";
import useArtificialProgress from "../../hooks/useArtificialProgress";

const LandingHeroLeftBody = ({ index }: { index: number }): ReactElement => {
  const navigate = useNavigate();

  const { beginProgress, stopProgress } = useArtificialProgress({
    onFullProgress: () => setTimeout(() => navigate("/privacy"), 300),
  });

  const timer = useRef<number | NodeJS.Timeout>(0);

  const renderBody =
    index === 0 ? (
      <span>
        We take the minimum amount of data to run the service. View our{" "}
        <span
          style={{ textShadow: ".5px .5px white" }}
          className="text-sky-500 cursor-pointer underline underline-offset-3"
          onClick={async () =>
            await artificialDelay(timer, undefined, beginProgress, stopProgress)
          }
        >
          privacy policy.
        </span>
      </span>
    ) : index === 1 ? (
      "Create tasks to keep your life organised. Set the date and time it should be completed."
    ) : (
      "Submit your tasks to the Task Wall and have your peers vote and give you advice."
    );

  return <div>{renderBody}</div>;
};

export default LandingHeroLeftBody;
