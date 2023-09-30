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
    heading: "Popular!",
    body: "Wall of Todos",
  },
] as const;

export type SidebarHeadingsType = (typeof sidebarItems)[number]["heading"];
