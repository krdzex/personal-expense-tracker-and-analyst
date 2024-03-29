const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "./src/server.js"),
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "main.js"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: ["babel-loader"]
            }
        ]
    }
}