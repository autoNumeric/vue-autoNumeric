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
        //XXX Note: You need to use `<npmPath>: 'AutoNumeric'` if you want to be able to just use a script CDN link to the AutoNumeric library, since it's exported as `AutoNumeric` (with this case) //FIXME But what happens when the user do not use a script link but directly import 'AutoNumeric' with `import AutoNumeric from 'autonumeric'`?
        /*
         * Important note:
         * We need to use `<npmPath>: 'AutoNumeric'` here since we want the user to be able to just use a
         * CDN link to the AutoNumeric library and make sure `vue-autonumeric` will correctly use this
         * name (since it's exported as `AutoNumeric`, with this case).
         *
         * However if you are using `vue-autonumeric` in an ES6 module setup with a bundling tool
         * (ie. Webpack), then you'll need to declare in your project an alias so that Webpack will know
         * how to recognize the correct library name case.
         *
         * The alias configuration example for Webpack:
         * resolve: {
         *     extensions: ['.js', '.vue', '.json'],
         *     alias     : {
         *         '~'          : resolve('node_modules'),
         *         '@'          : resolve('src'),
         *         'AutoNumeric': resolve('node_modules/autonumeric/dist/autoNumeric.min'),
         *     },
         * },
         */
        autonumeric: 'AutoNumeric',
    },
};
