const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  watch: false,

  entry: './configurationLoader.ts',

  output: {
    filename: 'configurationLoader.js'
  },

  resolve: {
    extensions: ['.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin()
  ]
};
