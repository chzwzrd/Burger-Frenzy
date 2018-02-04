// MODULES/VARIABLES
// =====================================================================================
var express = require('express');
var sequelize = require('sequelize');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var routes = require('./controllers/burgers_controller');

var port = process.env.PORT || 3000;

// require model for syncing
var models = require('./models');

// MIDDLEWARE
// =====================================================================================
var app = express();

// serve static content for the app from the 'public' directory in the application directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// override the POST form action with ?_method=PUT & ?_method=DELETE
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', routes);

// LISTENER
// =====================================================================================
models.sequelize.sync({ force: true }).then(() => {
    models.Burger.bulkCreate([
        {
            burger_name: "The Hulk Hogan",
            devoured: false
        },
        {
            burger_name: "The Cheesy Wheezy",
            devoured: true
        },
        {
            burger_name: "The Veg Wedge",
            devoured: true
        },
        {
            burger_name: "The Macarena",
            devoured: true
        },
        {
            burger_name: "The Croque Monsieur",
            devoured: false
        },
        {
            burger_name: "The Bodega",
            devoured: false
        }
        // {
        //     burger_name: "The Mean Girl",
        //     devoured: true
        // },
        // {
        //     burger_name: "The Dark Knight",
        //     devoured: false
        // }
    ]);
    app.listen(port, (err, res) => {
        if (err) console.error(err);
        console.log(`Listening on port ${port}`);
    });
});