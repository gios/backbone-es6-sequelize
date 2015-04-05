/* global Items:true */

'use strict';

if (Meteor.isServer) {
    Meteor.startup(function () {});

    Router.route('/items', function () {
        Items.update({}, {
            $pull: {
                items: this.request.body
            }
        }, {
            multi: true
        });
    }, {
        where: 'server'
    });
}