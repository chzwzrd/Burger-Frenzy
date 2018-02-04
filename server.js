// MODULES/VARIABLES
// =====================================================================================
var express = require('express')
    , sequelize = require('sequelize')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , exphbs = require('express-handlebars')
    , routes = require('./controllers/burgers_controller');

// require model for syncing
var models = require('./models');

// MIDDLEWARE
// =====================================================================================
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// override the POST form action with ?_method=PUT & ?_method=DELETE
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', routes);

// LISTENER
// =====================================================================================
models.sequelize.sync().then(() => {
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
    app.listen(app.get('port'), (err, res) => {
        if (err) console.error(err);
        console.log(`Listening on port ${app.get('port')}`);
    });
});