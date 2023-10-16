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

export const contentItems = [
  {
    heading: "Login with Google",
    body: "We take the minimum amount of data to run the service. View our privacy policy.",
    button: true,
  },
  {
    heading: "Order your tasks",
    body: "Create tasks to keep your life organised. Set the date and time it should be completed.",
  },
  {
    heading: "Need motivation?",
    body: "Submit your tasks to the Task Wall and have your peers vote and give you advice.",
  },
];
