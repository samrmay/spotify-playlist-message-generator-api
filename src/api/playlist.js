import express from "express";
import { createPlaylist } from "../services/spotifyPlaylist";
import { getUserId } from "../services/spotifyAuth";

const route = express.Router();

export default (router) => {
  router.use("/playlist", route);

  route.post("/", async (req, res) => {
    const { userAccessToken, tracks, playlistTitle } = req.body;
    const { id } = await getUserId(userAccessToken);
    if (!id) {
      return res.status(404).send("User id not found");
    }
    const result = await createPlaylist(
      playlistTitle,
      tracks,
      userAccessToken,
      id
    );

    if (result.playlist) {
      return res.status(201).send(result.playlist);
    }
    return res.status(400).send(result.error);
  });
};
