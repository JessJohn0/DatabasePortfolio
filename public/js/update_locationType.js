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
 let updateLocationTypeForm = document.getElementById('edit-locationType-form');

 // Modify the objects we need
 updateLocationTypeForm.addEventListener("submit", function (e) {
     // Prevent the form from submitting
     e.preventDefault();
 
     // Get form fields we need to get data from
     let inputLocationTypeID = document.getElementById("edit-locationTypeID");
     let inputType = document.getElementById("edit-type");
     let inputDescription = document.getElementById("edit-description");
 
     // Get the values from the form fields
     let locationTypeIDValue = inputLocationTypeID.value;
     let typeValue = inputType.value;
     let descriptionValue = inputDescription.value;
     
 
     if (typeValue == "") 
     {
         return;
     } 
 
 
     // Put our data we want to send in a javascript object
     let data = {
         locationTypeID: locationTypeIDValue,
         type: typeValue,
         description: descriptionValue,
     }
     
     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "/edit-locationType-form", true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     // Tell our AJAX request how to resolve
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
 
             location.reload();
 
         }
         // Type has to be unique, if the user tried to add a duplicate type, send a pop-up message
         else if (xhttp.readyState == 4 && xhttp.status == 409) {
            console.log("There was an error with the input (status = 409).");
            window.alert("Cannot change type to type that already exists!");
        }
         else if (xhttp.readyState == 4 && xhttp.status != 200) {
             console.log("There was an error with the input.")
         }
     }
 
     // Send the request and wait for the response
     xhttp.send(JSON.stringify(data));
 
 })

 
 function updateForm() {

    let table = document.getElementById("locationTypes-table");
    let locationTypeID = document.getElementById("edit-locationTypeID").value;

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == locationTypeID) {


            let updateRowIndex = table.getElementsByTagName("tr")[i];

            document.getElementById("edit-locationTypeID").value = updateRowIndex.getElementsByTagName("td")[2].innerHTML;
            document.getElementById("edit-type").value = updateRowIndex.getElementsByTagName("td")[3].innerHTML;
            document.getElementById("edit-description").value = updateRowIndex.getElementsByTagName("td")[4].innerHTML;

       }
    } 
 
}