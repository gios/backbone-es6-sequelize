import $ from "jquery";
import Backbone from "backbone";
Backbone.$ = $;
import Marionette from "backbone.marionette";
import staticTemplate from "./templates/static_template.tpl";
// import differentStaticTemplate from "./templates/different_static_template.tpl";

$(document).ready(function() {
  "use strict";

  var ContactManager = new Marionette.Application();

  class StaticView extends Marionette.ItemView {
    constructor() {
      super();
      console.log($("#main-region"));
      this.el = "#main-region";
      this.template = staticTemplate;
    }
  }

  ContactManager.on("start", () => {
    let staticView = new StaticView();
    console.log(staticView);
    staticView.render();
  });

  ContactManager.StaticView = Marionette.ItemView.extend({
    el: "#main-region",
    template: staticTemplate
  });

  ContactManager.on("start", function() {
    var staticView = new ContactManager.StaticView();
    console.log(staticView);
    staticView.render();
  });

  ContactManager.start();
});
