import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { connect } from "mongoose";
import keys from "./config/keys";
import "./models/User";
import assetsRoutes from "./routes/assetsRoutes";
import googleAuthRoutes from "./routes/authRoutes";
import "./services/passport";

connect(keys.mongoURI);

const app: Express = express();

app.use("/api", express.static("src/public"));

app.use(helmet());

app.use(cors({ origin: keys.clientUrl }));

app.use(bodyParser.json());

googleAuthRoutes(app);

assetsRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
