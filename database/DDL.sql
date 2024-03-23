/*Group 11
Members: Jessica Johnson, Chandan Sohi
Step 6*/

/*Citation for the following functions:
Date: 2/07/2024
Adapted from:
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/activity-4-creating-database-intersection-tables?module_item_id=23809307
*/

/*Citation for the following functions:
Date: 3/10/2024
Adapted from:
Source URL: https://www.w3schools.com/sql/sql_unique.asp
Used for the unique constraints that are on most of the tables.
*/

/*Citation for the following functions:
Date: 3/10/2024
Adapted from:
Source URL: https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html
This is in relation to the "ON DELETE SET NULL ON UPDATE CASCADE" used for some of the foreign keys.
*/

-- Disable commits and foreign key checks
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Check if table "LocationTypes" already exists, delete it if exists
DROP TABLE IF EXISTS LocationTypes;

-- Create table "LocationTypes"
CREATE TABLE LocationTypes
(
    locationTypeID INT(11) AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (locationTypeID),
    UNIQUE(type)
);

-- Check if table "Stores" already exists, delete it if exists
DROP TABLE IF EXISTS Stores;

-- Create table "Stores"
CREATE TABLE Stores 
(
    storeID INT(11) AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(45) NOT NULL,
    state VARCHAR(45) NOT NULL,
    telephone VARCHAR(13) NOT NULL,
    email VARCHAR(255) NOT NULL,
    locationTypeID INT(11) DEFAULT NULL,
    PRIMARY KEY (storeID),
    UNIQUE(telephone),
    UNIQUE(email),
    CONSTRAINT FK_Stores_locationTypeID FOREIGN KEY (locationTypeID) REFERENCES LocationTypes(locationTypeID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Drop the foreign key constaint so it imports into phpMyAdmin
ALTER TABLE Stores DROP FOREIGN KEY FK_Stores_locationTypeID;

-- Check if table "Suppliers" already exists, delete if it exists
DROP TABLE IF EXISTS Suppliers;

-- Create table "Suppliers"
CREATE TABLE Suppliers 
(
    supplierID INT(11) AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(45) NOT NULL,
    state VARCHAR(45) NOT NULL,
    telephone VARCHAR(13) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (supplierID),
    UNIQUE (name)
);

-- Check if table "ProductCategories" already exists, delete if it exists
DROP TABLE IF EXISTS ProductCategories;

-- Create table "ProductCategories"
CREATE TABLE ProductCategories 
(
    productCategoryID INT(11) AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (productCategoryID),
    UNIQUE(category)
);

-- Check if table "Products" already exists, delete if it exists
DROP TABLE IF EXISTS Products;

-- Create table "Products"
CREATE TABLE Products 
(
    productID INT(11) AUTO_INCREMENT,
    productName VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    brand VARCHAR(255),
    listPrice DECIMAL(12, 2) NOT NULL,
    productSize VARCHAR(45) NOT NULL,
    supplierID INT(11) NOT NULL,
    productCategoryID INT(11) DEFAULT NULL,
    PRIMARY KEY (productID),
    UNIQUE (productName),
    CONSTRAINT FK_Products_supplierID FOREIGN KEY (supplierID) REFERENCES Suppliers(supplierID) ON DELETE CASCADE,
    CONSTRAINT FK_ProductCategories_productCategoryID FOREIGN KEY (productCategoryID) REFERENCES ProductCategories(productCategoryID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Drop the foreign key constaint so it imports into phpMyAdmin
ALTER TABLE Products DROP FOREIGN KEY FK_ProductCategories_productCategoryID;

-- Check if table "StoreProducts" already exists, delete if it exists
DROP TABLE IF EXISTS StoreProducts;

-- Create table "StoreProducts"
CREATE TABLE StoreProducts
(
    storeProductID INT(11) AUTO_INCREMENT,
    quantity INT(11) NOT NULL,
    dateOrdered DATE NOT NULL, 
    deliveryDate DATE NOT NULL, 
    totalDue DECIMAL(12,2) NOT NULL, 
    invoiceDueDate DATE NOT NULL, 
    productID INT(11) NOT NULL,
    storeID INT(11) NOT NULL,
    PRIMARY KEY (storeProductID),
    CONSTRAINT FK_storeProducts_productID FOREIGN KEY (productID) REFERENCES Products(productID) ON DELETE CASCADE,
    CONSTRAINT FK_storeProducts_storeID FOREIGN KEY (storeID) REFERENCES Stores(storeID) ON DELETE CASCADE
);

-- Sample data for the table "LocationTypes"
INSERT INTO LocationTypes (type, description)
VALUES
    ("Inland Downtown", "Downtown and not near a beach"),
    ("Beachfront Downtown", "Downtown and near a beach"),
    ("Beachfront", "Very close or on the beach"),
    ("Inland", "Not near a beach and not downtown");


-- Sample data for the table "Stores"
INSERT INTO Stores (address, city, state, telephone, email, locationTypeID)
VALUES
    ("294 Board Street", "Charleston", "SC", "843-555-8754", "charleston@thefrostyscoop.com", NULL),
    ("45 S Hwy 15", "Myrtle Beach", "SC", "843-555-2953", "myrtle@thefrostyscoop.com", 2),
    ("23 Wrightsville Avenue", "Wilmington", "NC", "910-555-7921", "wilmington@thefrostyscoop.com", 2),
    ("90 E Bay Street", "Savannah", "GA", "912-555-7954", "savannah@thefrostscoop.com", 1);

-- Sample data for the table "Suppliers"
INSERT INTO Suppliers (name, address, city, state, telephone, email)
VALUES
    ("Restaurant Warehouse", "589 Glenwood Avenue", "Atlanta", "GA", "470-555-8934", "orders@restaurantwares.com"),
    ("Sarah's Vegan Creamery", "690 Green Street", "Savannah", "GA", "912-555-3813", "orders@sarahs.com"),
    ("Ice Cream Supply", "89 Main Drive", "Greensboro", "NC", "336-555-2035", "info@icecreamsupply.com"),
    ("Natural Produce", "23 Coliseum Drive", "Charlotte", "NC", "980-555-6943", "ordering@natproduce.com");

-- Sample data for the table "Products"
INSERT INTO Products (productName, description, brand, listPrice, productSize, supplierID, productCategoryID)
VALUES
    ("Vegan Chocolate Ice Cream", "Vegan choc ice cream", NULL, 87.52, "3 gallons", 2, 2),
    ("Strawberry Syrup", NULL, "Hershey", 16.99, "Case of 6", 1, 3),
    ("Chocolate Ice Cream", "Reg choc ice cream", "Tillamook", 74.99, "3 gallons", 3, 2),
    ("Ice Cream Cones", "Reg ice cream cones", "Joy", 55.92, "Case of 192", 1, NULL),
    ("Vanilla Ice Cream", "Reg vanilla ice cream", NULL, 73.49, "3 gallons", 3, 2);

-- Sample data for the table "ProductCategories"
INSERT INTO ProductCategories (category)
VALUES
    ("Packaging"), 
    ("Food Base"), 
    ("Condiments"),
    ("Food Miscellaneous"),
    ("Equipment");

-- Sample data for the table "StoreProducts"
INSERT INTO StoreProducts (quantity, dateOrdered, deliveryDate, totalDue, invoiceDueDate, productID, storeID)
VALUES
    (4, '2023-10-15', '2023-10-19', 299.96, '2023-10-29', 3, 2),
    (3, '2023-10-15', '2023-10-19', 220.47, '2023-10-29', 5, 2),
    (1, '2023-10-18', '2023-10-22', 55.92, '2023-11-01', 4, 3),
    (2, '2023-10-21', '2023-10-25', 175.04, '2023-11-04', 1, 4),
    (2, '2023-10-24', '2023-10-28', 149.98, '2023-11-07', 3, 4);

-- Enable commits and foreign key checks
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
