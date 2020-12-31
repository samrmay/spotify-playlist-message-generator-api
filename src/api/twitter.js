import express from "express";
import { getTweetById } from "../services/twitter";

const route = express.Router();

export default (router) => {
  router.use("/twitter", route);

  route.get("/:id", async (req, res) => {
    const tweet = await getTweetById(req.params.id);
    return res.status(200).send(tweet);
  });
};
