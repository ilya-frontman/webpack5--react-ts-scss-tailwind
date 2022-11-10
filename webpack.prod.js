/* eslint-disable no-undef */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

// merge confgig
const webpackConfig = merge([
  common,
  {
    output: {
      compareBeforeEmit: false,
      filename: 'js/[name].[hash:8].js',
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
                // Svgo configuration here https://github.com/svg/svgo#configuration
                ['svgo'],
              ],
            },
          },
        }),
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/[name].[hash:8].css',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: 'svg/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name].[hash:8][ext]',
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
