const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/main.tsx",
    output:{
        path: path.resolve(__dirname, "./dist"),
        filename: "build.js",
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new Dotenv(),
    ],
}