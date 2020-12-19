import express from "express";
import { getAccessToken } from "../services/spotify";

const route = express.Router();

export default (router) => {
  router.use("/spotify", route);

  route.get("/token", async (req, res) => {
    const token = await getAccessToken();
    return res.status(200).send(token);
  });
};
