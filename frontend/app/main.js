import Router from './src/routes';

class Application {

    constructor () {
        new Router();
        Backbone.history.start();
    }

}

this.$(() => {
    "use strict";
    new Application();
});
