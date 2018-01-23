var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')

var outputFolder = path.resolve(__dirname, 'build/')

if (fs.existsSync(outputFolder)) {
  rimraf.sync(outputFolder + '/**')
} else {
  fs.mkdirSync(outputFolder)
}

module.exports = {
  entry: './engine/main.js',
  output: {
    path: outputFolder,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
  }
}
