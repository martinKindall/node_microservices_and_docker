const redis = require("redis");
const subscriber = redis.createClient({
    host: "redis",
    port: 6379
});

const CHANNEL = "new_orders";

subscriber.on("subscribe", function(channel, count) {
    console.log(`subscribed to ${channel}`);
});

subscriber.on("message", function(channel, message) {
    console.log(`Received message from ${channel}: ${message}`);
});

subscriber.subscribe(CHANNEL);
