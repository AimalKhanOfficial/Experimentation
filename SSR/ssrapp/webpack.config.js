const path = require('path');

module.exports = {
  entry: './client-entry.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: './public/'
  },
    devtool: 'eval',

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
  node: {
    fs: 'empty'
  },
    module : {
        rules : [
            {
                test: /\.js$/, 
                use: 'babel-loader'
            }
        ]
    }
}