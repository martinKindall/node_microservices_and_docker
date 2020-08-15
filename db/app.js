const redis = require("redis");
const subscriber = redis.createClient({
    host: "redis",
    port: 6379
});

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://root:example@mongo';

const dbName = 'orders_app';

const CHANNEL = "new_orders";

const insertOrder = function(db, newOrder, callback) {
    const orders = db.collection('orders');
    orders.insert(newOrder, function(err, result) {
        assert.equal(null, err);
        callback(result);
    });
  }

subscriber.on("subscribe", function(channel, count) {
    console.log(`subscribed to ${channel}`);
});

subscriber.on("message", function(channel, message) {
    console.log(`Received message from ${channel}: ${message}`);

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        
        const db = client.db(dbName);
        insertOrder(db, JSON.parse(message), (result) => {
            console.log(`Result: ${JSON.stringify(result)}`);
            client.close();
        });
    });
});

subscriber.subscribe(CHANNEL);
