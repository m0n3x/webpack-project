const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


let mode = "development";

if(process.env.NODE_ENV === "production") {
  mode = "production";
}
module.exports = {
  mode: mode,

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
        {
          test: /\.(png|jpg|gif|svg)$/i,
          type: "asset",
        },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, 
            options: { publicPath: "" },
          },
          "css-loader", 
          "sass-loader"]
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
    
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }]
        ]}
      }),
    //new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(), 
    new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
 
  
], 

  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
}