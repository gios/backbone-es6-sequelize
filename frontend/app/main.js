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
    model: ContactManager.Contact
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
        firstName: "Bob",
        lastName: "Brigham",
        phoneNumber: "555-0163"
      },
      {
        firstName: "Alice",
        lastName: "Arten",
        phoneNumber: "555-0184"
      },
      {
        firstName: "Charlie",
        lastName: "Campbell",
        phoneNumber: "555-0129"
      }
    ]);

    let contactsListView = new ContactManager.ContactsView({
      collection: contacts
    });

    ContactManager.regions.main.show(contactsListView);
  });

  ContactManager.start();
});
