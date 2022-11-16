/* eslint-disable no-undef */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');

// merge confgig
const webpackConfig = merge([
  common,
  {
    output: {
      compareBeforeEmit: false,
      filename: 'js/[name].[fullhash].js',
    },

    optimization: {
      minimizer: [
        new ImageMinimizerWebpackPlugin({
          minimizer: {
            implementation: ImageMinimizerWebpackPlugin.imageminMinify,
            options: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                ['imagemin-gifsicle', { interlaced: true }],
                ['imagemin-jpegtran', { quality: 64, progressive: true }],
                ['imagemin-mozjpeg', { quality: 64, progressive: true }],
                ['imagemin-optipng', { optimizationLevel: 5 }],
              ],
            },
          },
        }),
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/[name].[fullhash].css',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[fullhash][ext]',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name].[fullhash][ext]',
          },
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [SvgSpriteHtmlWebpackPlugin.getLoader()],
          generator: {
            filename: 'svg/sprite.[contenthash].svg',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
  },
]);

// include build
module.exports = () => webpackConfig;
