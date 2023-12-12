import { ReactElement } from "react";
import Home from "../svg/Home";
import World, { DashButtonPropsType } from "../svg/World";

export const settingsList = [
  { label: "Edit Profile", icon: "fa-solid fa-user" },
  {
    label: "Sign Out",
    icon: "fa-solid fa-arrow-right-from-bracket",
  },
];

export const panelButtons = [
  {
    label: "home",
    Element: Home,
  },
  { label: "social", Element: World },
] as const;

export type PanelButtonType = {
  label: (typeof panelButtons)[number]["label"];
  Element: ({ active, ...props }: DashButtonPropsType) => ReactElement;
};

export const notifications = [];
