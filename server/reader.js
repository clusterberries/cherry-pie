/*jshint esversion: 6*/

'use strict';

const debug = require('debug')('server:reader');

const CATEGORIES_PATH = '/api/categories.json';
const RECIPES_PATH = '/api/recipes/';
const TAGS_PATH = '/api/tags.json';

exports.getCategories = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + CATEGORIES_PATH);

    debug('Send ' + CATEGORIES_PATH);
};

exports.getRecipe = function (req, res) {
    var path = RECIPES_PATH + req.params.id + '.json';

    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + path);

    debug('Send ' + path);
};

exports.getTags = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + TAGS_PATH);

    debug('Send ' + TAGS_PATH);
};
