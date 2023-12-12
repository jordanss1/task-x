import { Express } from "express";
import awardUrls from "../public/awards/awardUrls";
import profileUrls from "../public/profileIcons/profileUrls";

const assetsRoutes = (app: Express) => {
  app.get("/assets/profileIcons", (req, res) => {
    res.send(profileUrls);
  });

  app.get("/assets/awards", (req, res) => {
    res.send(awardUrls);
  });
};

export default assetsRoutes;
