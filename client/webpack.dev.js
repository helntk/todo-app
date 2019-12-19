const merge = require('webpack-merge');
const path = require('path')
const common = require('./webpack.config');
var HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = merge(common,{
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
        })],
      module:{
       rules:[
        {test: /\.scss$/,
        use: [
            'style-loader',
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

    },
    devServer:{
      port: 9000,

      historyApiFallback: true,
      contentBase: path.resolve(__dirname,'dist')
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
    }
})
