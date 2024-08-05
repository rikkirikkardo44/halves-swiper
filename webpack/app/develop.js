const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const getConfig = require('../config');
const commonConfig = require('../common');

const config = merge(commonConfig, {
  entry: [getConfig('appDevIndex')],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: getConfig('devServer'),
  output: {
    path: getConfig('appBuild'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: getConfig('appHTMLTemplate'),
      title: getConfig('appName'),
    }),
    new ReactRefreshWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          filter: (filepath) => !filepath.includes('index.html'),
        },
      ],
    }),
  ],
});

module.exports = config;
