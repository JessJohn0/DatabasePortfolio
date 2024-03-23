// Citation for all of db-connector.js
// Date: 1/12/24
// Copied from
// This code was directly copied from the code given in the exploration. The username, password, and database were changed. 
// Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456203?module_item_id=23809270

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '',
    user            : '',
    password        : '',
    database        : ''
})

// Export it for use in our application
module.exports.pool = pool;
