import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api";

export default (app) => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use(express.json());
  app.use(bodyParser.json());
  app.use("/api", routes());
};
