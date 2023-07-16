module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx','.ts', '.tsx']
    }
};
