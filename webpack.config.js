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
    preLoaders: [{
      test: /\.js?/,
      exclude: __dirname + '/node_modules',
      loader: 'jsxhint-loader?harmony'
    }],
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
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
