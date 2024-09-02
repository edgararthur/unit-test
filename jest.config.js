module.exports = {
  preset: 'react-native',
  setupFiles: ['Test/jest/setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(json)$': 'json-loader',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-navigation|@react-native|@react-native-community|react-native-paper|mobx-react-lite))',
  ],
};
