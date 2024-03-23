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
let addProductCategoryForm = document.getElementById('add-productCategory-form');

// Modify the objects we need
addProductCategoryForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let addCategory = document.getElementById("add-category");

    // Get the values from the form fields
    let categoryValue = addCategory.value;

    // Put our data we want to send in a javascript object
    let data = {
        category: categoryValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-productCategory-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            addCategory.value = '';

            location.reload();
        }
        // Category has to be unique, if the user tried to add a duplicate category, send a pop-up message
        else if (xhttp.readyState == 4 && xhttp.status == 409) {
            console.log("There was an error with the input (status = 409).");
            window.alert("Unable to add duplicate category!");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
