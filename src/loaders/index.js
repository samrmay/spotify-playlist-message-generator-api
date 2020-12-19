import loadExpress from "./express";
import loadMongoose from "./mongoose";

export default async (app) => {
  require("dotenv").config();

  console.log("Loading express");
  loadExpress(app);
  console.log("Express loaded");

  console.log("loading mongoose");
  loadMongoose();
  console.log("Mongoose loaded");
};
