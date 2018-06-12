const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        publicPath: '/dist/'
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    }
});