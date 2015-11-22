var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// Temporary
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client'));

app.listen(8000);
console.log('Server is running on port 8000');
