const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['public/build']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.html'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'babel-loader', 'html-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ]
  }
};
