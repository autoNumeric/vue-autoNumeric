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

config.externals = {
    // This prevent bundling the AutoNumeric library inside the vue-autonumeric component
    // cf. https://webpack.js.org/configuration/externals/
    /*
     * Important note:
     * We need to setup root to use global variable here, since we want the user to be able to just use a
     * CDN link to the AutoNumeric library and make sure `vue-autonumeric` will correctly use this
     * (since it's exported as `AutoNumeric`, with this case).
     *
     * However if you are using `vue-autonumeric` in an ES6 module setup with a bundling tool
     * (ie. Webpack), then it should still import 'autonumeric' with this case from your node_modules.
     */
    autonumeric: {
        commonjs2: 'autonumeric',
        commonjs: 'autonumeric',
        amd: 'autonumeric',
        root: '_', // indicates global variable 'AutoNumeric'
    },
};

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
