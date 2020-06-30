const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  return {
    target: "web",
    mode: "development",
    devtool: "source-map",
    entry: ["@babel/polyfill", "./src/index.jsx"],
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
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true
      }),
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        { from: 'src/manifest', to: 'manifest' },
        { from: 'src/index.html', to: 'index.html' }
      ])
    ]
  }
};
