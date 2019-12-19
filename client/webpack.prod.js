const merge = require('webpack-merge');
const path = require('path')
const common = require('./webpack.config');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = merge(common,{
    mode: 'production',
    optimization:{
        minimizer:[new OptimizeCSSAssetsPlugin,new TerserJSPlugin]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          minify:{
            collapseWhitespace: true
          }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
        ,new CleanWebpackPlugin()
      ],
      
      module:{
       rules:[
        {test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"]
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: 'imgs',
              esModule: false
            }
          }
        }
    ]
    },output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
      }
})