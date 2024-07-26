const { merge } = require('webpack-merge');
const { get } = require('lodash');

const packageJSON = require('../../package.json');

const getPackageConfig = (path, defaultValue = '') =>
  get(packageJSON, path, defaultValue);

const getConfig = require('../config');
const commonConfig = require('../common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(commonConfig, {
  entry: [getConfig('halvesSwiperPath')],
  mode: 'production',
  output: {
    path: getConfig('appDist'),
    filename: 'HalvesSwiper.js',
    library: 'HalvesSwiper',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
