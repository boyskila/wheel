var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');
console.log(path.resolve(__dirname, 'bin'));
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: "bundle.js",
		publicPath: '/bin/'
    },
	devServer: {
		contentBase: __dirname,
		open: true,
		port: 3000
	},
	  plugins: [
	    new OpenBrowserPlugin({ url: 'http://localhost:3000' })
	],
	stats: 'errors-only',
	watchOptions: {
		ignored: '/node_modules/'
	}
};
