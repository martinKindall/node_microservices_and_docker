const { promisify } = require("util");
const axios = require('axios').default;

const redis = require("redis");
const publisher = redis.createClient({
    host: "redis",
    port: 6379
});

const CHANNEL = "new_orders";
const publishAsync = promisify(publisher.publish).bind(publisher);


module.exports = function(app) {
    app.get('/orders', (req, res) => {
        axios.get('http://orders-db/orders')
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.json({"error": JSON.stringify(error)});
        });
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
