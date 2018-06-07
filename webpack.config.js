module.exports = {
  watch: false,

  entry: './configurationLoader.ts',

  output: {
    filename: 'dist/configurationLoader.js'
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
