import LoginView from "./login/LoginView";
import NavbarView from "./navbar/NavbarView";
import FooterView from "./footer/FooterView";

class Router extends Backbone.Router {

    constructor () {
        super();
        this.routes = {
            '': 'home',
            'resources': 'resources'
        };
        this._bindRoutes();
    }

    home () {
        new LoginView().render();
        new NavbarView().render();
        new FooterView().render();
        console.log('Router#home was called!');
    }

    resources () {
        console.log('Router#resources was called!');
    }

}

export default Router;
