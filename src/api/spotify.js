import express from "express";
import { getAccessToken, findExactMatchesToWord } from "../services/spotify";
import { saveWord } from "../services/word";

const route = express.Router();

export default (router) => {
  router.use("/spotify", route);

  route.get("/token", async (req, res) => {
    const token = await getAccessToken();
    return res.status(200).send(token);
  });

  route.post("/word", async (req, res) => {
    const { word, token } = req.body;
    if (!word || !token) {
      return res.status(400).send("Error");
    }

    const tracks = await findExactMatchesToWord(word, token);
    if (tracks.length == 0) {
      return res.status(404).send("Error, no songs found");
    }

    console.log(result);
  });
};
