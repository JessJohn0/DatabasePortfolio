/*Citation for the following functions:
Date: 2/29/2024
Copied from /OR/ Adapted from /OR/ Based on:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

/*Citation for the following functions:
Date: 3/16/2024
Adapted from:
Source URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/alert
This was for implementing a pop-up window if the user tried to add a duplicate unique value.
*/

/*Citation for the following functions:
Date: 3/16/2024
Adapted from:
Source URL: https://umbraco.com/knowledge-base/http-status-codes/
This was for implementing a pop-up window if the user tried to add a duplicate unique value. This was to find the appropriate status code.
*/

//Add record to table
// Get the objects we need to modify
let addProductForm = document.getElementById('add-product-form');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    var inputProductName = document.getElementById("add-productName");
    var inputDescription = document.getElementById("add-description");
    var inputBrand = document.getElementById("add-brand");
    var inputListPrice = document.getElementById("add-listPrice");
    var inputProductSize = document.getElementById("add-productSize");
    var inputSupplier = document.getElementById("add-supplier");
    var inputProductCategory = document.getElementById("add-productCategory");

    let productNameValue = inputProductName.value;
    let descriptionValue = inputDescription.value;
    let brandValue = inputBrand.value;
    let listPriceValue = inputListPrice.value;
    let productSizeValue = inputProductSize.value;
    let supplierValue = inputSupplier.value;
    let productCategoryValue = inputProductCategory.value;

    if (productNameValue == "") 
    {
        return;
    } 
    if (listPriceValue == "") 
    {
        return;
    }
    if (productSizeValue == "") 
    {
        return;
    } 
    if (supplierValue == "") 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        productName: productNameValue,
        description: descriptionValue,
        brand: brandValue,
        listPrice: listPriceValue,
        productSize: productSizeValue,
        supplier: supplierValue,
        productCategory: productCategoryValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            inputProductName.value = '';
            inputDescription.value = '';
            inputBrand.value = '';
            inputListPrice.value = '';
            inputProductSize.value = '';
            inputSupplier.value = '';
            inputProductCategory.value = '';

            location.reload();
        }
        // ProductName has to be unique, if the user tried to add a duplicate productName, send a pop-up message
        else if (xhttp.readyState == 4 && xhttp.status == 409) {
            console.log("There was an error with the input (status = 409).");
            window.alert("Products cannot have the same name. Edit it to differentiate between the products.");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


