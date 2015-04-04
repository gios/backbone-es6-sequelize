/* global Items:true, Orders:true */

'use strict';

if (Meteor.isClient) {
    Template.baseInfo.helpers({
        items: function () {
            var searchItems = Items.find({}, {
                sort: {
                    createdAt: -1
                }
            });

            var resultArray = [];
            searchItems.forEach(function (post) {
                for (var i in post.items) {
                    if (post.items.hasOwnProperty(i)) {
                        resultArray.push(post.items[i]);
                    }
                }
            });

            return resultArray;
        }
    });

    Template.baseInfo.events({
        'click #removeItem': function () {
            Items.remove(this._id);
        },

        'click #orderItem': function () {
            var searchItem = Items.findOne({
                _id: this._id
            });

            Orders.insert({
                name: searchItem.name,
                count: parseInt(searchItem.count),
                value: parseFloat(searchItem.value)
            });
        },

        'keypress #searchItems': function (event) {
            var searchText = event.target.value;
            console.log(searchText);
        }
    });
}