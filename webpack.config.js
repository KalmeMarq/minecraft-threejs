const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  watch: process.env.NODE_ENV === 'development',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.ts/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader'
            }
          }
        ]
      }
    ]
  }
}