const webpack = require("webpack");
const refreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	mode: "development",
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	experiments: {
		css: true
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "swc-loader",
						options: {
							sourceMap: true,
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: {
								targets: [
									"chrome >= 87",
									"edge >= 88",
									"firefox >= 78",
									"safari >= 14"
								]
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.ProgressPlugin({}),
		new HtmlWebpackPlugin({
			template: "./index.html"
		}),
		isDev ? new refreshPlugin() : null
	].filter(Boolean)
};
