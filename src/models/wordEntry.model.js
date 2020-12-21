import mongoose from "mongoose";

const wordEntrySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  tracks: [String],
});

export const WordEntry = mongoose.model("wordEntry", wordEntrySchema);
