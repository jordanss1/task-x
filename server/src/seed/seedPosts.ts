import { fakerEN } from "@faker-js/faker";
import dayjs from "dayjs";
import { config } from "dotenv";
import { createConnection } from "mongoose";
import keys from "../config/keys";
import "../models/PublicTaskList";
import {
  publicTaskListSchema,
  PublicTaskListType,
  publicTaskSchema,
  PublicTaskType,
} from "../models/PublicTaskList";
import "../models/User";
import { userSchema, UserType, ValidUserType } from "../models/User";

config({ path: "../../../.env" });

const faker = fakerEN;

const todoTasks = [
  {
    task: "Buy fruits, vegetables, milk, bread, and eggs from the nearest supermarket.",
    comments: [
      "Don't forget to bring your reusable bags!",
      "Try buying in bulk to reduce waste",
    ],
  },
  {
    task: "Clear pending electricity, water, and internet bills before the due date.",
    comments: [
      "Set up automatic payments to avoid late fees.",
      "Use online billing systems for convenience and ease.",
    ],
  },
  {
    task: "Make an appointment with Dr. Smith for a routine check-up on Friday at 3:00 PM.",
    comments: ["Don't be afraid to ask questions or seek clarification."],
  },
  {
    task: "Research and write a blog post on 'Top 10 Travel Destinations for Summer.'",
    comments: [],
  },
  {
    task: "Give mom a call to catch up and check how she's doing.",
    comments: [
      "Take the time to really listen and engage in conversation.",
      "Make it a regular habit to call and check in.",
      "Write down important dates and milestones to remember during the call.",
    ],
  },
  {
    task: "Repair the kitchen faucet that has been leaking for the past few days.",
    comments: [
      "Make sure to turn off the water supply before starting.",
      "Use appropriate tools and materials.",
      "Follow online tutorials or seek professional help if needed.",
    ],
  },
  {
    task: "Spend an hour reading the latest thriller novel.",
    comments: [
      "Challenge yourself by reading a genre outside your comfort zone.",
    ],
  },
  {
    task: "Go to the yoga studio for a relaxing session at 6:00 PM.",
    comments: [
      "Arrive early to settle and prepare mentally.",
      "Bring a water bottle and towel.",
      "Don't worry about being perfect, focus on your own practice.",
    ],
  },
  {
    task: "Research and plan a weekend trip to a nearby beach or mountain resort.",
    comments: [
      "Check for deals and discounts online.",
      "Make a list of must-see attractions or activities.",
      "Plan a flexible itinerary in case of unexpected changes.",
    ],
  },
  {
    task: "Dedicate a few hours to clean and organize each room of the house.",
    comments: [
      "Break the task into smaller, manageable sections.",
      "Donate or discard items that are no longer needed.",
      "Use storage solutions to maximize space.",
    ],
  },
  {
    task: "Review and update the resume with recent job experiences and skills.",
    comments: [
      "Use action verbs and quantifiable achievements to highlight contributions.",
      "Tailor the resume to each job application.",
      "Have someone else review and provide feedback.",
    ],
  },
  {
    task: "Inquire about the status of a pending loan application by calling the bank.",
    comments: [
      "Prepare necessary documents and information beforehand.",
      "Be polite and professional while speaking to bank representatives.",
      "Ask for clarification or explanation if there is confusion.",
    ],
  },
  {
    task: "Drop off the car at the service center for routine maintenance and oil change.",
    comments: [],
  },
  {
    task: "Begin writing a daily journal to reflect on thoughts, experiences, and goals.",
    comments: [
      "Experiment with different styles and methods of journaling.",
      "Make a commitment to write everyday, even if just for a few minutes.",
      "Reflect on both positive and negative experiences to gain insight.",
    ],
  },
  {
    task: "Spend time exploring different hobbies such as painting, photography, or playing a musical instrument.",
    comments: [
      "Experiment with different mediums or instruments to find what you enjoy most.",
    ],
  },
  {
    task: "Sort and categorize files on the computer for easy access and a clutter-free system.",
    comments: [
      "Create a consistent filing system for different types of files.",
      "Back up important files regularly for safekeeping.",
      "Use computer programs or apps to help manage files.",
    ],
  },
  {
    task: "Spend a few hours helping out at a nearby homeless shelter or animal rescue center.",
    comments: [
      "Research and find reputable organizations that align with your values.",
      "Ask for guidance and training before handling animals or sensitive situations.",
      "Respect privacy and boundaries of those you are helping.",
    ],
  },
  {
    task: "Prepare and cook meals in advance for the upcoming week to save time and eat healthy.",
    comments: [
      "Invest in quality storage containers.",
      "Choose meals that are easy to reheat and transport.",
      "Use fresh, seasonal ingredients for maximum nutrition.",
    ],
  },
  {
    task: "Organize a surprise birthday party for a close friend or family member.",
    comments: [],
  },
  {
    task: "Take the time to write a letter expressing gratitude and love to a special person in your life.",
    comments: [],
  },
  {
    task: "Take a photography class to improve your skills.",
    comments: [],
  },
  {
    task: "Volunteer at a local charity or non-profit organization.",
    comments: ["Celebrate the impact you're making in your community."],
  },
  {
    task: "Start learning a new programming language or coding skill.",
    comments: [
      "Find online tutorials or enroll in coding courses.",
      "Join coding forums or communities to connect with fellow learners.",
      "Build your own projects to apply and solidify your knowledge.",
    ],
  },
  {
    task: "Create a vision board to visualize your goals and aspirations.",
    comments: [
      "Gather images, quotes, and symbols that represent your dreams.",
      "Place your vision board in a visible location to serve as a daily reminder.",
      "Take action steps towards your goals and track your progress.",
    ],
  },
  {
    task: "Take a dance class to learn a new style or improve your technique.",
    comments: [
      "Don't be afraid to embrace your inner rhythm.",
      "Practice regularly to build muscle memory and improve coordination.",
    ],
  },
  {
    task: "Organize a virtual game night with friends or family.",
    comments: [
      "Choose fun multiplayer games that everyone can enjoy.",
      "Set a specific date and time to ensure everyone can participate.",
      "Prepare snacks and beverages to enhance the experience.",
    ],
  },
];

const fakerPosts = async (uri: string) => {
  const db = createConnection(uri);
  const User = db.model("users", userSchema);
  const PublicTaskList = db.model("publicTaskList", publicTaskListSchema);
  const PublicTask = db.model("publicTask", publicTaskSchema);

  await Promise.all(
    todoTasks.map(async ({ task, comments }) => {
      const count = await User.countDocuments().exec();
      const random = Math.floor(Math.random() * count);

      const user = await User.findOne().skip(random).exec();

      const enabledDueDate = faker.datatype.boolean();

      const dueDate = enabledDueDate
        ? faker.date
            .between({
              from: dayjs().subtract(2, "weeks").toDate(),
              to: dayjs().add(2, "weeks").toDate(),
            })
            .toISOString()
        : null;

      const taskLikes: { likes: number; users: UserType["profile"][] } = {
        likes: faker.number.int({ max: 120, min: 0 }),
        users: [],
      };

      if (taskLikes.likes) {
        await new Promise(async (resolve) => {
          for (let step = 0; step < taskLikes.likes; step++) {
            const count = await User.countDocuments().exec();
            const random = Math.floor(Math.random() * count);

            const user = await User.findOne().skip(random).exec();

            taskLikes.users.push(user?.profile);
          }

          resolve("done");
        });
      }

      const commentArray = await Promise.all(
        comments.map(async (comment) => {
          const count = await User.countDocuments().exec();
          const random = Math.floor(Math.random() * count);

          const user = await User.findOne().skip(random).exec();

          const likes: { likes: number; users: UserType["profile"][] } = {
            likes: faker.number.int({ max: taskLikes.likes / 2, min: 0 }),
            users: [],
          };

          if (likes.likes) {
            await new Promise(async (resolve) => {
              for (let step = 0; step < likes.likes; step++) {
                const count = await User.countDocuments().exec();
                const random = Math.floor(Math.random() * count);

                const user = await User.findOne().skip(random).exec();

                likes.users.push(user?.profile);
              }

              resolve("done");
            });
          }

          return {
            comment,
            user: user?.profile,
            likes,
            created: faker.date
              .between({
                from: dayjs(dueDate || undefined)
                  .subtract(3, "weeks")
                  .toDate(),
                to: dayjs(dueDate || undefined)
                  .subtract(2, "days")
                  .toDate(),
              })
              .toISOString(),
          };
        })
      );

      const awards =
        taskLikes.likes >= 25 && taskLikes.likes < 50
          ? ["supported"]
          : taskLikes.likes >= 50 && taskLikes.likes < 100
          ? ["supported", "superSupported"]
          : taskLikes.likes >= 100
          ? ["supported", "superSupported", "communityLegend"]
          : [];

      const created = enabledDueDate
        ? faker.date
            .between({
              from: dayjs(dueDate).subtract(3, "weeks").toDate(),
              to: dayjs(dueDate).subtract(1, "weeks").toDate(),
            })
            .toISOString()
        : faker.date
            .between({
              from: dayjs().subtract(3, "weeks").toDate(),
              to: dayjs().subtract(2, "weeks").toDate(),
            })
            .toISOString();

      const complete = faker.datatype.boolean();

      const publicTask = new PublicTask<PublicTaskType>({
        task: task,
        taskId: faker.string.uuid(),
        user: user?.profile as ValidUserType["profile"],
        enabledDueDate,
        dueDate,
        created,
        awards,
        likes: taskLikes as PublicTaskType["likes"],
        comments: commentArray as any,
        complete,
      });

      const publicTaskList = await PublicTaskList.findOne<PublicTaskListType>({
        _user: user?._user,
      }).exec();

      if (publicTaskList) {
        return await PublicTaskList.findOneAndUpdate(
          { _user: user?._user },
          { $push: { tasks: publicTask }, $inc: { totalTasks: 1 } }
        ).exec();
      }
      return await new PublicTaskList({
        _user: user?._user,
        tasks: [publicTask],
        totalTasks: 1,
      }).save();
    })
  );
};

fakerPosts(process.env.MONGO_URI as string);
fakerPosts(keys.mongoURI);
