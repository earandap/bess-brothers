const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');

// Get all HTML files
const htmlFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.html'))
  .map(file => new HtmlWebpackPlugin({
    template: `./${file}`,
    filename: file,
    inject: 'body',
    minify: {
      removeComments: true,
      collapseWhitespace: false,
      removeAttributeQuotes: false
    }
  }));

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    ...htmlFiles,
    new CopyPlugin({
      patterns: [
        { from: 'images', to: 'images', noErrorOnMissing: true },
        { from: 'styles.css', to: 'styles.css' },
        { from: 'script.js', to: 'script.js' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
