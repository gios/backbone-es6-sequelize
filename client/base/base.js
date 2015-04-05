'use strict';

var VERSION = '0.0.9';

if (Meteor.isClient) {

    Template.base.helpers({
        getVersion: function () {
            return VERSION;
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