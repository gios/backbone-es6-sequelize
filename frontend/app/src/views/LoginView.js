/*jshint esnext: true */
import Backbone from "backbone";
import _ from "lodash";
import loginTemplate from "../templates/LoginTemplate.tpl";

class LoginView extends Backbone.View {

    initialize () {
        this.template = _.template(loginTemplate);
    }

    render () {
        this.$el.html(this.template());
        return this;
    }

}

export default LoginView;
