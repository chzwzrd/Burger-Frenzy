var express = require('express');
var burger = require('../models/burger');

var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/burgers');
});

router.get('/burgers', (req, res) => {
    burger.selectAll((data) => {
        var hbsObject = { burgers: data };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger_name', 'devoured'], [req.body.name, req.body.devoured], (result) => {
        // send back the ID of the new burger
        res.send({ id: result.insertId });
    });
});

router.put('/api/burgers/:id', (req, res) => {
    var condition = `id = ${req.params.id}`;

    console.log('Condition', condition);

    burger.updateOne({ devoured: req.body.devoured }, condition, (result) => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.redirect('/burgers');
            return res.status(200).end();
        }
    });
});

module.exports = router;