import { parseToken, REDIRECT_URI } from "./config";
import { default as SpotifyWebApi } from "spotify-web-api-js";

const elements = {
  song: document.getElementById("song") as HTMLSpanElement,
} as const;

const token = parseToken();

if (!token) {
  window.location.href = REDIRECT_URI;
  throw 0;
}

const api = new SpotifyWebApi();
api.setAccessToken(token);

const song = {
  name: "",
  artist: "",
};

window.onSpotifyWebPlaybackSDKReady = async () => {
  const player = new Spotify.Player({
    name: "Spotigame",
    getOAuthToken: (cb) => cb(token),
  });

  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("player_state_changed", (state) => {
    song.name = state.track_window.current_track.name;
    song.artist = state.track_window.current_track.artists[0].name;
    elements.song.textContent = song.name;
  });

  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    api.transferMyPlayback([device_id], { play: true });
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  await player.connect();
};