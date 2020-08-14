var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/orders', (req, res) => {
  res.json({"message": "I was read!"});
});

app.post('/orders', (req, res) => {
  const newOrder = req.body;
  res.json(newOrder);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
