var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const BUILD_PATH_REL = 'app/static/bundles/';
const BUILD_PATH_ABS = path.resolve(__dirname, BUILD_PATH_REL);

module.exports = {
  context: __dirname,

  entry: {
    ShortUrls: './app/static/js/short-urls.jsx'
  },

  output: {
    path: BUILD_PATH_ABS,
    filename: "[name]-[chunkhash].js",
  },

  externals: {
    "jquery": "jQuery"
  },

  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' }),
    new CleanWebpackPlugin([BUILD_PATH_REL], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
}
