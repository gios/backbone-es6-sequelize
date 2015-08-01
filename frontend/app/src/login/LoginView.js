import loginTemplate from "./LoginTemplate.tpl";
import loginModel from "./LoginModel.js";

class LoginView extends Backbone.View {

    constructor() {
        super();
        this.setElement($('#login'), true);
        this.events = {
            "click #sign-in": function(event) {
                event.preventDefault();
                console.log("hello");
            }
        };
        this.template = _.template(loginTemplate);
        this.model = new loginModel();
    }

    checkLogin(event) {
        console.log(event);
        event.preventDefault();
        let username = this.$el.find("#input-name");
        let password = this.$el.find("#input-password");
        let options = {
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify({username, password})
        };
        this.model.fetch(options);
        console.log("CLICKED");
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

}

export default LoginView;
