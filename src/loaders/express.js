import express from "express";
import bodyParser from "body-parser";
import routes from "../api";

export default (app) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use("/api", routes());
};
