import { fakerEN } from "@faker-js/faker";
import { config } from "dotenv";
import { createConnection } from "mongoose";
import keys from "../config/keys";
import "../models/User";
import { UserType, userSchema } from "../models/User";
import profileUrls from "../public/profileIcons/profileUrls";

config({ path: "../../../.env" });

const faker = fakerEN;

const fakerUsers = async (uri: string) => {
  const db = createConnection(uri);
  const User = db.model("users", userSchema);

  let users = [];

  for (let i = 0; i < 100; i += 1) {
    let userName = faker.internet.userName();
    userName = userName.replace(/[^a-zA-Z0-9]/g, "");

    const _user = faker.string.numeric(20);

    const newUser = await new User<UserType>({
      _user,
      profile: {
        _user,
        userName,
        nameLowerCase: userName.toLowerCase(),
        profilePicture: faker.helpers.arrayElement(profileUrls),
      },
    }).save();

    users.push(newUser);
  }

  await User.insertMany(users);
};

fakerUsers(process.env.MONGO_URI as string);
fakerUsers(keys.mongoURI);
