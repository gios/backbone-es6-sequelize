import footerTemplate from "./FooterTemplate.tpl";

class FooterView extends Backbone.View {

    initialize() {
        this.$el = $("#footer");
        this.template = _.template(footerTemplate);
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

}

export default FooterView;
