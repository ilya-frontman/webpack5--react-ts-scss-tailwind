const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// common build
module.exports = {
  entry: './src/index.tsx',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    clean: true,
    asyncChunks: true,
    compareBeforeEmit: false,
    assetModuleFilename: 'assets/',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  resolve: {
    extensions: ['.js', '.scss', '.css', '.sass', '.ts', '.jsx', '.tsx'],
    alias: {
      Scss: path.resolve(__dirname, 'src/scss/'),
      Fonts: path.resolve(__dirname, 'public/fonts'),
      Img: path.resolve(__dirname, 'public/img'),
      Svg: path.resolve(__dirname, 'public/svg'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      title: 'React App',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
