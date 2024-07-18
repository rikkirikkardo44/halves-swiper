/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: require('core-js/package.json').version,
        },
      ],
      '@babel/react',
      '@babel/preset-typescript',
    ],
    plugins: [
      require.resolve('react-refresh/babel'),
      [
        'babel-plugin-module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
          alias: {
            '^@shared/(.+)': './src/shared/\\1',
            '^@src/(.+)': './src/\\1',
            '^@packageSrc': './package.json',
          },
        },
      ],
    ],
  };
};
