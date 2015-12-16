var express = require('express');
var app = express();
var reader = require('./server/reader.js');

app.use(express.static(__dirname + '/public'));

// Temporary
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client'));

app.get('/api/categories', reader.getCategories);
app.get('/api/recipe/:id', reader.getRecipe);
//app.get('/api/:category/:subcategory', reader.getRecipesPreviews);

app.listen(8000);
console.log('Server is running on port 8000');
