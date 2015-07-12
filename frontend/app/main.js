import $ from "jquery";
import Backbone from "backbone";
Backbone.$ = $;
import Marionette from "backbone.marionette";
import staticTemplate from "./templates/static_template.tpl";
import differentStaticTemplate from "./templates/different_static_template.tpl";

$(document).ready(function() {
  "use strict";

  let ContactManager = new Marionette.Application();

  ContactManager.StaticView = Marionette.ItemView.extend({
    template: staticTemplate
  });

  ContactManager.on("before:start", () => {
    let RegionContainer = Marionette.LayoutView.extend({
      el: "#app-container",
      regions: {
        main: "#main-region"
      }
    });
    ContactManager.regions = new RegionContainer();
  });

  ContactManager.on("start", () => {
    let staticView = new ContactManager.StaticView();
    ContactManager.regions.main.show(staticView);
  });

  ContactManager.start();
});
