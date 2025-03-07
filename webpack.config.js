const path = require( 'path' );

module.exports = {
    target: "web",
    entry: './src/index.js',
    output: {
        filename: 'monipy.min.js',
        path: path.resolve( __dirname, 'dist' ),
        libraryTarget: 'var',
        library: 'MONIPY'
    },
    devServer: {
        static: path.resolve( __dirname, "dist" ),
        compress: true,
        open: true,
        port: 9001,
        hot: true
    }
};