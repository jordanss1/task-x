import { sidebarItems } from "../components/landing/content";

type SetHeroIntervalType = (
  setHero: React.Dispatch<
    React.SetStateAction<"Welcome" | "Prioritize" | "Popular">
  >,
  currentIndex?: number,
  speed?: React.MutableRefObject<string>
) => NodeJS.Timer;

const setHeroInterval: SetHeroIntervalType = (setHero, currentIndex, speed) => {
  let index: number = currentIndex ?? 0;

  const stateValues = sidebarItems.map(({ heading }) => heading);

  return setInterval(() => {
    if (speed) speed.current = "slow";

    index = index < stateValues.length - 1 ? index + 1 : 0;

    setHero(stateValues[index]);
  }, 4500);
};

export default setHeroInterval;
