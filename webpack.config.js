const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const {DefinePlugin} = require("webpack")

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./static/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./main.js",
    path: path.resolve(__dirname, "build")
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
  plugins: [
    htmlPlugin,
    new CopyPlugin({
      patterns: [
        {
          from: "*.css",
          context: path.resolve(__dirname, "static")
        },
        {
          from: "*.ico",
          context: path.resolve(__dirname, "static")
        },
      ]
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.API_URL": JSON.stringify("http://127.0.0.1:3000"),
    }),
  ]
}