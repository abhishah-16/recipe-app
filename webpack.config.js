// codelikepro22@gmail.com
module.exports = {
    resolve: {
        fallback: {
            "path": require.resolve("./node_modules/path-browserify"),
            "http": require.resolve("./node_modules/stream-http"),
            "crypto": require.resolve("./node_modules/crypto-browserify"),
            "zlib": require.resolve("./node_modules/browserify-zlib"),
            "stream": require.resolve("./node_modules/stream-browserify")           
        }
    }
}