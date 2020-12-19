import express from "express";
import {
  getWordEntry,
  postWordEntry,
  deleteWordEntry,
  getWordEntryById,
} from "../services/wordEntry";
import { getAccessToken, findExactMatchesToWord } from "../services/spotify";

const route = express.Router();

export default (router) => {
  router.use("/words", route);

  route.get("/search/:word", async (req, res) => {
    const result = await getWordEntry(req.params.word);
    return res.status(result.status).send(result.wordEntry || result.error);
  });

  route.get("/:id", async (req, res) => {
    const result = await getWordEntryById(req.params.id);
    return res.status(result.status).send(result.wordEntry || result.error);
  });

  route.post("/", async (req, res) => {
    const { word } = req.body;
    const token = await getAccessToken();
    const accessToken = token.access_token;

    if (!word) {
      return res.status(400).send("Error");
    }

    const { tracks } = await findExactMatchesToWord(word, accessToken);
    if (tracks == null || tracks.length == 0) {
      return res.status(404).send("Error, no songs found");
    }

    const result = await postWordEntry(word, tracks);
    return res.status(result.status).send(result.wordEntry || result.error);
  });

  route.delete("/:id", async (req, res) => {
    const result = await deleteWordEntry(req.params.id);
    return res.status(result.status).send(result.error || "success");
  });
};
