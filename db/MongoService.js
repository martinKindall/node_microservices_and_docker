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
    console.log("reading order 2");

    try {
        return orders.find().toArray();
    } catch (error) {
        console.log(error);
        console.log(`the error 2: ${JSON.stringify(error)}`);
    }
};

const establishClientConnectionAndOperate = (operation) => {
    console.log("reading order operating");
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
            console.log(`aca: ${JSON.stringify(err)}`);
            return Promise.reject(err);
        });
};

function MongoService() {
    this.saveOrder = (order) => {
        return establishClientConnectionAndOperate(insertOrderPromise(order));
    };

    this.readOrders = () => {
        console.log("reading order");
        return establishClientConnectionAndOperate(readOrders);
    };
}

module.exports = {
    MongoService: MongoService
};
