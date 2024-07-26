const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getConfig = require('./config');

module.exports = {
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(eot|png|ttf|svg|woff|woff2)$/, loader: 'url-loader' },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          { loader: 'file-loader', options: { name: '[path][name].[ext]' } },
          'img-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@shared': getConfig('appShared'),
      '@styles': getConfig('appStyles'),
      '@src': getConfig('appDir'),
      '@packageSrc': getConfig('appPackageJson'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
