var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var methods = require('./users.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

for (const k of Object.keys(methods)) {
  app.post('/' + k, methods[k])
}

app.listen(3000, function() {
  console.log('Listening...');
});
