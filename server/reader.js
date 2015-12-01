var CATEGORIES_PAHT = '/api/categories.json';

exports.getCategories = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + CATEGORIES_PAHT);
    console.log('Send ' + CATEGORIES_PAHT);
};