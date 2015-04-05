/* global Items:true, SimpleSchema */

Items = new Mongo.Collection('items');

Items.attachSchema(new SimpleSchema({
    "invoice": {
        type: String,
        label: "Invoice number",
        max: 20
    },
    "createdAt": {
        type: Date,
        label: "Date of purchase"
    },
    "items": {
        type: Array,
        optional: true,
        minCount: 0,
        maxCount: 5
    },
    "items.$": {
        type: Object
    },
    "items.$.name": {
        type: String,
        label: "Items name",
        max: 20
    },
    "items.$.count": {
        type: Number,
        label: "Number of items"
    },
    "items.$.price": {
        type: Number,
        label: "Price",
        min: 0
    }
}));