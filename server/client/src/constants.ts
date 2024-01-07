import dayjs from "dayjs";
import { Variants } from "framer-motion";
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
  purpleGradients: [
    "linear-gradient(110deg, rgb(0,0,255), rgb(153, 31, 255,.8)",
    "linear-gradient(110deg, rgb(0,0,255), rgb(153, 31, 255,1)",
  ],
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
      profile: {
        userName: "sallyg1997",
        profilePicture: `/api/profileIcons/person-5.svg`,
      },
      userId: "43",
      __v: 233,
      _id: "keji9",
    },
    taskId: "123",
    dueDate: dayjs().subtract(2, "week").toDate().toISOString(),
    enabledDueDate: true,
    complete: false,
    created: dayjs()
      .subtract(2, "days")
      .subtract(12, "hours")
      .toDate()
      .toISOString(),
    likes: 55,
    awards: ["supported", "superSupported"],
    comments: [
      {
        user: {
          __v: 233,
          _id: "keji9",
          userId: "1943",
          profile: {
            userName: "johnnyappleseed",
            profilePicture: `/api/profileIcons/person-4.svg`,
          },
        },
        comment: "Mine is next week also!",
        likes: 2,
        created: dayjs()
          .subtract(1, "days")
          .subtract(12, "hours")
          .toDate()
          .toISOString(),
      },
      {
        user: {
          __v: 233,
          _id: "keji9",
          userId: "309",
          profile: {
            userName: "jonjones22",
            profilePicture: `/api/profileIcons/person-9.svg`,
          },
        },
        comment:
          "I'm looking for a good teacher, anyone know one in the Bradford area?",
        likes: 0,
        created: dayjs()
          .subtract(1, "days")
          .subtract(1, "hours")
          .toDate()
          .toISOString(),
      },
    ],
  },
  {
    task: "Find two more chairs for my first day of work at the salon",
    user: {
      __v: 233,
      _id: "keji9",
      userId: "309",
      profile: {
        userName: "jonjones22",
        profilePicture: `/api/profileIcons/person-9.svg`,
      },
    },
    taskId: "121",
    dueDate: undefined,
    enabledDueDate: false,
    created: dayjs()
      .subtract(5, "days")
      .subtract(3, "hours")
      .toDate()
      .toISOString(),
    complete: false,
    likes: 100,
    awards: ["supported", "superSupported", "communityLegend"],
    comments: [
      {
        user: {
          __v: 233,
          _id: "keji9",
          userId: "43",
          profile: {
            userName: "sallyg1997",
            profilePicture: `/api/profileIcons/person-5.svg`,
          },
        },
        comment: "Good luck I'm sure you will find them :)",
        likes: 10,
        created: dayjs()
          .subtract(3, "days")
          .subtract(3, "hours")
          .toDate()
          .toISOString(),
      },
      {
        user: {
          __v: 233,
          _id: "keji9",
          userId: "2003",
          profile: {
            userName: "fisher5000",
            profilePicture: `/api/profileIcons/person-16.svg`,
          },
        },
        comment: "Where is your salon?",
        likes: 0,
        created: dayjs()
          .subtract(1, "days")
          .subtract(3, "hours")
          .toDate()
          .toISOString(),
      },
    ],
  },
  {
    task: "Take dog to vets",
    taskId: "120",
    user: {
      __v: 233,
      _id: "keji9",
      userId: "2003",
      profile: {
        userName: "fisher5000",
        profilePicture: `/api/profileIcons/person-16.svg`,
      },
    },
    dueDate: dayjs().add(3, "weeks").toDate().toISOString(),
    enabledDueDate: true,
    created: dayjs().subtract(2, "days").add(6, "hours").toDate().toISOString(),
    complete: true,
    likes: 2,
    awards: [],
    comments: [],
  },
  {
    task: "My final exam of the year. Time to study study study!",
    user: {
      __v: 233,
      _id: "keji9",
      userId: "2003",
      profile: {
        userName: "fisher5000",
        profilePicture: `/api/profileIcons/person-16.svg`,
      },
    },
    taskId: "10",
    dueDate: dayjs().add(2, "months").toDate().toISOString(),
    enabledDueDate: true,
    created: dayjs().subtract(5, "days").toDate().toISOString(),
    likes: 20,
    complete: false,
    awards: ["supported"],
    comments: [
      {
        user: {
          userId: "43",
          __v: 233,
          _id: "keji9",
          profile: {
            userName: "sallyg1997",
            profilePicture: `/api/profileIcons/person-5.svg`,
          },
        },
        comment:
          "Let the stress begin to mount haha this year has been crazy. What is your major?",
        likes: 2,
        created: dayjs().subtract(2, "days").toDate().toISOString(),
      },
    ],
  },
];
