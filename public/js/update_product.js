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
 let updateProductForm = document.getElementById('edit-product-form');

 // Modify the objects we need
 updateProductForm.addEventListener("submit", function (e) {
     // Prevent the form from submitting
     e.preventDefault();
 
     // Get form fields we need to get data from
     let inputProductID = document.getElementById("edit-productID");
     let inputProductName = document.getElementById("edit-productName");
     let inputDescription = document.getElementById("edit-description");
     let inputBrand = document.getElementById("edit-brand");
     let inputListPrice = document.getElementById("edit-listPrice");
     let inputProductSize = document.getElementById("edit-productSize");
     let inputSupplier = document.getElementById("edit-supplier");
     let inputProductCategory = document.getElementById("edit-productCategory");
 
     // Get the values from the form fields
     let productIDValue = inputProductID.value;
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
         productID: productIDValue,
         productName: productNameValue,
         description: descriptionValue,
         brand: brandValue,
         listPrice: listPriceValue,
         productSize: productSizeValue,
         supplierID: supplierValue,
         productCategoryID: productCategoryValue
     }
     
     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "/edit-product-form", true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     // Tell our AJAX request how to resolve
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
 
            //updateRow(xhttp.response, productIDValue);
 
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

 
 function updateForm() {

    let table = document.getElementById("products-table");
    let productID = document.getElementById("edit-productID").value;

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == productID) {


            let updateRowIndex = table.getElementsByTagName("tr")[i];

            document.getElementById("edit-productID").value = updateRowIndex.getElementsByTagName("td")[2].innerHTML;
            document.getElementById("edit-productName").value = updateRowIndex.getElementsByTagName("td")[3].innerHTML;
            document.getElementById("edit-description").value = updateRowIndex.getElementsByTagName("td")[4].innerHTML;
            document.getElementById("edit-brand").value = updateRowIndex.getElementsByTagName("td")[5].innerHTML;
            document.getElementById("edit-listPrice").value = updateRowIndex.getElementsByTagName("td")[6].innerHTML;
            document.getElementById("edit-productSize").value = updateRowIndex.getElementsByTagName("td")[7].innerHTML;

            let dropdown = document.getElementById("edit-supplier");
            let dropdown2 = document.getElementById("edit-productCategory");
            /*Citation for how to loop through all values of a drop down:
            Date: 3/4/2024
            Source URL: https://tech.chandrahasa.com/2015/05/08/javascript-iterate-through-all-options-of-dropdown-list/
            */

            for (let i = 0; i < dropdown.options.length; i++) {
                if (dropdown.options[i].text == updateRowIndex.getElementsByTagName("td")[8].innerHTML) {
                    dropdown.selectedIndex = i;
                break;
                }
            }
            for (let i = 0; i < dropdown2.options.length; i++) {
                if (dropdown2.options[i].text == updateRowIndex.getElementsByTagName("td")[9].innerHTML) {
                    dropdown2.selectedIndex = i;
                break;
                }
            }

       }
    } 
 
}
 
