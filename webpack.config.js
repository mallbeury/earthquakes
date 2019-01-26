var path = require('path');
var hwp = require('html-webpack-plugin');

// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const webpack = require('webpack');

const BABEL_CONFIG = {
  presets: [
    '@babel/env',
    '@babel/react'
  ],
  plugins: [
    '@babel/proposal-class-properties'
  ]
};

const config = {
  mode: 'development',

  entry: path.join(__dirname, '/src/index.js'),

  output: {
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      // Compile ES2015 using babel
      test: /\.js$/,
      include: [resolve('.')],
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: BABEL_CONFIG
      }]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins:[
    new hwp({template:path.join(__dirname, '/src/index.html')})
  ]
};

// Enables bundling against src in this repo rather than the installed version
module.exports = env => env && env.local ?
  require('../webpack.config.local')(config)(env) : config;
