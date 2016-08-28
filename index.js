var express = require('express');
var app = express();
var reader = require('./server/reader.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));

// Temporary
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client'));

app.get('/api/categories', reader.getCategories);
app.get('/api/recipe/:id', reader.getRecipe);
app.get('/api/tags', reader.getTags);
app.post('/api/search', reader.performSearch); // TODO: temp
//app.get('/api/:category/:subcategory', reader.getRecipesPreviews);

app.listen(8000);
console.log('Server is running on port 8000');
