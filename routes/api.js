const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/todo');

router.get('/todos', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    Todo.find({}, 'action')
        .then(data => res.json(data))
        .catch(next)
    // mongoose.disconnect();
});

router.post('/todos', (req, res, next) => {
    if (req.body.action) {
        Todo.create(req.body)
            .then(data => res.json(data))
            .catch(next)
        // mongoose.disconnect();
    } else {
        res.json({
            error: "The input field is empty"
        })
        // mongoose.disconnect();
    }
});

router.post('/todos/delete/:id', (req, res, next) => {
    Todo.findOneAndDelete({
            "_id": req.params.id
        })
        .then(data => res.json(data))
        .catch(next)
        // mongoose.disconnect();
})

module.exports = router;