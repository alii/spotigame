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
} as const;
