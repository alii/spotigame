import urlcat from "urlcat";

export const REDIRECT_URI = urlcat("https://accounts.spotify.com/authorize", {
  client_id: process.env.CLIENT_ID,
  redirect_uri: window.location.href,
  response_type: "token",
  scope: [
    "user-read-private",
    "user-read-email",
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ].join(" "),
});

export function parseToken(): string | null {
  const hash = window.location.href.split("#")[1];
  if (!hash) return null;

  const querystring = hash.split("&").map((part) => {
    const [key, value] = part.split("=");
    return { key, value };
  });

  return querystring.find(({ key }) => key === "access_token")?.value || null;
}

export const elements = {
  artist: document.getElementById("artist") as HTMLParagraphElement,
  guess: document.getElementById("guess") as HTMLInputElement,
  points: document.getElementById("points") as HTMLParagraphElement,
} as const;

export type TSong = {
  name: string;
  artist: string;
};

export class State {
  private _points: number = 0;

  private _song: TSong | null = null;

  constructor() {
    this.points = 0;
  }

  get points(): number {
    return this._points;
  }

  set points(newPoints) {
    this._points = newPoints;
    document.body.classList.add("correct");

    elements.guess.value = "";
    elements.guess.disabled = true;
    elements.points.textContent = `You have ${this._points} points`;

    setTimeout(() => {
      document.body.classList.remove("correct");
      elements.guess.disabled = false;
      elements.guess.focus();
    }, 2000);
  }

  get song() {
    return this._song;
  }

  set song(newSong) {
    if (!newSong) {
      throw new Error(`Song must be of type TSong (and not ${typeof newSong})`);
    }

    this._song = newSong;
    elements.artist.innerHTML = `You are listening to a song by <b>${newSong.artist}</b>`;
  }
}
