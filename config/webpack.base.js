const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 清理dist
const distDirStr = path.resolve(__dirname, '../dist/');
if (fs.existsSync(distDirStr)) {
    console.log('清理'+ distDirStr + '...');
    fs.readdirSync(distDirStr).map(function(filename) {
        const fileAbsolutePath = path.join(distDirStr, filename);
        if (fs.statSync(fileAbsolutePath).isDirectory()) {
            fs.rmdirSync(fileAbsolutePath, { recursive: true });        
        } else {
            fs.unlinkSync(fileAbsolutePath);
        }
    });
    console.log('清理' + distDirStr +  '...完成。');
}
 
module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js'),
    },
    output: {
        libraryTarget: 'amd',
        library: '[name]',
        path: distDirStr,
        filename: '[name].[hash].js',
        chunkFilename: '[id].chunk.js',
    },
    resolve: {
        alias:{
            require: 'requirejs/require',
            vue: 'vue/dist/vue.js'
        }
    },
    externals : {
        require: 'requirejs/require',
        jquery: 'jQuery',
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: "vue-loader",
            },
            {
                test: /.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /.css$/,
                loader: "css-loader",
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: package.name,
            template: 'src/index.html',
            chunks: ["main"]
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            {
                from: 'node_modules/requirejs/require.js',
                to: 'common/require.js'
            },
            {
                from: 'src/common',
                to: 'common'
            }
        ]),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 9000,
        hot: true,
    }
}