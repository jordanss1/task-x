import { Express } from "express";

const redirectToClient = (app: Express) => {
  const paths = ["/setup", "/dashboard/home"];

  paths.forEach((path) =>
    app.use(path, (req, res, next) => {
      res.redirect(`http://localhost:5173${path}`);
      next();
    })
  );
};

export default redirectToClient;
