import express from "express";
import spotify from "./spotify";

export default () => {
  const router = express.Router();
  spotify(router);

  return router;
};
