// MODULES/VARIABLES
// =====================================================================================
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var routes = require('./controllers/burgers_controller');

var port = process.env.PORT || 3000;

var app = express();

//MIDDLEWARE
// =====================================================================================
// serve static content for the app from the 'public' directory in the application directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// override with POST having ?_method=PUT & ?_method=DELETE
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', routes);

// LISTENER
// =====================================================================================
app.listen(port, (err, res) => {
    if (err) console.error(err);
    console.log(`Listening on port ${port}`);
});