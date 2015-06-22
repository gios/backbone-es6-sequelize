var webpack = require('webpack');

module.exports = {
  entry: ["webpack/hot/only-dev-server", "./app/App.js"],

  cache: true,
  debug: true,
  devtool: false,

  stats: {
    colors: true,
    reasons: true
  },

  output: {
    path: "/public",
    filename: "/public/bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsx-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
