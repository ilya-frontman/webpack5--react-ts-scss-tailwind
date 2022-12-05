/* eslint-disable no-undef */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpriteLoaderPlugin = require('svg-sprite-loader/plugin');

// merge confgig
const webpackConfig = merge([
  common,
  {
    devServer: {
      static: path.resolve(__dirname, './build'),
      compress: true,
      hot: true,
      port: 3000,
    },

    devtool: 'inline-source-map',

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/[name].css',
      }),
      new SVGSpriteLoaderPlugin({ plainSprite: true }),
    ],

    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]',
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                outputPath: 'svg/',
                publicPath: 'svg/',
                spriteFilename: (svgPath) => `sprite${svgPath.substr(-4)}`,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  },
]);

// include build
module.exports = () => webpackConfig;
