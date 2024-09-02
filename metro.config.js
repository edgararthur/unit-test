const {getDefaultConfig, mergeConfig} = require("@react-native/metro-config");

const {supportSymLinkedModule} = require("./metro-extend");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

function main() {
  supportSymLinkedModule(config);
}

// Main
main();

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
