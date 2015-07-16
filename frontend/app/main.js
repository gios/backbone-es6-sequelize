import $ from "jquery";
import _ from "lodash";
import Backbone from "backbone";
Backbone.$ = $;
import Marionette from "backbone.marionette";
import contactListItem from "./templates/contact_list_item.tpl";

$(document).ready(function() {
  "use strict";

  let ContactManager = new Marionette.Application();

  ContactManager.Contact = Backbone.Model.extend({});

  ContactManager.ContactCollection = Backbone.Collection.extend({
    model: ContactManager.Contact,
    comparator: (contact) => {
      return contact.get("firstName") + " " + contact.get("lastName");
    }
  });

  ContactManager.ContactItemView = Marionette.ItemView.extend({
    tagName: "li",
    template: _.template(contactListItem)
  });

  ContactManager.ContactsView = Marionette.CollectionView.extend({
    tagName: "ul",
    childView: ContactManager.ContactItemView
  });

  ContactManager.on("before:start", () => {
    let RegionContainer = Marionette.LayoutView.extend({
      el: "#app-container",
      regions: {
        main: "#main-region"
      }
    });
    ContactManager.regions = new RegionContainer();
  });

  ContactManager.on("start", () => {
    let contacts = new ContactManager.ContactCollection([
      {
        firstName: "Alice",
        lastName: "Tampen"
      },
      {
        firstName: "Bob",
        lastName: "Brigham"
      },
      {
        firstName: "Alice",
        lastName: "Artsy"
      },
      {
        firstName: "Alice",
        lastName: "Arten"
      },
      {
        firstName: "Charlie",
        lastName: "Campbell"
      },
      {
        firstName: "Alice",
        lastName: "Smith"
      },
    ]);

    let contactsListView = new ContactManager.ContactsView({
      collection: contacts
    });

    ContactManager.regions.main.show(contactsListView);
  });

  ContactManager.start();
});
