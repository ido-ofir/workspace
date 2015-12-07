var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var open = require('open');

config.entry.app.unshift('webpack/hot/only-dev-server');
config.entry.app.unshift('webpack-dev-server/client?http://localhost:3000');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    proxy: {
      '/actions': {
          target: 'http://localhost:4000'
      },
    },
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:3000');
        // open('localhost:3000');
    });
