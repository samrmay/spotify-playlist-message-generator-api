import { WordEntry } from "../models/wordEntry.model";

export async function getWordEntry(wordName) {
  const result = await WordEntry.findOne({ word: wordName });

  let error = null;
  let status = 200;
  if (!result) {
    error = "entry could not be found";
    status = 404;
  }
  return { wordEntry: result, error, status };
}

export async function postWordEntry(word, tracks) {
  const wordEntry = await WordEntry.findOne({ word: word });

  if (wordEntry) {
    return {
      wordEntry: wordEntry._id,
      status: 409,
      error: "word entry already exists",
    };
  }

  const trackURIs = tracks.map((item) => item.uri);

  const entry = new WordEntry({ word, tracks: trackURIs });
  entry.save();
  if (entry) {
    return { wordEntry: entry, status: 201, error: null };
  } else {
    return {
      wordEntry: entry,
      status: 409,
      error: "word entry could not be created",
    };
  }
}

export async function deleteWordEntry(id) {
  const deleted = await WordEntry.findByIdAndDelete(id);
  if (deleted) {
    return { error: null, status: 204 };
  } else {
    return { error: "Could not be deleted (may not exist)", status: 409 };
  }
}
