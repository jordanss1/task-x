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

export const contentItems = [
  {
    heading: "Todo famous?",
    body: "Submit your todos to the Wall of Todos and have your peers vote on your everyday tasks.",
  },
  {
    heading: "Order your todos",
    body: "Create todos to keep your life organised. Even time will learn to obey you!",
  },
  {
    heading: "Login with Google",
    body: " We take the minimum amount of data to run the service. View our privacy policy.",
    button: true,
  },
];
