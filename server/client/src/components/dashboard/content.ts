import { ReactElement } from "react";
import Home from "../svg/Home";
import World, { DashButtonPropsType } from "../svg/World";

export const settingsList = [
  { label: "Edit Profile", icon: "fa-solid fa-user", url: "/profile/edit" },
  {
    label: "Sign Out",
    icon: "fa-solid fa-arrow-right-from-bracket",
    url: "/api/logout",
  },
];

export const panelButtons = [
  {
    label: "home",
    path: "/dashboard/home",
    Element: Home,
  },
  { label: "social", path: "/dashboard/social", Element: World },
] as const;

export type PanelButtonType = {
  label: (typeof panelButtons)[number]["label"];
  path: string;
  Element: ({ active, ...props }: DashButtonPropsType) => ReactElement;
};

export const notifications = [];
