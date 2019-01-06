Babel: Is a tool that helps you convert your ES6 Syntax into ES5 so that every browser can understand it

To Configure this, i followed these steps:
1 - Add a package.json by doing npm init
2 - Add a babel object to package.json with presets
3 - Do an "npm install babel-cli babel-preset-react babel-preset-env babel-preset-stage-2"
4 - change your "require" syntax code import/export
5 - Also add a script "dev" that reads code through babel
6 - test by running "npm run dev"

Webpack: bundles all the JS files into one and resolve dependencies between them. To Configure this, i followed these 
steps:

1 - Add webpack.config.json
2 - Copy/paste the content from webpack website -> examples -> loaders (you have the file present anyway)
3 - add a script attribute to package.json named webpack. its value should be webpack -wd
4 - it will create a bundle.js file in the specified directory (specified in webpack.config.json)
5 - test by running "npm run webpack"