// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
};


// default webpack file preprocessor is good for simple cases
/*
const { onFileDefaultPreprocessor } = require('../../preprocessor/webpack');

module.exports = on => {
    on('file:preprocessor', onFileDefaultPreprocessor);
};
*/

// for more complex cases, when the project already includes webpack.config.js

const { onFilePreprocessor } = require('cypress-vue-unit-test/preprocessor/webpack');
module.exports = on => {
    on('file:preprocessor', onFilePreprocessor('../../../build/webpack.base'));
};
