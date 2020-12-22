import express from "express";
import {
  getWordEntry,
  postWordEntry,
  deleteWordEntry,
  getWordEntryById,
} from "../services/wordEntry";
import { findExactMatchesToWord } from "../services/spotifySearch";
import { getSingleTrack, getAllTracks } from "../services/spotifyTracks";
import { getAccessToken } from "../services/spotifyAuth";

const route = express.Router();

export default (router) => {
  router.use("/wordEntries", route);

  route.get("/search/:word", async (req, res) => {
    const result = await getWordEntry(req.params.word);
    let id = null;
    if (result.wordEntry) {
      id = result.wordEntry._id;
    }
    return res.status(result.status).send(id || result.error);
  });

  route.get("/singletrack/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("invalid id");
    }

    const wordEntryObj = await getWordEntryById(id);
    const { wordEntry } = wordEntryObj;
    if (!wordEntry) {
      return res.status(wordEntryObj.status).send(wordEntryObj.error);
    }

    const result = await getSingleTrack(wordEntry.tracks);
    if (result) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send("No tracks with that name");
    }
  });

  route.get("/alltracks/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("invalid id");
    }

    const wordEntryObj = await getWordEntryById(id);
    const { wordEntry } = wordEntryObj;
    if (!wordEntry) {
      return res.status(wordEntryObj.status).send(wordEntryObj.error);
    }

    const result = await getAllTracks(wordEntry.tracks);
    if (result) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send("No tracks with that name");
    }
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

    const matchesObj = await findExactMatchesToWord(word, accessToken);
    let { tracks } = matchesObj;
    if (!tracks) {
      return res.status(429).send(matchesObj.error);
    }
    const result = await postWordEntry(word, tracks);
    return res.status(result.status).send(result.wordEntry || result.error);
  });

  route.delete("/:id", async (req, res) => {
    const result = await deleteWordEntry(req.params.id);
    return res.status(result.status).send(result.error || "success");
  });
};
