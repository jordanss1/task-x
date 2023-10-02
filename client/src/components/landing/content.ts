export const sidebarItems = [
  {
    heading: "Welcome",
    body: "Learn about Todo World",
  },
  {
    heading: "Prioritize",
    body: "Order your Todos",
  },
  {
    heading: "Popular",
    body: "Wall of Todos",
  },
] as const;

export type SidebarHeadingsType = (typeof sidebarItems)[number]["heading"];

export const stateInterval = (
  setHero: (
    value: React.SetStateAction<"Welcome" | "Prioritize" | "Popular">
  ) => void
) => {
  let index: number = 0;

  const stateValues = sidebarItems.map(({ heading }) => heading);

  return setInterval(() => {
    if (index !== 2) index++;
    else index = 0;

    setHero(stateValues[index]);
  }, 3500);
};
