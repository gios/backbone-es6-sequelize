import navbarTemplate from "./NavbarTemplate.tpl";

class NavbarView extends Backbone.View {

    initialize() {
        this.$el = $("#navbar");
        this.template = _.template(navbarTemplate);
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

}

export default NavbarView;
