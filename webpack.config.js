const webpack = require('webpack');
const path = require('path');

const DIST = path.join(__dirname, './react-client/dist');
const SRC = path.join(__dirname, './react-client/src');

module.exports = {
  entry: `${SRC}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST
  },
  module: {
    loaders: [
      {
        include: SRC,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /(\.scss$)/,
        loaders: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'compressed',
            includePaths: ['./node_modules']
          }
        }]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      {
        // IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]',
      }
    ]
  }
}