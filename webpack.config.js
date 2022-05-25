const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const filename = ext => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`)

const styleLoaders = loader => {
  const loaders = ['css-loader']
  if (isProd) loaders.unshift(MiniCssExtractPlugin.loader)
  if (isDev) loaders.unshift('vue-style-loader')
  if (loader) loaders.push(loader)
  return loaders
}

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  devtool: isDev ? 'source-map' : false,
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@images': path.resolve(__dirname, 'src', 'assets', 'images')
    }
  },
  devServer: {
    port: 3000,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: styleLoaders()
      },
      {
        test: /\.scss$/,
        use: styleLoaders('sass-loader')
      },
      {
        test: /\.(jpg|jpeg|gif|svg|png)$/,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'ts', 'vue']
    })
  ]
}
