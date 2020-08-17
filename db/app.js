const TopicSubscriber = require("./TopicSubscriber.js");
const Mongo = require("./MongoService.js");

const dbService = new Mongo.MongoService();
TopicSubscriber.subscribeToBrokerAndPersistNewOrders(dbService);

var express = require('express');
var app = express();

app.get('/orders', (req, res) => {
    dbService.readOrders()
    .then(orders => {
        res.json(orders);
    })
    .catch(err => {
        res.status(500).json({"message": JSON.stringify(err)});
    })
});

app.listen(80, function () {
  console.log('DB microservice listening on port 80!');
});
