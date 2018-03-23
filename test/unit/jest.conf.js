const path = require('path');

module.exports = {
    rootDir             : path.resolve(__dirname, '../../'),
    moduleFileExtensions: [
        'js',
        'json',
        // Tell Jest to handle *.vue files
        'vue',
    ],
    // Support the same @ -> src alias mapping in source code
    moduleNameMapper    : {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform           : {
        // Process js with babel-jest
        '^.+\\.js$'  : '<rootDir>/node_modules/babel-jest',
        // Process *.vue files with vue-jest
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    },
    // Serializer for snapshots
    snapshotSerializers : ['<rootDir>/node_modules/jest-serializer-vue'],
    setupFiles          : ['<rootDir>/test/unit/setup'],
    coverageDirectory   : '<rootDir>/test/unit/coverage',
    collectCoverageFrom : [
        'src/**/*.{js,vue}',
        '!src/main.js',
        '!**/node_modules/**',
    ],
};
