var CATEGORIES_PATH = '/api/categories.json';
var RECIPES_PATH = '/api/recipes/';
var TAGS_PATH = '/api/tags.json';

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
