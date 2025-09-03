module.exports = {
    preset: 'react-native',
    setupFiles: [
        './jestSetup.js'
    ],
    transformIgnorePatterns: [
        'node_modules/(?!react-native|@react-native|@react-navigation|@react-native-community|@react-native-async-storage)',
    ],
};
