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
 let updateProductCategoryForm = document.getElementById('edit-productCategory-form');

 // Modify the objects we need
 updateProductCategoryForm.addEventListener("submit", function (e) {
     // Prevent the form from submitting
     e.preventDefault();
 
     // Get form fields we need to get data from
     let inputProductCategoryID = document.getElementById("edit-productCategoryID");
     let inputCategory = document.getElementById("edit-category");
 
     // Get the values from the form fields
     let productCategoryIDValue = inputProductCategoryID.value;
     let categoryValue = inputCategory.value;
     

 
     if (categoryValue == "") 
     {
         return;
     } 
 
 
     // Put our data we want to send in a javascript object
     let data = {
         productCategoryID: productCategoryIDValue,
         category: categoryValue,
     }
     
     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "/edit-productCategory-form", true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     // Tell our AJAX request how to resolve
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
 
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

 
 function updateForm() {

    let table = document.getElementById("productCategories-table");
    let productCategoryID = document.getElementById("edit-productCategoryID").value;

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == productCategoryID) {


            let updateRowIndex = table.getElementsByTagName("tr")[i];

            document.getElementById("edit-productCategoryID").value = updateRowIndex.getElementsByTagName("td")[2].innerHTML;
            document.getElementById("edit-category").value = updateRowIndex.getElementsByTagName("td")[3].innerHTML;

       }
    } 
 
}