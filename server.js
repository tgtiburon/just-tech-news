const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);


// turn on connection to db and server

// force: false tells it to to not DROP tables
// but if we set it true it will drop...good for changing table structures.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});

