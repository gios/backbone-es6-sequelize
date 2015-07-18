/*jshint esnext: true */
import $ from "jquery";
import Backbone from "backbone";
import LoginView from "../views/LoginView.js";

class Router extends Backbone.Router {

    constructor () {
        super();
        this.routes = {
            "": "home",
            "resources": "resources"
        };
        this._bindRoutes();
    }

    home () {
        $("#app").html(new LoginView().render().$el);
        console.log("Home");
    }

    resources () {
        console.log("Resources");
    }

}

export default Router;
