module.exports = {

  js: {
    standart: {
      jquery: "./bower_components/jquery/dist/jquery.js",
      underscore: "./bower_components/underscore/underscore.js",
      backbone: "./bower_components/backbone/backbone.js",
      bootstrap: "./bower_components/bootstrap/dist/js/bootstrap.js"
    },
    standartPaths: function() {
      "use strict";
      return [this.standart.jquery,
              this.standart.underscore,
              this.standart.backbone,
              this.standart.bootstrap];
    },
    minify: {
      jquery: "./bower_components/jquery/dist/jquery.min.js",
      underscore: "./bower_components/underscore/underscore-min.js",
      backbone: "./bower_components/backbone/backbone-min.js",
      bootstrap: "./bower_components/bootstrap/dist/js/bootstrap.min.js"
    },
    minifyPaths: function() {
      "use strict";
      return [this.minify.jquery,
              this.minify.underscore,
              this.minify.backbone,
              this.minify.bootstrap];
    }
  },
  css: {
    standart: {
      bootstrap: "./bower_components/bootstrap/dist/css/bootstrap.css"
    },
    standartPaths: function() {
      "use strict";
      return [this.standart.bootstrap];
    },
    minify: {
      bootstrap: "./bower_components/bootstrap/dist/css/bootstrap.min.css"
    },
    minifyPaths: function() {
      "use strict";
      return [this.minify.bootstrap];
    }
  }
};
