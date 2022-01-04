const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const path = require('path');

// setup handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});



const app = express();

const PORT = process.env.PORT || 3001;

// setup app for handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// built-in middle wear.  everything in public is static and can
// be used without specific api calls
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);


// turn on connection to db and server

// force: false tells it to to not DROP tables
// but if we set it true it will drop...good for changing table structures.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});


