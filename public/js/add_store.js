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
let addStoreForm = document.getElementById('add-store-form');

// Modify the objects we need
addStoreForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    var addAddress = document.getElementById("add-address");
    var addCity = document.getElementById("add-city");
    var addState = document.getElementById("add-state");
    var addTelephone = document.getElementById("add-telephone");
    var addEmail= document.getElementById("add-email");
    var addLocationTypeID = document.getElementById("add-locationType");

    // Get the values from the form fields
    let addressValue = addAddress.value;
    let cityValue = addCity.value;
    let stateValue = addState.value;
    let telephoneValue = addTelephone.value;
    let emailValue = addEmail.value;
    let locationTypeIDValue = addLocationTypeID;

    // Put our data we want to send in a javascript object
    let data = {
        address: addressValue,
        city: cityValue,
        state: stateValue,
        telephone: telephoneValue,
        email: emailValue,
        locationTypeID: locationTypeIDValue.value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-store-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Clear the input fields for another transaction
            addAddress.value = '';
            addCity.value = '';
            addState.value = '';
            addTelephone.value = '';
            addEmail.value = '';
            addLocationTypeID.value = '';

            location.reload();
        }
        // Email and telephone number have to be unique, if the user tried to add a duplicate email or telephone number, send a pop-up message
        else if (xhttp.readyState == 4 && xhttp.status == 409) {
            console.log("There was an error with the input (status = 409).");
            window.alert("Cannot add email or phone that already exists!");
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
