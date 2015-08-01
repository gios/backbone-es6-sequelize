class LoginModel extends Backbone.Model {

    constructor() {
        super();
        this.url = "http://localhost:9000/login";
    }

    defaults() {
        return {
            title: '',
            completed: false
        };
    }

}

export default LoginModel;
