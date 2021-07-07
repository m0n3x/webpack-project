const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";

if(process.env.NODE_ENV === "production") {
  mode = "production";
}
module.exports = {
  mode: mode,

  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(), 
    new HtmlWebpackPlugin({
    template: "./src/index.html"
  })], 

  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
}