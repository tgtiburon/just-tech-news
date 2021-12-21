// import the Sequelize Constructor from the library
//const Sequelize = require('sequelize');

const Sequelize = require('sequelize');

let sequelize;

require('dotenv').config();

// To use JawsDB MySQL on heroku do the following
// If it is deployed it will use heroku's JawsDB
if(process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // if it's local use my db
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306

    });
}

// create the connection to our database, pass in your MySQL information for username and password
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306

// });

module.exports = sequelize;