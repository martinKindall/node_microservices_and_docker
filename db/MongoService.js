const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:example@mongo';

const dbName = 'orders_app';

const insertOrderPromise = function(newOrder) {
    return (db) => {
        const orders = db.collection('orders');
        return orders.insertOne(newOrder);
    };
}

const readOrders = function(db) {
    const orders = db.collection('orders');
    return orders.find().toArray();
};

const establishClientConnectionAndOperate = (operation) => {
    return MongoClient
        .connect(url)
        .then(client => {
            const db = client.db(dbName);
            return operation(db)
            .finally(() => {
                client.close()
            });
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

function MongoService() {
    this.saveOrder = (order) => {
        return establishClientConnectionAndOperate(insertOrderPromise(order));
    };

    this.readOrders = () => {
        return establishClientConnectionAndOperate(readOrders);
    };
}

module.exports = {
    MongoService: MongoService
};
