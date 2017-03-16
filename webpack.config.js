var webpack = require("webpack");

module.exports = {
  entry: {
    desktop: "./app/root.js"
  },
  output: {
    path: __dirname + "/build",
    filename: 'gazelka-jump.js'
  },
  module: {
    loders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file-loader?name=i/[name]_[md5:hash:base64:8].[ext]'
      }
    ]
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({minimize: true})
  // ]
}