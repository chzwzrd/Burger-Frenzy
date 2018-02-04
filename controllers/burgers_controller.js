var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/burgers');
});

router.get('/burgers', (req, res) => {
    models.Burger.findAll({})
    .then(dbBurgers => {
        var hbsObject = { burgers: dbBurgers };
        // console.log(hbsObject);
        res.render('index', hbsObject);
    })
    .catch(err => {
        console.error(err);
        res.send(err);
    });
});

router.post('/api/burgers', (req, res) => {
    models.Burger.create({
        burger_name: req.body.burgerName,
        devoured: req.body.devoured
    })
    .then(newBurger => {
        // send back the ID of the new burger
        res.json(newBurger);
    })
    .catch(err => {
        console.error(err);
        res.send(err);
    });
});

router.put('/api/burgers/:id', (req, res) => {
    var condition = `id = ${req.params.id}`;

    console.log('Condition', condition);

    models.Burger.update({ devoured: req.body.devoured }, { 
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.redirect('/burgers');
            return res.status(200).end();
        }
    })
    .catch(err => {
        console.error(err);
    });
});

module.exports = router;