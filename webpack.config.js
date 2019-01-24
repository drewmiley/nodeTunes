const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  return {
    target: "web",
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname),
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
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(env.API_URL)
      }),
      new CopyWebpackPlugin(["src/index.html"])
    ]
  }
};
