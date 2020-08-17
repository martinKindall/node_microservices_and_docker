const redis = require("redis");
const subscriber = redis.createClient({
    host: "redis",
    port: 6379
});

const CHANNEL = "new_orders";

const subscribeToBrokerAndPersistNewOrders = function(dbService) {
    
    subscriber.on("subscribe", function(channel, count) {
        console.log(`subscribed to ${channel}`);
    });
    
    subscriber.on("message", function(channel, message) {
        console.log(`Received message from ${channel}: ${message}`);
        dbService.saveOrder(JSON.parse(message))
        .then(res => {
            console.log("Successfully saved!");
        })
        .catch(err => {
            console.log(`There was an error: ${JSON.stringify(err)}`);
        });
    });
    
    subscriber.subscribe(CHANNEL);
}

module.exports = {
    subscribeToBrokerAndPersistNewOrders: subscribeToBrokerAndPersistNewOrders
};
