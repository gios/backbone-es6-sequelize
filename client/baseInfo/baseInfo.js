/* global Items:true, Orders:true */

'use strict';

if (Meteor.isClient) {

    Template.baseInfo.helpers({
        items: function () {
            var searchItems = Items.find({});

            var resultArray = [];
            searchItems.forEach(function (post) {
                for (var i in post.items) {
                    if (post.items.hasOwnProperty(i)) {
                        resultArray.push(post.items[i]);
                    }
                }
            });

            return resultArray;
        },

        reactiveTableSettings: function () {
            return {
                fields: [{
                        label: "Ім'я товару",
                        key: "name"
                }, {
                        label: "Кількісь товарів",
                        key: "count"
                },
                    {
                        label: "Одиниця виміру",
                        key: "units"
                },
                    {
                        label: "Ціна",
                        key: "price"
                }, {
                        label: 'Дії',
                        tmpl: Template.itemsActions
                }]
            };
        }
    });

    Template.baseInfo.events({
        'click #removeItem': function () {
            HTTP.del('/items', {
                    data: {
                        name: this.name,
                        count: this.count,
                        price: this.price,
                        units: this.units
                    }
                },
                function (error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                    }
                });
        },

        'click #orderItem': function () {
            Orders.insert({
                name: this.name,
                count: this.count,
                price: this.price,
                createdAt: new Date()
            }, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                }
            });
        },

        'click #editItem': function () {
            $('#modalEditItem').modal('show');
        }
    });
}