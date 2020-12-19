import express from "express";
import { getAccessToken, getUserId, getRedirectURI } from "../services/spotify";

const route = express.Router();

export default (router) => {
  router.use("/spotify", route);

  route.get("/token", async (req, res) => {
    const token = await getAccessToken();
    return res.status(200).send(token);
  });

  route.get("/redirect/playlist", async (req, res) => {
    const authURL = getRedirectURI();
    return res.status(200).send(authURL);
  });

  route.get("/userId/:userAccessToken", async (req, res) => {
    const id = await getUserId(req.params.userAccessToken);
    return res.status(200).send(id);
  });
};
