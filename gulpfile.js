var gulp = require("gulp"),
    gutil = require("gulp-util"),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    webpackConfig = require("./webpack.config.js"),
    WebpackDevServerConfig =  require("./webpack_server.config.js");

gulp.task("webpack", function(callback) {

    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {

    var compiler = webpack(WebpackDevServerConfig);

    new WebpackDevServer(compiler).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        // callback();
    });
});
