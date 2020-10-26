/**
 * This script runs in CI on vercel. It makes a `.env` file with the necessary values ready for webpack. It runs before builds.
 */

const fs = require("fs");
const path = require("path");

const { CLIENT_ID } = process.env;

if (!CLIENT_ID) throw new Error("Spotify Client ID was not defined.");

fs.writeFileSync(path.join(__dirname, ".env"), `CLIENT_ID=${CLIENT_ID}`);
