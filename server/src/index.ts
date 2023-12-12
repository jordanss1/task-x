import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import { connect } from "mongoose";
import path from "path";
import keys from "./config/keys";
import getCookies from "./middlewares/getCookies";
import redirectToClient from "./middlewares/redirectToClient";
import "./models/User";
import assetsRoutes from "./routes/assetsRoutes";
import googleAuthRoutes from "./routes/authRoutes";
import "./services/passport";
import types from "./types/express";

const { mongoURI } = keys;

connect(mongoURI);

const app: Express = express();

app.use("/api", express.static("src/public"));

app.use(helmet());

app.use(bodyParser.json());

app.use(getCookies);

if (process.env.NODE_ENV !== "production") {
  redirectToClient(app);
}

googleAuthRoutes(app);

assetsRoutes(app);

if (process.env.NODE_ENV === "production") {
  // express will serve client assets such as
  // main.js or main.css files
  app.use(express.static("client/dist"));

  // express will serve up index.html if it
  // doesn't recognize the route
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../../client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
