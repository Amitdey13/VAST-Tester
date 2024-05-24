const path = require('path');

module.exports = {
    entry: {
        visualAudioPlayer: './src/visualAudioPlayer.js',
        visualAudioVastPlayer: './src/visualAudioVastPlayer.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        fallback: {
            "fs": false,
            "path": false,
            "os": false
        }
    },
};
