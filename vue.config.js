const  HtmlWebpackInlineSourcePlugin  = require('html-webpack-inline-source-plugin')
const  HtmlWebpackPlugin  = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  lintOnSave: false,
  publicPath: '/',
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    resolve: {
      extensions: ['*', '.js'],
      modules: [path.resolve(__dirname, 'node_modules')]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'output.html', // the output file name that will be created
        template: 'src/output-template.html', // this is important - a template file to use for insertion
        inlineSource: '.(js|css)$' // embed all javascript and css inline
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
    ]
  }
}
