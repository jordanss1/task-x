"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
const keys_1 = __importDefault(require("../config/keys"));
require("../models/User");
const User_1 = require("../models/User");
const profileUrls_1 = __importDefault(require("../public/profileIcons/profileUrls"));
(0, dotenv_1.config)({ path: "../../../.env" });
const faker = faker_1.fakerEN;
const fakerUsers = async (uri) => {
    const db = (0, mongoose_1.createConnection)(uri);
    const User = db.model("users", User_1.userSchema);
    let users = [];
    for (let i = 0; i < 100; i += 1) {
        let user = {
            userId: faker.string.numeric(20),
            profile: {
                userName: faker.internet.userName(),
                profilePicture: faker.helpers.arrayElement(profileUrls_1.default),
            },
        };
        users.push(user);
    }
    await User.insertMany(users);
};
fakerUsers(process.env.MONGO_URI);
fakerUsers(keys_1.default.mongoURI);
