/* global Orders:true */

'use strict';

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
    },
    'click #removeOrderItem': function () {
        Orders.remove(this._id);
    }
});