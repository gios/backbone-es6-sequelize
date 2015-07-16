console.log("Hello");
import _ from "lodash";
import template from "./templates/template.tpl";
var compiled = _.template(template);
console.log(compiled({firstName: "Gios", lastName: "GG"}));