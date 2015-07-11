var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var csso = require("gulp-csso");
var autoprefixer = require("autoprefixer-core");
var less = require("gulp-less");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();

gulp.task("babelify", function () {
  "use strict";
  return gulp.src("app/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("production.js"))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(babel({
      blacklist: ["strict"]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("babelify:build", function () {
  "use strict";
  return gulp.src("app/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("production.min.js"))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(babel({
      blacklist: ["strict"]
    }))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("less", function () {
  "use strict";
  return gulp.src("app/styles/**/*.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat("production.css"))
    .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("less:build", function () {
  "use strict";
  return gulp.src("app/styles/**/*.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat("production.min.css"))
    .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
    .pipe(sourcemaps.write())
    .pipe(csso())
    .pipe(gulp.dest("dist"));
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
    gulp.watch("app/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["browser-sync", "babelify", "less"]);
gulp.task("build", ["babelify:build", "less:build"]);
