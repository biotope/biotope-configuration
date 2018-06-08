module.exports = {
  watch: false,
  mode: 'none',

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
  }
};
