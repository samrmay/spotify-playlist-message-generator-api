import fetch from "node-fetch";

export function getTweetById(id) {
  return fetch(process.env.TWITTER_API + "tweets/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + process.env.TWITTER_BEARER_TOKEN,
    },
  }).then((response) => response.json());
}
