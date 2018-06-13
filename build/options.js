/* global module, process, __dirname */

const path    = require('path');
const version = require('../package.json').version;

const banner =
`/**
 * vue-autonumeric v${version} (https://github.com/autoNumeric/vue-autoNumeric)
 * © ${new Date().getFullYear()} Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * Released under the MIT License.
 */`;

module.exports = {
    banner,
    version,
    isProduction: process.env.NODE_ENV === 'production',

    paths: {
        root: path.join(__dirname, '..'),

        src: {
            main    : path.join(__dirname, '..', 'src'),
            examples: path.join(__dirname, '..', 'examples-src'),
        },

        output: {
            main    : path.join(__dirname, '..', 'dist'),
            examples: path.join(__dirname, '..', 'examples/js'),
            examplesBase: path.join(__dirname, '..', 'examples'),
        },

        resolve(location) {
            return path.join(__dirname, '..', location);
        },
    },
};
