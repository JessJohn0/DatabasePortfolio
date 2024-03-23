/*Citation for the following functions:
Date: 2/29/2024
Copied from /OR/ Adapted from /OR/ Based on:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

/*Citation for the following functions:
Date: 2/29/2024
Copied from /OR/ Adapted from /OR/ Based on:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
*/

/*Citation for the following functions:
Date: 2/29/2024
Copied from /OR/ Adapted from /OR/ Based on: Worked with a ULA during office hours who helped me with my code.
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

 // Get the objects we need to modify
 let updateStoreForm = document.getElementById('edit-store-form');

 // Modify the objects we need
 updateStoreForm.addEventListener("submit", function (e) {
     // Prevent the form from submitting
     e.preventDefault();
 
     // Get form fields we need to get data from
     let inputStoreID = document.getElementById("edit-storeID");
     let inputAddress = document.getElementById("edit-address");
     let inputCity = document.getElementById("edit-city");
     let inputState = document.getElementById("edit-state");
     let inputTelephone = document.getElementById("edit-telephone");
     let inputEmail = document.getElementById("edit-email");
     let inputLocationTypeID = document.getElementById("edit-locationType");
 
     // Get the values from the form fields
     let storeIDValue = inputStoreID.value;
     let addressValue = inputAddress.value;
     let cityValue = inputCity.value;
     let stateValue = inputState.value;
     let telephoneValue = inputTelephone.value;
     let emailValue = inputEmail.value;
     let locationTypeIDValue = inputLocationTypeID.value;
     
 
     if (addressValue == "") 
     {
         return;
     }
     if (cityValue == "") 
     {
         return;
     } 
     if (stateValue == "") 
     {
         return;
     }
     if (telephoneValue == "") 
     {
         return;
     } 
     if (emailValue == "") 
     {
         return;
     }
 
 
     // Put our data we want to send in a javascript object
     let data = {
         storeID: storeIDValue,
         address: addressValue,
         city: cityValue,
         state: stateValue,
         telephone: telephoneValue,
         email: emailValue,
         locationTypeID: locationTypeIDValue,
     }
     
     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "/edit-store-form", true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     // Tell our AJAX request how to resolve
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
 
            //updateRow(xhttp.response, productIDValue);
 
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


 function updateForm() {
    
    let table = document.getElementById("stores-table");
    let storeID = document.getElementById("edit-storeID").value;

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == storeID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            document.getElementById("edit-storeID").value = updateRowIndex.getElementsByTagName("td")[2].innerHTML;
            document.getElementById("edit-address").value = updateRowIndex.getElementsByTagName("td")[3].innerHTML;
            document.getElementById("edit-city").value = updateRowIndex.getElementsByTagName("td")[4].innerHTML;
            document.getElementById("edit-state").value = updateRowIndex.getElementsByTagName("td")[5].innerHTML;
            document.getElementById("edit-telephone").value = updateRowIndex.getElementsByTagName("td")[6].innerHTML;
            document.getElementById("edit-email").value = updateRowIndex.getElementsByTagName("td")[7].innerHTML;

            let dropdown = document.getElementById("edit-locationTypeID");

            for (let i = 0; i < dropdown.options.length; i++) {
                if (dropdown.options[i].text == updateRowIndex.getElementsByTagName("td")[8].innerHTML) {
                    dropdown.selectedIndex = i;
                break;
                }
            }

       }
    }
 
}
 
