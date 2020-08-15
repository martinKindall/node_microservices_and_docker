const redis = require("redis");
const client = redis.createClient({
    host: "redis",
    port: 6379
});


module.exports = function(app) {
    app.get('/orders', (req, res) => {
        res.json({"message": "I was read!"});
    });
    
    app.post('/orders', (req, res) => {
        const newOrder = req.body;
        client.incr("fruits", (err, reply) => {
            console.log(reply);
        });
        res.json({"order": newOrder, "times": client.get("fruits")});
    });
}
