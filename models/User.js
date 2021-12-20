const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
// using extends so User inherits all Models functionality
class User extends Model {}


// define table columns and configuration
// pass 2 arguments into the table initialize
// 1. column definitions, 2. config options
User.init(
    {
        //TABLE COLUMN DEFINITIONS WILL GO HERE
        // define id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type:DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` options
            allowNull: false,
            // instruct that this is the Primary key
            primaryKey: true,
            // on auto increment
            autoIncrement: true

        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email value for this table
            unique: true,
            // if allowNull is set to false, we can run our data through validator
            validate: {
                // checks to make sure it follows: <string>@</string>.<string>
                isEmail: true       
            
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least 4 characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)

        // pass in our sequelize connection (the direct connection to our database )
        sequelize,

        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. 'comment_text' and not commentText)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'   

    }
);



 module.exports = User;