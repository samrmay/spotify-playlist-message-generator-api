import loadExpress from "./express.js";

export default async (app) => {
  require("dotenv").config();

  console.log("Loading express");
  loadExpress(app);
  console.log("Express loaded");
};
