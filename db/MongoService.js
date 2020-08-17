const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://root:example@mongo';

const dbName = 'orders_app';

const insertOrder = function(db, newOrder, callback) {
    const orders = db.collection('orders');
    orders.insert(newOrder, function(err, result) {
        assert.equal(null, err);
        callback(result);
    });
}

function MongoService() {
    this.saveOrder = (order, callback) => {
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            
            const db = client.db(dbName);
            insertOrder(db, order, () => {
                callback();
                client.close();
            });
        });
    };
}

module.exports = {
    MongoService: MongoService
};
