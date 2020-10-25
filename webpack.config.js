const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./src/app.ts",
  devtool: isDev && "inline-source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new Dotenv(),
  ],
  devServer: {
    hot: true,
    port: 3000,
    inline: true,
    contentBase: "./src",
    watchContentBase: true,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
