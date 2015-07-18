/*jshint esnext: true */
import Backbone from "backbone";

class Router extends Backbone.Router {

    constructor () {
        super();
        this.routes = {
            '': 'home',
            'resources': 'resources'
        };
    }

    home () {
        console.log('Router#home was called!');
    }

    resources () {
        console.log('Router#resources was called!');
    }

}

export default Router;
