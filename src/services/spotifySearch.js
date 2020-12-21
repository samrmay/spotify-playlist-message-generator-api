import fetch from "node-fetch";
import shuffleArr from "./shuffleArr";

export async function findExactMatchesToWord(word, token) {
  // Spotify has no support for exact seaches, so have to make many
  // Requests with different genres to find exact match
  const lowerWord = word.toLowerCase();
  const hipster = [true, false];
  const genres = [
    null,
    "classical",
    "country",
    "experimental",
    "indie rock",
    "jazz",
    "metal",
    "pop",
    "rap",
    "rock",
    "r&b",
    "techno",
    "video game music",
  ];
  shuffleArr(hipster);
  shuffleArr(genres);
  const promises = [];
  for (let i in genres) {
    for (let j in hipster) {
      promises.push(getSongs(lowerWord, token, null, hipster[j], genres[i]));
    }
  }
  const queryResults = await Promise.all(promises);

  let results = [];
  for (let i in queryResults) {
    if (queryResults[i].error) {
      return { error: queryResults[i].error, tracks: null };
    }
    const result = findMatch(lowerWord, queryResults[i].tracks);
    if (result.length > 0) {
      results = results.concat(result);
    }
  }

  // https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
  const uniqueResults = Array.from(new Set(results.map((a) => a.uri))).map(
    (uri) => {
      return results.find((a) => a.uri === uri);
    }
  );

  return { error: false, tracks: uniqueResults };
}

function getSongs(str, token, notArtists = null, hipster = true, genre = null) {
  let query = `q=`;
  if (notArtists) {
    for (let i in notArtists) {
      query = `${query}NOT%20%22${encodeURI(
        notArtists[i].split(" ")[0]
      )}%22%20`;
    }
  }

  query = `${query}track:${encodeURI(`"${str}"`)}`;
  if (genre) {
    query = `${query}%20genre:%22${encodeURI(genre)}%22`;
  }
  if (hipster) {
    query = `${query}%20tag:hipster`;
  }

  query = query + "&type=track&limit=50&include_external=audio";
  return fetch(process.env.SPOTIFY_API + `search?${query}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .catch((response) => {
      return { tracks: null };
    });
}

function findMatch(word, tracks) {
  const results = [];
  if (!tracks) {
    return [];
  }
  for (let i in tracks.items) {
    try {
      const item = tracks.items[i];
      let name = item.name.toLowerCase().replace(/\s\(feat.+\)/, "");
      name = name.replace(/[\.!,()\?]/gi, "");
      name = name.replace(/the /gi, "");
      if (name == word) {
        results.push(item);
      }
    } catch {
      // pass
    }
  }
  return results;
}

function generatePolymorphisms(message) {
  const POLY_DICT = {
    "is a": ["issa"],
    "got to": ["gotta"],
    "i've": ["i have"],
    im: ["i am"],
    "i'm": ["i am"],
    a: ["ay"],
    for: ["4", "foor"],
    to: ["too"],
    2: ["too"],
    the: ["dah", "duh"],
    and: ["anne"],
    be: ["bee"],
    "&": ["anne"],
    have: ["haf", "hav"],
    app: ["application"],
    "you're": ["ur"],
    your: ["ur"],
    in: [""],
    "don't": ["do not"],
    do: ["dew"],
    "doesn't": ["does not"],
    "won't": ["will not"],
  };

  const keys = Object.keys(POLY_DICT);
  for (let i in keys) {
    const key = keys[i];
    const patt = new RegExp(`\\b${key}\\b`, "gi");
    const poly =
      POLY_DICT[key][Math.floor(Math.random() * POLY_DICT[key].length)];
    message = message.replace(patt, poly);
  }
  message = message.replace(/[\.!,()\?:"']/gi, "");
  return message;
}

function parseSequence(message) {
  message = generatePolymorphisms(message.toLowerCase());
  return message.split(" ").filter((item) => item.length > 0);
}
