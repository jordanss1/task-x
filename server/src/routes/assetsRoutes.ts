import { Express } from "express";
import awardUrls from "../public/awards/awardUrls";
import profileUrls from "../public/profileIcons/profileUrls";

const assetsRoutes = (app: Express) => {
  app.get("/api/assets/profileIcons", (req, res) => {
    res.send(profileUrls);
  });

  app.get("/api/assets/awards", (req, res) => {
    res.send(awardUrls);
  });
};

export default assetsRoutes;
