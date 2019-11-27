module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          loaders: ['style-loader', 'css-loader'],
        },
      ],
    },
};