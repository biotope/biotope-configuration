module.exports = {
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
				use: 'awesome-typescript-loader'
			}
		]
	}
};
