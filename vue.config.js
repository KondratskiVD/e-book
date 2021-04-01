const webpack = require('webpack');

module.exports = {
  publicPath: '/',
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  }
}
