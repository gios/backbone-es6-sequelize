var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var uglify = require("gulp-uglify");
var stringify = require('stringify');
var postcss = require("gulp-postcss");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var LessPluginCleanCSS = require("less-plugin-clean-css");
var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefixer = require("autoprefixer-core");
var less = require("gulp-less");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();

gulp.task("babelify", function () {
  "use strict";
  return gulp.src("app/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat("production.js"))
    .pipe(babel({
      blacklist: ["strict"]
    }))
    .pipe(browserify({
      transform: stringify({
        extensions: ['.tpl'], minify: true
      })
    }))
    .pipe(gulp.dest("dist/scripts"))
    .pipe(browserSync.stream());
});

gulp.task("babelify:build", function () {
  "use strict";
  return gulp.src("app/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat("production.min.js"))
    .pipe(babel({
      blacklist: ["strict"]
    }))
    .pipe(browserify({
      transform: stringify({
        extensions: ['.tpl'], minify: true
      })
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("less", function () {
  "use strict";
  return gulp.src("app/styles/**/*.less")
    .pipe(less())
    .pipe(concat("production.css"))
    .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
    .pipe(gulp.dest("dist/styles"))
    .pipe(browserSync.stream());
});

gulp.task("less:build", function () {
  "use strict";
  return gulp.src("app/styles/**/*.less")
    .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [cleancss]
    }))
    .pipe(concat("production.min.css"))
    .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("browser-sync", function() {
  "use strict";
    browserSync.init({
        server: {
            baseDir: "./",
            index: "app/index.html"
        }
    });

    gulp.watch("app/**/*.js", function(e) {
      gutil.log(gutil.colors.bgYellow("JS"), ":: File changed ", gutil.colors.yellow(e.path));
      gulp.start("babelify");
    });

    gulp.watch("app/**/*.less", function(e) {
      gutil.log(gutil.colors.bgYellow("LESS"), ":: File changed ", gutil.colors.yellow(e.path));
      gulp.start("less");
    });

    gulp.watch("app/templates/*.tpl", function(e) {
      gutil.log(gutil.colors.bgYellow("TPL"), ":: File changed ", gutil.colors.yellow(e.path));
      gulp.start("babelify");
    });

    gulp.watch("app/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["browser-sync", "babelify", "less"]);
gulp.task("build", ["babelify:build", "less:build"]);
