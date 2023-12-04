import dayjs from "dayjs";
import { Variants } from "framer-motion";
import keys from "./config/keys";
import { TaskWallTaskType } from "./types";

export const colors = {
  whiteShades: ["#f4f0ed", "#e0dcd9", "rgb(224, 220, 217)"],
  purple: "rgb(153, 31, 255)",
  green: "rgb(133, 255, 31)",
  yellow: "rgb(202, 255, 159)",
  buttonGradients: [
    "linear-gradient(120deg, rgb(153, 31, 255, 0) 0%, rgb(153, 31, 255, 0) 20% 60%, rgb(202, 255, 159, 0))",
    "linear-gradient(120deg, rgb(153, 31, 255) 0%, rgb(153, 31, 255) 20% 60%, rgb(202, 255, 159))",
  ],
  hoveredButtonGradient:
    "linear-gradient(120deg, rgb(202, 255, 159) 0%, rgb(153, 31, 255) 30% 70%, rgb(202, 255, 159))",
  tappedButtonGradient:
    "linear-gradient(90deg, rgb(202, 255, 159) 0%, rgb(153, 31, 255) 0% 100%, rgb(202, 255, 159))",

  blackGradient: [
    "linear-gradient(to right, rgb(30, 30, 30,0), rgb(10, 10, 10,0), rgb(30, 30, 30,0))",
    "linear-gradient(to right, rgb(30, 30, 30), rgb(10, 10, 10), rgb(30, 30, 30))",
  ],
};

export const fonts = {
  jura: "'Jura', sans-serif",
  orbitron: "'Orbitron', sans-serif",
  exo: "'Exo 2', sans-serif",
};

export const popoutVariants: Variants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1, transition: { ease: "easeIn" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
};

export const taskWallTasks: TaskWallTaskType[] = [
  {
    task: "Going to take my final driving test! I'm so nervous",
    user: {
      userId: "43",
      userName: "sallyg1997",
      picture: `${keys.server}/api/profileIcons/person-5.svg`,
    },
    id: "123",
    dueDate: dayjs().subtract(2, "week").toDate(),
    enabledDueDate: true,
    created: dayjs().subtract(2, "days").subtract(12, "hours").toDate(),
    likes: 55,
    awards: ["supported", "superSupported"],
    comments: [
      {
        user: {
          userId: "1943",
          userName: "johnnyappleseed",
          picture: `${keys.server}/api/profileIcons/person-4.svg`,
        },
        comment: "Mine is next week also!",
        likes: 2,
      },
      {
        user: {
          userId: "309",
          userName: "jonjones22",
          picture: `${keys.server}/api/profileIcons/person-9.svg`,
        },
        comment:
          "I'm looking for a good teacher, anyone know one in the Bradford area?",
        likes: 0,
      },
    ],
  },
  {
    task: "Find two more chairs for my first day of work at the salon",
    user: {
      userId: "309",
      userName: "jonjones22",
      picture: `${keys.server}/api/profileIcons/person-9.svg`,
    },
    id: "121",
    dueDate: undefined,
    enabledDueDate: false,
    created: dayjs().subtract(5, "days").subtract(3, "hours").toDate(),
    likes: 100,
    awards: ["supported", "superSupported", "communityLegend"],
    comments: [
      {
        user: {
          userId: "43",
          userName: "sallyg1997",
          picture: `${keys.server}/api/profileIcons/person-5.svg`,
        },
        comment: "Good luck I'm sure you will find them :)",
        likes: 10,
      },
      {
        user: {
          userId: "2003",
          userName: "fisher5000",
          picture: `${keys.server}/api/profileIcons/person-16.svg`,
        },
        comment: "Where is your salon?",
        likes: 0,
      },
    ],
  },
  {
    task: "Take dog to vets",
    id: "120",

    user: {
      userId: "2003",
      userName: "fisher5000",
      picture: `${keys.server}/api/profileIcons/person-16.svg`,
    },
    dueDate: dayjs().add(3, "weeks").toDate(),
    enabledDueDate: true,
    created: dayjs().subtract(2, "days").add(6, "hours").toDate(),
    likes: 2,
    awards: [],
    comments: [],
  },
  {
    task: "My final exam of the year. Time to study study study!",
    user: {
      userId: "2003",
      userName: "fisher5000",
      picture: `${keys.server}/api/profileIcons/person-16.svg`,
    },
    id: "10",
    dueDate: dayjs().add(2, "months").toDate(),
    enabledDueDate: true,
    created: dayjs().subtract(5, "days").toDate(),
    likes: 20,
    awards: ["supported"],
    comments: [
      {
        user: {
          userId: "43",
          userName: "sallyg1997",
          picture: `${keys.server}/api/profileIcons/person-5.svg`,
        },
        comment:
          "Let the stress begin to mount haha this year has been crazy. What is your major?",
        likes: 2,
      },
    ],
  },
];
