import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

module.exports = (options = {}) => {
  const isDevelopment = !options.production;
  return ({
    devtool: isDevelopment ? 'eval' : 'source-map'
    , entry: './app/index.js'
    , output: {
      path: path.resolve(__dirname, 'dist/')
      , publicPath: isDevelopment ? '/' : '/'
      , filename: isDevelopment ? '[name].js' : '[name].[chunkhash].js'
      , chunkFilename: isDevelopment ? '[name].js' : '[name].[chunkhash].js'
    }
    , resolve: {
      extensions: ['.js', '.jsx']
    }
    , target: 'web'
    , stats: false
    , plugins: [
      new HtmlWebpackPlugin({
        template: './app/index.html'
        , inject: true
        , minify: isDevelopment ? false : {
          removeComments: true
          , collapseWhitespace: true
          , removeRedundantAttributes: true
          , useShortDoctype: true
          , removeEmptyAttributes: true
          , removeStyleLinkTypeAttributes: true
          , keepClosingSlash: true
          , minifyJS: true
          , minifyCSS: true
          , minifyURLs: true
        }
      })
      , isDevelopment ? new LiveReloadPlugin() : null
      , isDevelopment ? null : new UglifyJSPlugin()
    ].filter(p => !!p)
    , module: {
      rules: [{
        test: /\.js$/
        , exclude: /node_modules/
        , use: {
          loader: 'babel-loader'
          , options: {
            presets: ['es2015', 'stage-2']
          }
        }
      }, {
        test: /(\.css)$/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'}
          , {loader: 'css-loader'}]
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader?minimize=false']
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }]
    }
  })
};