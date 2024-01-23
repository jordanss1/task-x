export const sidebarItems = [
  {
    heading: "Welcome",
    body: "Learn about Task X",
  },
  {
    heading: "Prioritize",
    body: "Order your Tasks",
  },
  {
    heading: "Popular",
    body: "Task Wall",
  },
] as const;

export type SidebarHeadingsType = (typeof sidebarItems)[number]["heading"];


