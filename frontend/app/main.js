/*jshint esnext: true */
import $ from "jquery";
import Backbone from "backbone";
import Router from "./src/routers/router.js";
import bootstrap from "bootstrap";
console.log(bootstrap);

class Application {

    constructor () {
        new Router();
        Backbone.history.start();
    }

}

$(() => {
  "use strict";
  new Application();
});
