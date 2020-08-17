const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://root:example@mongo';

const dbName = 'orders_app';

const insertOrderPromise = function(db, newOrder) {
    const orders = db.collection('orders');
    return orders.insertOne(newOrder);
}

function MongoService() {
    this.saveOrder = (order) => {
        return MongoClient
        .connect(url)
        .then(client => {
            const db = client.db(dbName);
            return insertOrderPromise(db, order)
            .then(res => {
                client.close();
                return Promise.resolve("ok");
            })
            .catch(err => {
                client.close();
                return Promise.reject(err);
            });
        })
        .catch(err => {
            return Promise.reject(err);
        });
    };
}

module.exports = {
    MongoService: MongoService
};
