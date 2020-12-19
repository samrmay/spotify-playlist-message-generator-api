import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  songs: [{ String }],
});

export const Word = mongoose.model("word", wordSchema);
