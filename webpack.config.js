
let webpackDev = require('./config/webpack.dev');
let webpackProd = require('./config/webpack.prod') ;

let argv = process.argv;
let params = argv.slice(2);
let webpackConf = params.indexOf('--mode=production') > -1 ? webpackProd : webpackDev;

module.exports = {
    ... webpackConf,
}