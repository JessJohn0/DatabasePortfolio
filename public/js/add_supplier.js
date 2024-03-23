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
let addSupplierForm = document.getElementById('add-supplier-form');

// Modify the objects we need
addSupplierForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let addName = document.getElementById("add-name-supplier");
    let addAddress = document.getElementById("add-address-supplier");
    let addCity = document.getElementById("add-city-supplier");
    let addState = document.getElementById("add-state-supplier");
    let addTelephone = document.getElementById("add-telephone-supplier");
    let addEmail= document.getElementById("add-email-supplier");

    // Get the values from the form fields
    let nameValue = addName.value;
    let addressValue = addAddress.value;
    let cityValue = addCity.value;
    let stateValue = addState.value;
    let telephoneValue = addTelephone.value;
    let emailValue = addEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        address: addressValue,
        city: cityValue,
        state: stateValue,
        telephone: telephoneValue,
        email: emailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-supplier-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another supplier
            addName.value = '';
            addAddress.value = '';
            addCity.value = '';
            addState.value = '';
            addTelephone.value = '';
            addEmail.value = '';

            location.reload();
        }
        // Name has to be unique, if the user tried to add a duplicate name, send a pop-up message
        else if (xhttp.readyState == 4 && xhttp.status == 409) {
            console.log("There was an error with the input (status = 409).");
            window.alert("Unable to add duplicate supplier name!");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
