const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * webpack 插件列表
 * https://www.webpackjs.com/plugins/copy-webpack-plugin/
 */

module.exports = {
  context: path.resolve('./'),
  entry: [
    //'webpack/hot/poll?100', 
    './src/main.ts'
  ],
  watch: false,
  target: 'node',
  //devtool: 'source-map',
  //mode: 'development',
  devtool : false,
  mode: 'production',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'src': path.resolve('src')
    },
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(), 
    new webpack.DefinePlugin({}),
    new CopyWebpackPlugin([
      {from: './configs.json', to: path.join(__dirname, 'dist/configs.json')},
      {from: './secrets/key.pem', to: path.join(__dirname, 'dist/secrets/key.pem')},
      {from: './secrets/cert.pem', to: path.join(__dirname, 'dist/secrets/cert.pem')}
    ]),
  ],
  optimization: {
    minimize: false
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  }
};
