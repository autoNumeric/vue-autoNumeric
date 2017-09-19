/* global module, require */

const merge   = require('deep-assign');
const webpack = require('webpack');

const options = require('./options');
const base    = require('./webpack.base.js');

const config = merge(base, {
    entry: options.paths.resolve('src/index.js'),

    output: {
        filename      : options.isProduction?'vue-autonumeric.min.js':'vue-autonumeric.js',
        path          : options.paths.output.main,
        library       : 'VueAutonumeric',
        libraryExport : 'default',
        libraryTarget : 'umd',
        umdNamedDefine: true,
    },

    plugins: [
        new webpack.BannerPlugin({
            banner   : options.banner,
            raw      : true,
            entryOnly: true,
        }),
    ],
});

// Debug and production
config.plugins = config.plugins.concat([
    new webpack.LoaderOptionsPlugin({
        minimize: true,
    }),
    new webpack.DefinePlugin({
        VERSION: JSON.stringify(options.version),
    }),
]);

if (options.isProduction) {
    // Production only
    config.plugins = config.plugins.concat([
        // Set the production environment
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),

        // Minify with dead-code elimination
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ]);
}

module.exports = config;
