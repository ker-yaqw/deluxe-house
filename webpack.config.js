module.exports = {
  output: {
    filename: 'main.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
};