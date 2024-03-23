/*Group 11
Members: Jessica Johnson, Chandan Sohi
Step 6 */

/*Citation for the following functions:
Date: 2/15/2024
Adapted from:
Source URL: https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325
*/

/*Citation for the following functions:
Date: 3/10/2024
Adapted from: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box
This was used in regards to the search box queries
*/

/*Citation for the following functions:
Date: 3/05/2024
Adapted from:
Source URL: https://stackoverflow.com/questions/10148856/joining-two-tables-with-nullable-foreign-key
This was used in regards to using left joins for displaying null FK's 
*/


-- CREATING TABLES

-- Stores Form - displays all information for the Stores page (displays all whether the locationTypeID is null or not)
SELECT storeID, address, city, state, telephone, email, type FROM Stores
LEFT JOIN LocationTypes using (locationTypeID)
WHERE Stores.locationTypeID IS NULL OR Stores.locationTypeID IS NOT NULL

-- LocationTypes From - displays all information for the LocationTypes page
SELECT * FROM LocationTypes

-- Suppliers Form - displays all information for the Suppliers page
SELECT * FROM Suppliers

-- Products Form - displays all information for the Products page (displays all whether productCategoryID is null or not)
SELECT productID, productName, description, brand, listPrice, productSize, name, category FROM Products
INNER JOIN Suppliers ON Products.supplierID = Suppliers.supplierID
LEFT JOIN ProductCategories using (productCategoryID)
WHERE Products.productCategoryID IS NULL OR Products.productCategoryID IS NOT NULL

-- ProductCategories Form -- displays all information for the ProductCategories page
SELECT * FROM ProductCategories

--StoreProducts Form -- displays all information for the StoreProducts page
SELECT StoreProducts.storeProductID, StoreProducts.quantity, StoreProducts.dateOrdered, StoreProducts.deliveryDate, StoreProducts.totalDue,
StoreProducts.invoiceDueDate, Products.productName AS "productName", Stores.city AS "storeCity"
FROM StoreProducts
INNER JOIN Products ON StoreProducts.productID = Products.productID
INNER JOIN Stores ON StoreProducts.storeID = Stores.storeID

-- DROPDOWNS

-- Stores: LocationTypeID dropdown (dynamically fills in type instead of LocationTypeID)
SELECT locationTypeID, type AS "type" FROM LocationTypes

-- Stores: StoreID dropdown for editing (shows ID number)
SELECT * FROM Stores

-- LocationTypes: LocationTypeID dropdown for editing (shows ID number)
SELECT * FROM LocationTypes

-- Suppliers: SupplierID dropdown for editing (shows ID number)
SELECT * FROM Suppliers

-- Products: Dropdown for adding a Supplier (shows name)
SELECT supplierID, name FROM Suppliers

-- Products: Dropdown for adding a Product Category (shows category)
SELECT productCategoryID, category AS "category" FROM ProductCategories

-- Products: ProductID dropdown for editing (shows ID number)
SELECT * FROM Products

-- ProductCategories: ProductCategoryID for editing (shows ID number)
SELECT * FROM ProductCategories

-- StoreProducts: Dropdown for adding a Product (shows productName), Sending the listPrice allows the totalDue to be calculated.
SELECT productID, listPrice, productName FROM Products

-- StoreProducts: Dropdown for adding a Store (shows city)
SELECT storeID, city FROM Stores

-- StoreProducts: Dropdown for editiing (shows ID number)
SELECT storeProductID FROM StoreProducts

-- ADDING TO TABLES

-- Create a new Store
INSERT INTO Stores (address, city, state, telephone, email, locationTypeID)
VALUES (:addressInput, :cityInput, :stateInput, :telephoneInput, :emailInput, :locationTypeIDInput)

--Create a new LocationType
INSERT INTO LocationTypes (type, description) 
VALUES (:tyoeInput, :descriptionInput)

-- Create a new Supplier
INSERT INTO Suppliers (name, address, city, state, telephone, email) 
VALUES (:nameInput, :addressInput, :cityInput, :stateInput, :telephoneInput, :emailInput)

-- Create a new Product
INSERT INTO Products (productName, description, brand, listPrice, productSize, supplierID, productCategoryID) 
VALUES (:productNameInput, :descriptionInput, :brandInput, :listPriceInput, :productSizeInput, :supplierIDInput, :productCategoryIDInput)

-- Create a new ProductCateory
INSERT INTO ProductCategories (category) 
VALUES (:categoryInput)

-- Create a new StoreProducts
INSERT INTO StoreProducts (quantity, dateOrdered, deliveryDate, invoiceDueDate, productID, storeID) 
VALUES (:quantityInput, :dateOrderedInput, :deliveryDateInput, :invoiceDueDateInput, :productIDInput, :storeIDInput)

-- EDITING TABLES

-- Update an Store
-- The storeID are from a drop down menu
UPDATE Stores SET address = :addressInput, city = :cityInput, state = :stateInput, telephone = :telephoneInput, locationTypeID = :locationTypeIDInput
WHERE storeID = :storeID

-- Update a StoreLocation
-- The storeLocationID are from a drop down menu 
UPDATE LocationTypes SET type = :typeInput, description = :descriptionInput
WHERE locationTypeID = :locationTypeID

-- Update a Supplier
-- The supplierID are from a drop down menu 
UPDATE Suppliers SET name = :nameInput, address = :addressInput, city = :cityInput, state = :stateInput, telephone = :telephoneInput 
WHERE supplierID = :supplierID

-- Update a Product
-- The productID are from a drop down menu
UPDATE Products SET productName = :productNameInput, description = :descriptionInput, brand = :brandInput, listPrice = :listPriceInput, productSize = :productSizeInput, supplierID = :supplierIDInput, producrCategoryID = :productCategoryIDInput 
WHERE productID = :productID

-- Update a ProductCategory
-- The productCategoryID are from a drop down menu
UPDATE ProductCategories SET category = :categoryInput
WHERE productCategoryID = :productCategoryID

-- Update a StoreProduct
-- The storeProductID are from a drop down menu 
UPDATE StoreProducts SET quantity = :quantityInput, dateOrdered = :dateOrderedInput, deliveryDate = :deliveryDateInput, invoiceDueDate = :invoiceDueDateInput, 
productID = :productIDInput, storeID = :storeIDInput

-- DELETING TABLES

-- Delete a Store
DELETE FROM Stores
WHERE storeID = :storeID

-- Delete a LocationType
DELETE FROM LocationTypes
WHERE locationTypeID = :locationTypeID

-- Delete a Supplier
DELETE FROM Suppliers 
WHERE supplierID = :supplierID

-- Delete a Product
DELETE FROM Products 
WHERE productID = :productID

-- Delete a ProductCategory
DELETE FROM ProductCategories
WHERE productCategoryID = :producrCategoryID

-- Delete a StoreProducts
DELETE FROM StoreProducts 
WHERE storeProductsID = :storeProductsID

-- SEARCHING

-- Stores - searching by city
SELECT storeID, address, city, state, telephone, email, type FROM Stores
LEFT JOIN LocationTypes using (locationTypeID)
WHERE (Stores.locationTypeID IS NULL OR Stores.locationTypeID IS NOT NULL)
AND city LIKE :citySearchInput

-- LocationTypes - searching by type
SELECT * FROM LocationTypes WHERE type LIKE :typeSearchInput

-- Suppliers - searching by supplier name
SELECT * FROM Suppliers WHERE name LIKE :nameSearchInput

-- Products - searching by supplier name
SELECT productID, productName, description, brand, listPrice, productSize, name, category FROM Products
INNER JOIN Suppliers ON Products.supplierID = Suppliers.supplierID
LEFT JOIN ProductCategories using (productCategoryID)
WHERE ( Products.productCategoryID IS NULL OR Products.productCategoryID IS NOT NULL )
AND name LIKE :nameSearchInput

-- ProductCategories - searching by category
SELECT * FROM ProductCategories WHERE category LIKE :categorySearchInput

-- StoreProducts -- searching by product
SELECT StoreProducts.storeProductID, StoreProducts.quantity, StoreProducts.dateOrdered, StoreProducts.deliveryDate,
StoreProducts.totalDue, StoreProducts.invoiceDueDate, Products.productName AS "productName", Stores.city AS "storeCity"
FROM StoreProducts
INNER JOIN Products ON StoreProducts.productID = Products.productID
INNER JOIN Stores ON StoreProducts.storeID = Stores.storeID
WHERE Products.productName LIKE :productNameSearchInput
