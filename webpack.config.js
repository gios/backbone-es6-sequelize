var webpack = require('webpack');

module.exports = {
  entry: "./app/App.js",

  debug: false,
  devtool: false,

  stats: {
    colors: true,
    reasons: false
  },
  output: {
    filename: "public/bundle.js"
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
