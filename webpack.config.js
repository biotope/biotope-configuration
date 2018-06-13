module.exports = {
	mode: 'none',
	entry: './biotopeConfiguration.ts',
	output: {
		filename: 'biotopeConfiguration.js'
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
