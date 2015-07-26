var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var buffer = require("vinyl-buffer");
var map = require("map-stream");
var uglify = require("gulp-uglify");
var stringify = require("stringify");
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

var checkJsHint = map(function (file) {
    "use strict";
    if (!file.jshint.success) {
        gutil.log(gutil.colors.red("JSHint Failed " + file.path));
    }
});

var checkJsHintBuild = map(function (file) {
    "use strict";
    if (!file.jshint.success) {
        gutil.log(gutil.colors.red("JSHint Failed " + file.path));
        process.exit(1);
    }
});

gulp.task("js-hint", function () {
  "use strict";
  return gulp.src("app/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(checkJsHint);
});

gulp.task("js-hint:build", function () {
  "use strict";
  return gulp.src("app/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(checkJsHintBuild);
});

gulp.task("babelify", function() {
  "use strict";
  return gulp.src("app/**/*.js")
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(babel({
    blacklist: ["strict"]
  }))
  .pipe(concat("production.js"))
  .pipe(browserify({
    transform: stringify({
      extensions: [".tpl"], minify: true
    })
  }))
  .pipe(buffer())
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("dist/src"))
  .pipe(browserSync.stream());
});

gulp.task("babelify:build", function() {
  "use strict";
  gutil.log(gutil.colors.bgYellow(":: BUILD JS ::"));
  return gulp.src("app/**/*.js")
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(babel({
    blacklist: ["strict"]
  }))
  .pipe(concat("production.min.js"))
  .pipe(browserify({
    transform: stringify({
      extensions: [".tpl"], minify: true
    })
  }))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("dist/build/src"));
});

gulp.task("less", function () {
  "use strict";
  return gulp.src("app/styles/**/*.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat("production.css"))
    .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/styles"))
    .pipe(browserSync.stream());
});

gulp.task("less:build", function () {
  "use strict";
  gutil.log(gutil.colors.bgBlue(":: BUILD LESS ::"));
  return gulp.src("app/styles/**/*.less")
    .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [cleancss]
    }))
    .pipe(concat("production.min.css"))
    .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/build/styles"));
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
     gulp.start("js-hint");
     gulp.start("babelify");
   });

   gulp.watch("app/styles/**/*.less", function(e) {
     gutil.log(gutil.colors.bgBlue("LESS"), ":: File changed ", gutil.colors.blue(e.path));
     gulp.start("less");
   });

   gulp.watch("app/src/templates/*.tpl", function(e) {
     gutil.log(gutil.colors.bgGreen("TPL"), ":: File changed ", gutil.colors.green(e.path));
     gulp.start("babelify");
   });

   gulp.watch("app/*.html").on("change", browserSync.reload);
});

gulp.task("serve", ["browser-sync", "js-hint", "babelify", "less"]);
gulp.task("build", ["js-hint:build", "babelify:build", "less:build"]);
