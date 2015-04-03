/* global Items:true, Orders:true, Requests:true */
(function () {
    'use strict';
    
    Items = new Mongo.Collection('items');
    Orders = new Mongo.Collection('orders');
    Requests = new Mongo.Collection('requests');

    if (Meteor.isClient) {

        Template.baseInfo.helpers({
            items: function () {
                return Items.find({}, {
                    sort: {
                        createdAt: -1
                    }
                });
            }
        });

        Template.baseInfo.events({
            'click #addItem': function (event) {

                var nameInput = $('#nameInput')[0].value,
                    countInput = $('#countInput')[0].value,
                    valueInput = $('#valueInput')[0].value;

                var sName = Items.findOne({
                        name: nameInput
                    }),
                    sValue = Items.findOne({
                        value: parseFloat(valueInput)
                    });

                if ((sName !== undefined) && (sValue !== undefined)) {
                    
                    var searchUnupdatedItem = Items.findOne({
                        name: nameInput
                    });
                    
                    Items.update(searchUnupdatedItem._id, {
                        $inc: {
                            count: parseInt(countInput)
                        }
                    });
                } else if ((sName !== undefined) && (sValue === undefined)) {
                    
                    Items.insert({
                        name: nameInput,
                        count: parseInt(countInput),
                        value: parseFloat(valueInput),
                        createdAt: new Date()
                    });
                } else {
                    Items.insert({
                        name: nameInput,
                        count: parseInt(countInput),
                        value: parseFloat(valueInput),
                        createdAt: new Date()
                    });
                }

                $('#nameInput')[0].value = '';
                $('#countInput')[0].value = '';
                $('#valueInput')[0].value = '';

                event.preventDefault();
            },

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

        Template.order.helpers({
            orderItems: function () {
                return Orders.find({});
            },
            countOrderItems: function () {
                return Orders.find({}).count();
            }
        });

        Template.order.events({
            'click #sendOrder': function () {
                console.log("send!");
            }
        });

        Accounts.ui.config({
            requestPermissions: {},
            extraSignupFields: [{
                fieldName: 'first-name',
                fieldLabel: 'First name',
                inputType: 'text',
                visible: true,
                saveToProfile: true
            }, {
                fieldName: 'last-name',
                fieldLabel: 'Last name',
                inputType: 'text',
                visible: true,
                saveToProfile: true
            }]
        });
    }

    if (Meteor.isServer) {
        Meteor.startup(function () {});
    }
})();