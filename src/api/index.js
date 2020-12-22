import express from "express";
import spotify from "./spotify";
import wordEntries from "./wordEntries";
import playlist from "./playlist";

export default () => {
  const router = express.Router();

  spotify(router);
  wordEntries(router);
  playlist(router);

  return router;
};
