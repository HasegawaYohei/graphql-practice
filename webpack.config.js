const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    app: './src/client/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'src/client/dist'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/public/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    open: true,
    openPage: 'index.html',
    contentBase: path.resolve(__dirname, 'src/client/dist'),
    watchContentBase: true,
    port: 3000
  }
};
