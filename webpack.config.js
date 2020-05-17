const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  devtool: `source-map`,
  entry: `./src/main.js`,
  output: {
    path: path.resolve(__dirname, `public`),
    filename: `bundle.js`
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: true,
    port: 3000
  },
  module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new MomentLocalesPlugin()
    ]
};
