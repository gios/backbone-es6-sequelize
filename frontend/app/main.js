import Router from './src/routes';

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
