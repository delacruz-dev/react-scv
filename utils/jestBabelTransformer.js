module.exports = require('babel-jest').createTransformer({
  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-flow'),
    require.resolve('babel-preset-stage-0'),
    require.resolve('babel-preset-react')
  ],
  plugins: ["react-hot-loader/babel"],
  sourceMap: "inline"
});
