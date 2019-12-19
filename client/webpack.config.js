const path = require('path');

module.exports = {
  entry: "./src/index.js",
 
  module: {
    rules: [
      {
         test:/\.js(x*)$/,
         use: {
          loader: 'babel-loader',
         }
      },

      {
        test: /\.html$/,
        use: ["html-loader"]
  
      }

      
    
    ]
  }

};