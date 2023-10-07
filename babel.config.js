module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          App: './App',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
