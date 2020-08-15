//const redis = require("redis");
//const client = redis.createClient();


module.exports = function(app) {
    app.get('/orders', (req, res) => {
        res.json({"message": "I was read!"});
    });
    
    app.post('/orders', (req, res) => {
        const newOrder = req.body;
        res.json(newOrder);
    });
}
