const paths = require('../paths');

module.exports = {
  devServer: {
    port: 3000,
    allowedHosts: ['localhost'],
    open: true,
    client: {
      overlay: true,
    },
    static: [paths.appDist],
    historyApiFallback: true,
    hot: true,
  },
};
