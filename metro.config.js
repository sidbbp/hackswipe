// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for Node.js modules that might be used by Supabase
config.resolver.extraNodeModules = {
  // Polyfills for Node.js modules
  stream: require.resolve('stream-browserify'),
  crypto: require.resolve('react-native-crypto'),
  buffer: require.resolve('@craftzdog/react-native-buffer'),
};

// Make sure all file extensions are properly processed
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json', 'mjs'];

// Keep the module cache fresh for hot reloading
config.resetCache = true;

// Optimize for web and mobile compatibility
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true
  }
};

module.exports = config;