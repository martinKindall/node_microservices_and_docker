const TopicSubscriber = require("./TopicSubscriber.js");
const Mongo = require("./MongoService.js");

TopicSubscriber.subscribeToBrokerAndPersistNewOrders(new Mongo.MongoService());
