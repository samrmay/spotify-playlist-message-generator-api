import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  tracks: [String],
});

export const WordEntry = mongoose.model("word", wordSchema);
