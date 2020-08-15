const { promisify } = require("util");

const redis = require("redis");
const client = redis.createClient({
    host: "redis",
    port: 6379
});

const incrAsync = promisify(client.incr).bind(client);


module.exports = function(app) {
    app.get('/orders', (req, res) => {
        res.json({"message": "I was read!"});
    });
    
    app.post('/orders', (req, res) => {
        const newOrder = req.body;

        incrAsync("fruits")
        .then(reply => {
            res.json({"order": newOrder, "fruits": reply});
        }).catch(err => {
            res.status(500).json({
                "message": `There was a problem: ${JSON.stringify(err)}`});
        });
    });
}
