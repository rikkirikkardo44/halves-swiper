const { merge } = require('webpack-merge');
const { get } = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const packageJSON = require('../../package.json');

const getPackageConfig = (path, defaultValue = '') =>
  get(packageJSON, path, defaultValue);

const getConfig = require('../config');
const commonConfig = require('../common');

module.exports = merge(commonConfig, {
  entry: [getConfig('appDevIndex')],
  mode: 'production',
  output: {
    path: getConfig('appBuild'),
    filename: '[name]-[fullhash].js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: getConfig('appHTMLTemplate'),
      title: getConfig('appName'),
      inject: true,
    }),
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
