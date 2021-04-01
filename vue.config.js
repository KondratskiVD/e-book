const webpack = require('webpack')
const path = require('path')

module.exports = {
  publicPath: '/',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: {
      filename: 'widget.css'
    }
  },
  configureWebpack: {
    output: {
      filename: 'widget.js'
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  }
}
