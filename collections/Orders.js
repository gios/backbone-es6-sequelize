/* global Orders:true, SimpleSchema */

Orders = new Mongo.Collection('orders');

Orders.attachSchema(new SimpleSchema({
    "name": {
        type: String,
        label: "Ім'я товару",
        max: 20
    },
    "count": {
        type: Number,
        label: "Кількісь товарів"
    },
    "price": {
        type: Number,
        label: "Ціна",
        min: 0
    },
    "createdAt": {
        type: Date,
        label: "Дата замовлення"
    },
}));