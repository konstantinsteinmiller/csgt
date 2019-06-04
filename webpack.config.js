const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// import { sass } from 'svelte-preprocess-sass'
const sass = require('svelte-preprocess-sass').sass
console.log('sass: ', sass) // eslint-disable-line
const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true,
						style: sass({ all: true })
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					{ loader: prod
							? MiniCssExtractPlugin.loader
							: 'style-loader'
					},
					{ loader: 'css-loader'		},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('tailwindcss'),
								require('autoprefixer'),
							],
						},
					}
				]
			},
			{
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false: 'source-map'
};
