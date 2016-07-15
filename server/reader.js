var CATEGORIES_PATH = '/api/categories.json';
var RECIPES_PATH = '/api/recipes/';
var TAGS_PATH = '/api/tags.json';
var SEARCH_PATH = '/api/results';

exports.getCategories = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + CATEGORIES_PATH);

    console.log('Send ' + CATEGORIES_PATH);
};

exports.getRecipe = function (req, res) {
    var path = RECIPES_PATH + req.params.id + '.json';

    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + path);

    console.log('Send ' + path);
};

exports.getTags = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + TAGS_PATH);

    console.log('Send ' + TAGS_PATH);
};

exports.performSearch = function (req, res) {
    // req.body.text sort tags indredients categories
    var param = req.body.text === 'наполеон' ? 2 : req.body.sort === 'name' ? 1 : 3;
    var path = SEARCH_PATH + param +'.json'
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + path);

    console.log('Send ' + path);
};