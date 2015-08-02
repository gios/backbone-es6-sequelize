class LoginModel extends Backbone.Model {

    constructor() {
        super();
        this.url = "/login";
    }

    defaults() {
        return {
            title: '',
            completed: false
        };
    }

}

export default LoginModel;
