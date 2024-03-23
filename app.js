/*
    SETUP for a simple web app
*/

/* Citation for the following functions:
Date: 2/29/2024
Copied from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
*/

/* Citation for the following functions:
Date: 2/29/2024
Copied from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database
*/

/* Citation for the following functions:
Date: 2/29/2024
Copied from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/

/* Citation for the following functions:
Date: 2/29/2024
Copied from:
Source URL: https://handlebarsjs.com/guide/block-helpers.html#basic-block-variation
*/

/* Citation for the following functions:
Date: 3/9/2024
Copied from /OR/ Adapted from /OR/ Based on:
Source URL: https://stackoverflow.com/questions/41764373/how-to-register-custom-handlebars-helpers
*/


// Express
var express = require('express');   // We are using the express library for the web server
const path = require('path');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our codeapp.use(express.json())

var helpers = require('handlebars-helpers')();  //Using a handlebars helper

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json());

PORT        = 9152;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars

app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// A handlebars helper to display decimal numbers
var hbs = exphbs.create({});
hbs.handlebars.registerHelper('totalFixed', function(msg) {
   return msg.toFixed(2);
  });

// A handlebars helper for logging to help troubleshoot
hbs.handlebars.registerHelper("log", function(something) {
   console.log(something);
});

/* Citation for the following functions:
Date: 2/29/2024
Adapted from:
Source URL: https://stackoverflow.com/questions/71242969/my-image-does-not-display-when-using-handlebars
This is for getting the schema to display with handlebars.
*/
app.use("/images", express.static(path.join(__dirname, "/public/images")));

/*
    GET ROUTES
*/

/* Citation for the following functions:
Date: 2/29/2024
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
*/

/* Citation for the following functions:
Date: 2/29/2024
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box
*/

/*Citation for the following functions:
Date: 3/05/2024
Adapted from:
Source URL: https://stackoverflow.com/questions/10148856/joining-two-tables-with-nullable-foreign-key
This was used in regards to using left joins for displaying null FK's 
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Render the index page
app.get('/', function(req, res)                 
    {
        res.render('index');      
    });  

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/products', function(req, res)                 
    {
        let query;
        // If nothing is typed into the search bar, execute this query
        if (req.query.name == undefined) 
        {
            query = `
            SELECT
                productID,
                productName,
                description,
                brand,
                listPrice,
                productSize,
                name, 
                category
            FROM Products
            INNER JOIN Suppliers ON Products.supplierID = Suppliers.supplierID
            LEFT JOIN ProductCategories using (productCategoryID) 
            WHERE Products.productCategoryID IS NULL OR Products.productCategoryID IS NOT NULL;
            `;
        }
        else // If something is typed into the search bar, execute this query
        {
            query = `
            SELECT
                productID,
                productName,
                description,
                brand,
                listPrice,
                productSize,
                name, 
                category
            FROM Products
            INNER JOIN Suppliers ON Products.supplierID = Suppliers.supplierID
            LEFT JOIN ProductCategories using (productCategoryID)
            WHERE ( Products.productCategoryID IS NULL OR Products.productCategoryID IS NOT NULL )
            AND name LIKE "%${req.query.name}%";
            `;
            //console.log(query);
        }
        // Pull the name from the supplierID for a dropdown
        const query2 = "SELECT supplierID, name FROM Suppliers;";

        // Pull the category from the productCategoryID for a dropdown
        const query3 = 'SELECT productCategoryID, category AS "category" FROM ProductCategories;'; 
                    // Run the 1st query
                    db.pool.query(query, function(error, rows, fields){
                        if (error) {
                            console.error('Error executing query 1', error);
                            res.status(500).send('Error executing query 1');
                            return;
                        }
                            // Run the 2nd query
                            db.pool.query(query2, (error, sRows, fields) => {
                                if (error) {
                                    console.error('Error executing query 2', error);
                                    res.status(500).send('Error executing query 2');
                                    return;
                                }
                                // Run the 3rd query
                                db.pool.query(query3, (error, pRows, fields) => {
                                    if (error) {
                                        console.error('Error executing query 3', error);
                                        res.status(500).send('Error executing query 3');
                                        return;
                                    }
                                    
                                    const combinedData = {
                                        products: rows,
                                        supplierName: sRows,
                                        productCategory: pRows
                                        };
                                    //console.log(combinedData)

                                    //Render products.hbs and send an object of the query data
                                    res.render('products', {data: combinedData});
        
                                    });
                            
                                });
                        });
                    });
     
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/suppliers', function(req, res)                 
    {
        let query1;
        // If nothing is typed into the search bar, execute this query
        if (req.query.name == undefined)
        {
            query1 = "SELECT * FROM Suppliers;";
        }
        else // If something is typed into the search bar, execute this query
        {
            query1 = `SELECT * FROM Suppliers WHERE name LIKE "%${req.query.name}%"`;
        }
        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            if (error) {
                console.error('Error executing query 1', error);
                res.status(500).send('Error executing query 1');
                return;
              }

            //Render suppliers.hbs and send an object of the query data
            res.render('suppliers', {data: rows});                 
        })     
    }); 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/productCategories', function(req, res)                 
{
    let query1;
    // If nothing is typed into the search bar, execute this query
    if (req.query.category == undefined)
        {
            query1 = "SELECT * FROM ProductCategories;";
        }
        else // If something is typed into the search bar, execute this query
        {
            query1 = `SELECT * FROM ProductCategories WHERE category LIKE "%${req.query.category}%"`;
        }
    
    // Execute the first query
    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        if (error) {
            console.error('Error executing query 1', error);
            res.status(500).send('Error executing query 1');
            return;
          }
        //Render productCategories.hbs and send an object of the query data
        res.render('productCategories', {data: rows});                 
    })     
}); 
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/stores', function(req, res)                 
{
    let query1;

    // If nothing is typed into the search bar, execute this query
    if (req.query.city == undefined)
    {
        query1 = `
            SELECT
                storeID,
                address,
                city,
                state,
                telephone,
                email,
                type
            FROM Stores
            LEFT JOIN LocationTypes using (locationTypeID)
            WHERE Stores.locationTypeID IS NULL OR Stores.locationTypeID IS NOT NULL;
            `;
    }
    else // If something is typed into the search bar, execute this query
    {
        query1 = `
            SELECT
                storeID,
                address,
                city,
                state,
                telephone,
                email,
                type
            FROM Stores
            LEFT JOIN LocationTypes using (locationTypeID)
            WHERE (Stores.locationTypeID IS NULL OR Stores.locationTypeID IS NOT NULL)
            AND city LIKE "%${req.query.city}%";
            `;
    }
    // Pull the type from the locationTypeID for a dropdown
    const query2 = `SELECT locationTypeID, type AS "type" FROM LocationTypes;`;
        db.pool.query(query1, function(error, rows, fields){    // Execute the 1st query
            if (error) {
                console.error('Error executing query 1', error);
                res.status(500).send('Error executing query 1');
                return;
            }
            // 2nd query to populate dropdown for locationTypeID
            db.pool.query(query2, function(sError, sRows, sFields){   
                if (sError) {
                    console.error('Error executing query 2:', sError);
                    res.status(500).send('Error executing query 2');
                    return;
                }
    
                // Combine data from both queries
                const combinedData = {
                  stores: rows,
                  locationType: sRows
                };
            //console.log(combinedData)
            //Render stores.hbs and send an object of the query data
            res.render('stores', { data: combinedData });
        });
      });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/locationTypes', function(req, res)                 
{
    let query1;
    // If nothing is typed into the search bar, execute this query
    if (req.query.type == undefined)
        {
            query1 = "SELECT * FROM LocationTypes;";
        }
        else // If something is typed into the search bar, execute this query
        {
            query1 = `SELECT * FROM LocationTypes WHERE type LIKE "%${req.query.type}%"`;
        }
    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        if (error) {
            console.error('Error executing query 1', error);
            res.status(500).send('Error executing query 1');
            return;
          }
        //Render locationTypes.hbs and send an object of the query data
        res.render('locationTypes', {data: rows});                 
    })     
}); 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/storeProducts', function(req, res)                 
    {
        let query1;
        // If nothing is typed into the search bar, execute this query
        if (req.query.product == undefined)
        {
            query1 = `
            SELECT
	            StoreProducts.storeProductID,
                StoreProducts.quantity,
                StoreProducts.dateOrdered,
                StoreProducts.deliveryDate,
                StoreProducts.totalDue,
                StoreProducts.invoiceDueDate,
                Products.productName AS "productName", 
                Stores.city AS "storeCity"
            FROM 
                StoreProducts
            INNER JOIN 
                Products ON StoreProducts.productID = Products.productID
            INNER JOIN
                Stores ON StoreProducts.storeID = Stores.storeID
            `;
        }
        else // If something is typed into the search bar, execute this query
        {
            query1 = `
            SELECT
                StoreProducts.storeProductID,
                StoreProducts.quantity,
                StoreProducts.dateOrdered,
                StoreProducts.deliveryDate,
                StoreProducts.totalDue,
                StoreProducts.invoiceDueDate,
                Products.productName AS "productName", 
                Stores.city AS "storeCity"
            FROM 
                StoreProducts
            INNER JOIN 
                Products ON StoreProducts.productID = Products.productID
            INNER JOIN
                Stores ON StoreProducts.storeID = Stores.storeID
            WHERE
                Products.productName LIKE "%${req.query.product}%"
            `;
        }
        // A query to get the productName from the productID for a dropdown
        let query2 = "SELECT productID, listPrice, productName FROM Products;";

        // A query to get the city from the storeID for a dropdown
        let query3 = "SELECT storeID, city FROM Stores;";

        // A query to get the storeProductID for a dropdown
        let query4 = "SELECT storeProductID FROM StoreProducts;";

            // Run the 1st query
            db.pool.query(query1, function(error, rows, fields){
        
                // Save the storeProducts
                    let storeProducts = rows;
                
                // Run the 4th query
                    db.pool.query(query4, (error, rows, fields) => {
                    
                    // Save the storeProductID
                        let storeProductID = rows;
        
                        // Run the 2nd query
                        db.pool.query(query2, (error, rows, fields) => {

                            // Save the productNames
                            let productName = rows;

                            // Run the 3rd query 
                            db.pool.query(query3, (error, rows, fields) => {

                                // Save the store cities
                                let storeCity = rows;

                                    //Render storeProducts.hbs and send an object of the query data
                                    return res.render('storeProducts', {data: storeProducts, storeProductID: storeProductID, productName: productName, storeCity: storeCity})

                            })
                    
                        })
                })
            })


            });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    POST ROUTES
*/

/* Citation for the following functions:
Date: 2/29/2024
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

/* Citation for the following functions:
Date: 3/10/2024
Adapted from:
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
This is for allowing null values to be added for an FK for Products and Stores
*/

/* Citation for the following functions:
Date: 3/10/2024
Adapted from:
Source URL: https://umbraco.com/knowledge-base/http-status-codes/
This is for sending a status code so that the program will send a message to the user
since they are trying to add a duplicate unique value
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-product-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let productName = data.productName;
    let description = data.description;
    let brand = data.brand;
    let listPrice = parseFloat(data.listPrice);
    let productSize = data.productSize;
    let supplierID = parseInt(data.supplier);
    let productCategoryID = parseInt(data.productCategory);

    // Run this query if the productCategoryID (an FK) is NULL
    if (isNaN(productCategoryID)) {
        var productCategoryIDNull = null;
        query3 = `INSERT INTO Products (productName, description, brand, listPrice, productSize, supplierID, productCategoryID) VALUES ('${productName}', '${description}', '${brand}', ${listPrice}, '${productSize}', '${supplierID}', ${productCategoryIDNull})`;
        db.pool.query(query3, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else 
            {

                query4 = `SELECT * FROM Products;`;
                db.pool.query(query4, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.redirect('/products');
                }
                })
            }
        })
    }
    else { // Run this query if the value for productCategotyID (an FK) is not null
        query1 = `INSERT INTO Products (productName, description, brand, listPrice, productSize, supplierID, productCategoryID) VALUES ('${productName}', '${description}', '${brand}', ${listPrice}, '${productSize}', '${supplierID}', '${productCategoryID}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else
            {

                query2 = `SELECT * FROM Products;`;
                db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.redirect('/products');
                }
                })
            }
        })
    }

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/add-supplier-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let name = data['name'];
    let address = data['address'];
    let city = data['city'];
    let state = data['state'];
    let telephone = data['telephone'];
    let email = data['email'];

        // Create the query and run it on the database
        query1 = `INSERT INTO Suppliers (name, address, city, state, telephone, email) VALUES ('${name}', '${address}', '${city}', '${state}', '${telephone}', '${email}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else
            {

                query2 = `SELECT * FROM Suppliers;`;
                db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.redirect('/suppliers');
                } 
                })
            }
        })
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-productCategory-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let category = data['category'];

        // Create the query and run it on the database
        query1 = `INSERT INTO ProductCategories (category) VALUES ('${category}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else
            {

                query2 = `SELECT * FROM ProductCategories;`;
                db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.redirect('/productCategories');
                } 
                })
            }
        })
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-store-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let address = data['address'];
    let city = data['city'];
    let state = data['state'];
    let telephone = data['telephone'];
    let email = data['email'];

    let locationTypeID = parseInt(data['locationTypeID']);
    // Run this query if the locationTypeID (an FK) is NULL
    if (isNaN(locationTypeID)) {
        var locationTypeIDNull = null;
        let query1 = `INSERT INTO Stores (address, city, state, telephone, email, locationTypeID) VALUES ('${address}', '${city}', '${state}', '${telephone}', '${email}', ${locationTypeIDNull})`;
        let query2 = 'SELECT * FROM Stores;';
    
        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else
            {
                // Run the second query
                db.pool.query(query2, function(error, rows, fields) {
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        //res.send(rows);
                        res.redirect('/stores');
                    }
                })
            }
    
         })
    }
    else { // Run this query if the value for locationTypeID (an FK) is not null
        let query3 = `INSERT INTO Stores (address, city, state, telephone, email, locationTypeID) VALUES ('${address}', '${city}', '${state}', '${telephone}', '${email}', '${locationTypeID}')`;
        let query4 = 'SELECT * FROM Stores;';
    
        // Run the 1st query
        db.pool.query(query3, function(error, rows, fields){
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else
            {
                // Run the second query
                db.pool.query(query4, function(error, rows, fields) {
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
    
         })
    }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-locationType-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let type = data['type'];
    let description = data['description'];

        // Create the query and run it on the database
        query1 = `INSERT INTO LocationTypes (type, description) VALUES ('${type}', '${description}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else
            {

                query2 = `SELECT * FROM LocationTypes;`;
                db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.redirect('/locationTypes');
                } 
                })
            }
        })
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-storeProduct-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object

    let data = req.body;

    let quantity = data['quantity'];
    let dateOrdered = data['dateOrdered'];
    let deliveryDate = data['deliveryDate'];
    let invoiceDueDate = data['invoiceDueDate'];
    let storeID = data['storeID'];
    let [productID, listPrice] = data['productID'].split(' ');
    const totalDue = (quantity * listPrice);

        // Create the query and run it on the database

        let query1 = `INSERT INTO StoreProducts (quantity, dateOrdered, deliveryDate, totalDue, invoiceDueDate, productID, storeID) VALUES ('${quantity}', '${dateOrdered}', '${deliveryDate}', '${totalDue}', '${invoiceDueDate}', '${productID}', '${storeID}')`;
        let query2 = `SELECT * FROM StoreProducts`;

        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {

                db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.redirect('/storeProducts');
                }
                })
            }
        })
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    DELETE ROUTES
*/

/*Citation for the following functions:
Date: 2/29/2024
Copied from /OR/ Adapted from /OR/ Based on:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    app.delete('/delete-product-form/', function(req,res,next){

        let data = req.body;
        let productID = parseInt(data.id);

        let deleteProduct = `DELETE FROM Products WHERE productID = ?`;

        db.pool.query(deleteProduct, [productID], function(error, rows, fields){
            if (error) {
    
            // Send error code of 400 if invalid request
                console.log(error);
                res.sendStatus(400);
            }
            else
            {
                res.sendStatus(204);
            }
      })
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/delete-supplier-form/', function(req,res,next){

    let data = req.body;
    let supplierID = parseInt(data.id);

    let deleteSupplier = `DELETE FROM Suppliers WHERE supplierID = ?`;

    db.pool.query(deleteSupplier, [supplierID], function(error, rows, fields){
        if (error) {

        // Send error code of 400 if invalid request
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
  })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/delete-productCategory-form/', function(req,res,next){

    let data = req.body;
    let productCategoryID = parseInt(data.id);

    let deleteProductCategory = `DELETE FROM ProductCategories WHERE productCategoryID = ?`;

    db.pool.query(deleteProductCategory, [productCategoryID], function(error, rows, fields){
        if (error) {

        // Send error code of 400 if invalid request
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
  })
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/delete-store-form/', function(req,res,next){
    let data = req.body;
    let storeID = parseInt(data.id);
    
    let deleteStore = `DELETE FROM Stores WHERE storeID = ?`;
    // Run the 1st query
    db.pool.query(deleteStore, [storeID], function(error, rows, fields){
        if (error) {

        // Send error code of 400 if invalid request
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
  })
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/delete-locationType-form/', function(req,res,next){

    let data = req.body;
    let locationTypeID = parseInt(data.id);

    let deleteLocationType = `DELETE FROM LocationTypes WHERE locationTypeID = ?`;

    db.pool.query(deleteLocationType, [locationTypeID], function(error, rows, fields){
        if (error) {

        // Send error code of 400 if invalid request
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
  })
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/delete-storeProduct-form/', function(req,res,next){

    let data = req.body;
    let storeProductID = parseInt(data.id);

    let deleteStoreProduct = `DELETE FROM StoreProducts WHERE storeProductID = ?`;

    db.pool.query(deleteStoreProduct, [storeProductID], function(error, rows, fields){
        if (error) {

        // Send error code of 400 if invalid request
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
  })
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    PUT ROUTES
*/

/* Citation for the following functions:
Date: 2/29/2024
Adapted from:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

/* Citation for the following functions:
Date: 3/10/2024
Adapted from:
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
This is for allowing null values to be added for an FK for Products and Stores
*/

/* Citation for the following functions:
Date: 3/10/2024
Adapted from:
Source URL: https://umbraco.com/knowledge-base/http-status-codes/
This is for sending a status code so that the program will send a message to the user
since they are trying to add a duplicate unique value
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/edit-product-form', function(req,res,next){
    let data = req.body;
    
    let productID = parseInt(data.productID);
    let productName = data.productName;
    let description = data.description;
    let brand = data.brand;
    let listPrice = parseFloat(data.listPrice);
    let productSize = data.productSize;
    let supplierID = parseInt(data['supplierID']);
    let productCategoryID = parseInt(data['productCategoryID'])

      // Run this query if the productCategoryID (an FK) is NULL
      if (isNaN(productCategoryID)) {
        var productCategoryIDNull = null;
        let queryUpdateProduct = `UPDATE Products SET productName = "${productName}", description = "${description}", brand = "${brand}", listPrice = ${listPrice}, productSize = "${productSize}", supplierID = "${supplierID}", productCategoryID = ${productCategoryIDNull} WHERE productID = ${productID}`;
        let query2 = 'SELECT * FROM Products WHERE productID = ?';
                  // Run the 1st query
                  db.pool.query(queryUpdateProduct, function(error, rows, fields){
                    if (error) {
    
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
        
                        // If the error is due to trying to add a duplicate unique value, send a status of 409
                        if (error.errno == 1062) {
                            res.sendStatus(409);
                        } else {
                            res.sendStatus(400);
                        }
                    }
                      else
                      {
                          // Run the second query
                          db.pool.query(query2, [productID], function(error, rows, fields) {
          
                              if (error) {
                                  console.log(error);
                                  res.sendStatus(400);
                              } else {
                                  res.send(rows);
                              }
                          })
                      }
    
          })
      }
      else { // Run this query if the value for productCategotyID (an FK) is not null
        let queryUpdateProduct = `UPDATE Products SET productName = "${productName}", description = "${description}", brand = "${brand}", listPrice = ${listPrice}, productSize = "${productSize}", supplierID = "${supplierID}", productCategoryID = "${productCategoryID}" WHERE productID = ${productID}`;
        let query2 = 'SELECT * FROM Products WHERE productID = ?';
                  // Run the 1st query
                  db.pool.query(queryUpdateProduct, function(error, rows, fields){
                    if (error) {
    
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
        
                        // If the error is due to trying to add a duplicate unique value, send a status of 409
                        if (error.errno == 1062) {
                            res.sendStatus(409);
                        } else {
                            res.sendStatus(400);
                        }
                    }
                      else
                      {
                          // Run the second query
                          db.pool.query(query2, [productID], function(error, rows, fields) {
          
                              if (error) {
                                  console.log(error);
                                  res.sendStatus(400);
                              } else {
                                  res.send(rows);
                              }
                          })
                      }
    
          })
      }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put('/edit-supplier-form', function(req,res,next){
    let data = req.body;
    
    let supplierID = parseInt(data.supplierID);
    let name = data.name;
    let address = data.address;
    let city = data.city;
    let state = data.state;
    let telephone = data.telephone;
    let email = data.email;

      
    let queryUpdateSupplier = `UPDATE Suppliers SET name = "${name}", address = "${address}", city = "${city}", state = "${state}", telephone = "${telephone}", email = "${email}" WHERE supplierID = ${supplierID}`;
    let query2 = 'SELECT * FROM Suppliers WHERE supplierID = ?';
              // Run the 1st query
              db.pool.query(queryUpdateSupplier, function(error, rows, fields){
                if (error) {
    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
    
                    // If the error is due to trying to add a duplicate unique value, send a status of 409
                    if (error.errno == 1062) {
                        res.sendStatus(409);
                    } else {
                        res.sendStatus(400);
                    }
                }
                  else
                  {
                      // Run the second query
                      db.pool.query(query2, [supplierID], function(error, rows, fields) {
      
                          if (error) {
                              console.log(error);
                              res.sendStatus(400);
                          } else {
                              res.send(rows);
                          }
                      })
                  }

      })});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/edit-productCategory-form', function(req,res,next){
    let data = req.body;
    
    let productCategoryID = parseInt(data.productCategoryID);
    let category = data.category;

      
    let queryUpdateProductCategory = `UPDATE ProductCategories SET category = "${category}" WHERE productCategoryID = ${productCategoryID}`;
    let query2 = 'SELECT * FROM ProductCategories WHERE productCategoryID = ?';
              // Run the 1st query
              db.pool.query(queryUpdateProductCategory, function(error, rows, fields){
                if (error) {
    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    
                    // If the error is due to trying to add a duplicate unique value, send a status of 409
                    if (error.errno == 1062) {
                        res.sendStatus(409);
                    } else {
                        res.sendStatus(400);
                    }
                }
                  else
                  {
                      // Run the second query
                      db.pool.query(query2, [productCategoryID], function(error, rows, fields) {
      
                          if (error) {
                              console.log(error);
                              res.sendStatus(400);
                          } else {
                              res.send(rows);
                          }
                      })
                  }

      })});

//////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/edit-store-form', function(req,res,next){
    let data = req.body;
    
    let storeID = parseInt(data.storeID);
    let address = data.address;
    let city = data.city;
    let state = data.state;
    let telephone = data.telephone;
    let email = data.email;

    let locationTypeID = parseInt(data['locationTypeID']);
    // Run this query if the locationTypeID (an FK) is NULL
    if (isNaN(locationTypeID)) {
        var locationTypeIDNull = null;
        let queryUpdateStore = `UPDATE Stores SET address = "${address}", city = "${city}", state = "${state}", telephone = "${telephone}", email = "${email}", locationTypeID = ${locationTypeIDNull} WHERE storeID = ${storeID}`;
        let query2 = 'SELECT * FROM Stores WHERE storeID = ?';
    
        // Run the 1st query
        db.pool.query(queryUpdateStore, [address, city, state, telephone, email, locationTypeIDNull], function(error, rows, fields){
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else
            {
                // Run the second query
                db.pool.query(query2, [storeID], function(error, rows, fields) {
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
    
         })
    }
    else { // Run this query if the value for locationTypeID (an FK) is not null
        let queryUpdateStore = `UPDATE Stores SET address = "${address}", city = "${city}", state = "${state}", telephone = "${telephone}", email = "${email}", locationTypeID = "${locationTypeID}" WHERE storeID = ${storeID}`;
        let query2 = 'SELECT * FROM Stores WHERE storeID = ?';
    
        // Run the 1st query
        db.pool.query(queryUpdateStore, [address, city, state, telephone, email, locationTypeID], function(error, rows, fields){
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);

                // If the error is due to trying to add a duplicate unique value, send a status of 409
                if (error.errno == 1062) {
                    res.sendStatus(409);
                } else {
                    res.sendStatus(400);
                }
            }
            else
            {
                // Run the second query
                db.pool.query(query2, [storeID], function(error, rows, fields) {
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
    
         })
    }

});

/////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/edit-locationType-form', function(req,res,next){
    let data = req.body;
    
    let locationTypeID = parseInt(data.locationTypeID);
    let type = data.type;
    let description = data.description;

      
    let queryUpdateLocationType = `UPDATE LocationTypes SET type = "${type}", description = "${description}" WHERE locationTypeID = ${locationTypeID}`;
    let query2 = 'SELECT * FROM LocationTypes WHERE locationTypeID = ?';
              // Run the 1st query
              db.pool.query(queryUpdateLocationType, function(error, rows, fields){
                if (error) {
    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
    
                    // If the error is due to trying to add a duplicate unique value, send a status of 409
                    if (error.errno == 1062) {
                        res.sendStatus(409);
                    } else {
                        res.sendStatus(400);
                    }
                }
                  else
                  {
                      // Run the second query
                      db.pool.query(query2, [locationTypeID], function(error, rows, fields) {
      
                          if (error) {
                              console.log(error);
                              res.sendStatus(400);
                          } else {
                              res.send(rows);
                          }
                      })
                  }

      })});           

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/edit-storeProduct-form', function(req,res,next){
    let data = req.body;
    console.log("Received1");
    console.log(req.body);
  
    let storeProductID = parseInt(data.storeProductID)
    let quantity = data.quantity;
    let dateOrdered = data.dateOrdered;
    let deliveryDate = data.deliveryDate;
    let totalDue = parseFloat(data.totalDue);
    let invoiceDueDate = data.invoiceDueDate;

    let storeID = parseInt(data['storeID']);
    let [productID, listPrice] = data['productID'].split(' ')


    console.log("Received2");
    console.log(req.body);
  
    //Updating the data in the database
    let queryUpdateStoreProduct = `UPDATE StoreProducts SET quantity = "${quantity}", dateOrdered = "${dateOrdered}", deliveryDate = "${deliveryDate}", totalDue = "${totalDue}", invoiceDueDate = "${invoiceDueDate}", productID = "${productID}", storeID = "${storeID}" WHERE storeProductID = "${storeProductID}"`;
    //Fetching the updated data
    let selectStoreProduct = 'SELECT * FROM StoreProducts WHERE storeProductID = ?'
          // Run the 1st query
          db.pool.query(queryUpdateStoreProduct, [quantity, dateOrdered, deliveryDate, totalDue, invoiceDueDate, productID, storeID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                console.log(rows);
                db.pool.query(selectStoreProduct, [storeProductID, quantity, dateOrdered, deliveryDate, totalDue, invoiceDueDate, productID, storeID], function(error, rows, fields){

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        //console.log("ReceivedFinal");
                        //console.log(req.body);
                        //console.log(rows);
                        res.send(rows);
                    }
                })
              }
  })});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});