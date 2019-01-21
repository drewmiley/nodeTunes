const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  target: "web",
  mode: "development",
  devtool: "source-map",
  entry: "./index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(["index.html"])
  ]
};
