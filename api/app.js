var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

require('./routes')(app);

app.listen(3000, function () {
  console.log('Orders app listening on port 3000!');
});
