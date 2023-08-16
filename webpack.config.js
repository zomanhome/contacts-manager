const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./static/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  mode: "development",
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlPlugin]
}