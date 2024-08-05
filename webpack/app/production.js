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
  entry: [getConfig('halvesSwiperPath')],
  mode: 'production',
  output: {
    path: getConfig('appBuild'),
    filename: '[name]-[fullhash].js',
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: true,
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: getConfig('appHTMLTemplate'),
      title: getConfig('appName'),
      inject: true,
    }), ,
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
