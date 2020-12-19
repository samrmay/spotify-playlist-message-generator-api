import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  songs: [{ String }],
});

export const word = mongoose.model("word", wordSchema);
