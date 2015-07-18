/*jshint esnext: true */
import $ from "jquery";
import Backbone from "backbone";
import _ from "lodash";
import Router from "./scripts/routers/router.js";
import template from "./templates/template.tpl";

class HomeView extends Backbone.View {

    constructor(option) {
        super(option);
        this.$el = $("#app");
        this.template = _.template(template);
    }

    initialize () {
        console.log(this.$el);
    }

    render () {
        this.$el.html(this.template({firstName: "Paul", lastName: "Gios"}));
        return this;
    }

}

class Application {

    constructor () {
        new Router();
        new HomeView().render();
        Backbone.history.start();
    }

}

$(() => {
  "use strict";
  new Application();
});
