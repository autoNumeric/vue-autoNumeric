/* global module, require, __dirname */

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const options      = require('./options');
const autoprefixer = require('autoprefixer');

module.exports = {
    resolve: {
        modules: [
            options.paths.root,
            options.paths.resolve('node_modules'),
        ],

        alias: {
            src : 'src',
            vue$: 'vue/dist/vue.common.js',
        },

        extensions: ['.js', '.json', '.vue', '.scss'],
    },

    module: {
        rules: [
            {
                test   : /\.(js|vue)$/,
                loader : 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('examples-src')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                },
            },
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                    },
                    postcss: [
                        autoprefixer({
                            browsers: ['last 2 versions', 'Firefox ESR'],
                        }),
                    ],
                },
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },

    // Stats is used to customize Webpack's console output
    // https://webpack.js.org/configuration/stats/
    stats: {
        hash    : false,
        colors  : true,
        chunks  : false,
        version : false,
        children: false,
        timings : true,
    },

    externals: {
        // This prevent bundling the AutoNumeric library inside the vue-autonumeric component
        // cf. https://webpack.js.org/configuration/externals/
        autonumeric: 'AutoNumeric',
    },
};
