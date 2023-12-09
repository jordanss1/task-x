import { tr } from "@faker-js/faker";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { connect } from "mongoose";
import keys from "./config/keys";
import getCookies from "./middlewares/getCookies";
import "./models/User";
import assetsRoutes from "./routes/assetsRoutes";
import googleAuthRoutes from "./routes/authRoutes";
import "./services/passport";
import types from "./types/express";

const { mongoURI, clientUrl } = keys;

connect(mongoURI);

const app: Express = express();

app.use("/api", express.static("src/public"));

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(cors({ origin: clientUrl, credentials: true }));

app.use(bodyParser.json());

app.use(getCookies);

googleAuthRoutes(app);

assetsRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
