const glob = require('glob')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');


module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|woff2|woff|ttf|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
            }
        ]
    },
    devtool: 'eval',
    externals: {
        'jquery': 'jQuery',
        'wow': 'WOW'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack demo",
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new PurgecssPlugin({
            paths: [
                path.join(__dirname, 'src/index.html')
            ],
            whitelistPatterns: () => [/tns/]
        }),
        new CopyWebpackPlugin([{from: './src/js/wow.js', to: './js/wow.js'}]),

        new CleanWebpackPlugin(['dist'], {root: __dirname, verbose: true, dry: false}),
        
    ]
};