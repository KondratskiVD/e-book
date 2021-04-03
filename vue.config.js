const webpack = require('webpack')
const path = require('path')

module.exports = {
  publicPath: '/',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: {
      filename: 'css/widget.css'
    }
  },
  configureWebpack: {
    output: {
      filename: 'js/widget.js'
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  }
}
