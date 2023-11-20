const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: { index: './src/index.jsx' },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	devServer: {
		directory: path.resolve(__dirname, 'public'),
		watch: true,
	  },
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, "src"),
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader',
			},
		],
	},
	devServer: {
        historyApiFallback: true,
    },
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	]
};