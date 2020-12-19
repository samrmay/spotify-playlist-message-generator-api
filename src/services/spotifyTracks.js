import getRandomItem from "./getRandomItem";
import getAccessToken from "./spotifyAuth";

export async function getSingleTrack(trackURIs) {
  const trackURI = getRandomItem(trackURIs);
  const tokenObj = await getAccessToken();
  return searchTrackURI(trackURI, tokenObj.access_token);
}

export async function getAllTracks(trackURIs) {
  const promises = [];
  const tokenObj = await getAccessToken();
  for (let i in trackURIs) {
    promises.push(searchTrackURI(trackURIs[i], tokenObj.access_token));
  }
  return Promise.all(promises);
}

function searchTrackURI(URI, token) {
  return fetch(process.env.SPOTIFY_API + `tracks/${URI}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => response.json());
}
