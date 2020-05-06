let webpackBase = require('./webpack.base');

module.exports = {
    // mode: 'production',
    devtool: 'cheap-module-source-map',
    ...webpackBase,
}
