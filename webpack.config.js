const webpack = require('webpack');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const isLocal = slsw.lib.webpack.isLocal;

module.exports = (async () => {
  const accountId = await slsw.lib.serverless.providers.aws.getAccountId();
  return {
    mode: isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        AWS_ACCOUNT_ID: `${accountId}`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            'ts-loader'
          ]
        }
      ]
    },

    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    }
  };
})();