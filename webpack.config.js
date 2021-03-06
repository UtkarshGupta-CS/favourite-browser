'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   devtool: 'inline-source-map',
   entry: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'src')
   ],
   output: {
      path: path.join(__dirname, '/dist/'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
         inject: 'body',
         filename: 'index.html'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify('development')
      })
   ],
   module: {
      loaders: [{
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
            "presets": ["react", "es2015"]
         }
      }, {
         test: /\.css$/,
         loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      }]
   }
};