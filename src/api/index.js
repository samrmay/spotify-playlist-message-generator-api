import express from "express";
import spotify from "./spotify";
import wordEntries from "./wordEntries";

export default () => {
  const router = express.Router();

  spotify(router);
  wordEntries(router);

  return router;
};
