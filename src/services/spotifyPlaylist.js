import fetch from "node-fetch";

export async function createPlaylist(name, tracks, userAccessToken, userId) {
  const playlist = await fetch(
    process.env.SPOTIFY_API + `users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description: `Made with <3 at ${process.env.CLIENT_URL}`,
      }),
    }
  ).then((response) => response.json());

  if (playlist.error) {
    return { error: playlist.error };
  }

  const body = tracks;
  const maxi = Math.ceil(body.length / 100) * 100;
  for (let i = 1; i < maxi; i += 100) {
    const upper = 100 > body.length ? body.length : 100;
    const batch = body.splice(0, upper);
    await fetch(process.env.SPOTIFY_API + `playlists/${playlist.id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: batch }),
    });
  }
  return { error: null, playlist: playlist };
}
