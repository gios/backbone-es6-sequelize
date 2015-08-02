import loginTemplate from "./LoginTemplate.tpl";
import loginModel from "./LoginModel.js";

class LoginView extends Backbone.View {

    constructor() {
        super();
        this.setElement($("#login"), true);
        this.template = _.template(loginTemplate);
        this.model = new loginModel();
    }

    initialize() {
        this.events = {
            "click #sign-in": "checkLogin"
        };
    }

    checkLogin(event) {
        event.preventDefault();
        let username = this.$el.find("#input-name").val();
        let password = this.$el.find("#input-password").val();
        let options = {
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify({username, password})
        };
        this.model.fetch(options);
        console.log(this.model);
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

}

export default LoginView;
