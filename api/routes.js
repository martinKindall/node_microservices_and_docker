const { promisify } = require("util");

const redis = require("redis");
const publisher = redis.createClient({
    host: "redis",
    port: 6379
});

const CHANNEL = "new_orders";
const publishAsync = promisify(publisher.publish).bind(publisher);


module.exports = function(app) {
    app.get('/orders', (req, res) => {
        res.json({"message": "I was read!"});
    });
    
    app.post('/orders', (req, res) => {
        const newOrder = req.body;

        publishAsync(CHANNEL, JSON.stringify(newOrder))
        .then(reply => {
            res.json({"message": "Order received", "reply": reply});
        }).catch(err => {
            res.status(500).json({
                "message": `There was a problem: ${JSON.stringify(err)}`});
        })
    });
}
