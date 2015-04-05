/* global Items:true, SimpleSchema */

Items = new Mongo.Collection('items');

Items.attachSchema(new SimpleSchema({
    "invoice": {
        type: String,
        label: "Номер накладної",
        max: 20
    },
    "createdAt": {
        type: Date,
        label: "Дата замовлення"
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
        label: "Ім'я товару",
        max: 20
    },
    "items.$.count": {
        type: Number,
        label: "Кількісь товарів"
    },
    "items.$.units": {
        type: String,
        label: "Одиниця виміру",
        allowedValues: [
            "штуки",
            "коробки",
            "рулони",
            "упаковки"
        ],
        autoform: {
            options: [
                {
                    label: "штуки",
                    value: "штуки"
            },
                {
                    label: "коробки",
                    value: "коробки"
            },
                {
                    label: "рулони",
                    value: "рулони"
            },
                {
                    label: "упаковки",
                    value: "упаковки"
            }]
        }
    },
    "items.$.price": {
        type: Number,
        label: "Ціна",
        min: 0
    }
}));