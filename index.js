/*jshint esversion: 6*/

'use strict';

const express = require('express');
const app = express();
const reader = require('./server/reader.js');
const bodyParser = require('body-parser');

const isProd = process.argv[2] === 'prod';

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

if (isProd) {
    app.use(express.static(__dirname + '/public'));
} else {
    // Mapping between files and their directories (for sourcemaps)
    let stylesMap = new Map([
        ['about', 'about'],
        ['categories', 'category'],
        ['navBar', 'category/navBar'],
        ['recipePreview', 'category/recipePreview'],
        ['stars', 'common/starts'],
        ['mainMenu', 'mainMenu'],
        ['recipe', 'recipe'],
        ['search', 'search']
    ]);

    app.use(express.static(__dirname + '/dist'));
    app.use(express.static(__dirname + '/bower_components'));
    app.use(express.static(__dirname + '/client'));

    stylesMap.forEach((val, key) => {
        app.get(`/source/${key}.styl`, (req, res) => {
            res.sendFile(__dirname + `/client/components/${val}/${key}.styl`);
        });
    });
}

app.get('/api/categories', reader.getCategories);
app.get('/api/recipe/:id', reader.getRecipe);
app.get('/api/tags', reader.getTags);

app.listen(8000);
console.log('Server is running on port 8000');
