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
 let updateSupplierForm = document.getElementById('edit-supplier-form');

 // Modify the objects we need
 updateSupplierForm.addEventListener("submit", function (e) {
     // Prevent the form from submitting
     e.preventDefault();
 
     // Get form fields we need to get data from
     let inputSupplierID = document.getElementById("edit-supplierID");
     let inputName = document.getElementById("edit-name");
     let inputAddress = document.getElementById("edit-address");
     let inputCity = document.getElementById("edit-city");
     let inputState = document.getElementById("edit-state");
     let inputTelephone = document.getElementById("edit-telephone");
     let inputEmail = document.getElementById("edit-email");
 
     // Get the values from the form fields
     let supplierIDValue = inputSupplierID.value;
     let nameValue = inputName.value;
     let addressValue = inputAddress.value;
     let cityValue = inputCity.value;
     let stateValue = inputState.value;
     let telephoneValue = inputTelephone.value;
     let emailValue = inputEmail.value;
     
 
     if (nameValue == "") 
     {
         return;
     } 
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
         supplierID: supplierIDValue,
         name: nameValue,
         address: addressValue,
         city: cityValue,
         state: stateValue,
         telephone: telephoneValue,
         email: emailValue,
     }
     
     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "/edit-supplier-form", true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     // Tell our AJAX request how to resolve
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
 
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


 function updateForm() {
    
    let table = document.getElementById("suppliers-table");
    let supplierID = document.getElementById("edit-supplierID").value;

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == supplierID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            document.getElementById("edit-supplierID").value = updateRowIndex.getElementsByTagName("td")[2].innerHTML;
            document.getElementById("edit-name").value = updateRowIndex.getElementsByTagName("td")[3].innerHTML;
            document.getElementById("edit-address").value = updateRowIndex.getElementsByTagName("td")[4].innerHTML;
            document.getElementById("edit-city").value = updateRowIndex.getElementsByTagName("td")[5].innerHTML;
            document.getElementById("edit-state").value = updateRowIndex.getElementsByTagName("td")[6].innerHTML;
            document.getElementById("edit-telephone").value = updateRowIndex.getElementsByTagName("td")[7].innerHTML;
            document.getElementById("edit-email").value = updateRowIndex.getElementsByTagName("td")[8].innerHTML;

       }
    }
 
}
 
