import dayjs from "dayjs";
import { ReactElement } from "react";
import keys from "../../../config/keys";
import { TaskWallTaskType } from "../../../types";
import TaskWallTask from "./TaskWallTask";

const taskWallTasks: TaskWallTaskType[] = [
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

const TaskWall = (): ReactElement => {
  return (
    <section className="flex flex-col gap-8 items-center py-20">
      {taskWallTasks.map((task, i) => (
        <TaskWallTask key={i} task={task} />
      ))}
    </section>
  );
};

export default TaskWall;
