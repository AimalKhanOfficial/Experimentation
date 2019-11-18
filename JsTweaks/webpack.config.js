const path = require('path');

module.exports = {
  entry: './App.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
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