const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = (env, argv) => {
    const dev = argv.mode !== 'production';
    const config = {
        devtool: dev ? 'source-map' : false,
        mode: dev ? 'development' : 'production',
        entry: {
            'App': [
                __dirname + '/index.js'
            ]
        },
        output: {
            filename: dev ? '[name].js' : '[name].[contenthash].bundle.js',
            chunkFilename: dev ? '[name].js' : '[name].[contenthash].bundle.js',
            publicPath: '/'
        },
        module: {
            rules: [                
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: false }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: __dirname + '/template.html',
                filename: __dirname + '/dist/index.html'
            }),
            new ErrorOverlayPlugin()
        ],
        devServer: {
            bonjour: true,
            historyApiFallback: true,
            host: '0.0.0.0',
            hot: true,
            inline: true
        }
    };

    if (dev) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    } else {
        config.optimization = {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: dev,
                    terserOptions: {
                        output: {
                            comments: /@license/i
                        }
                    },
                    extractComments: true
                })
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        };
    }
    return config;
};
