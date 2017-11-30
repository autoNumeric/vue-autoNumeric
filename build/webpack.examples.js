/* global module */

const merge   = require('deep-assign');
const webpack = require('webpack');

const options = require('./options');
const base    = require('./webpack.base.js');

// do not exclude the autonumeric in the bundle of the examples page
delete base.externals;

const config = merge(base, {
    entry: options.paths.resolve('examples-src/index.js'),

    output: {
        filename: 'examples.bundle.js',
        path    : options.paths.output.examples,
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),

        // Set the production environment
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            VERSION               : JSON.stringify(options.version),
        }),

        // Minify with dead-code elimination
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
});

module.exports = config;
