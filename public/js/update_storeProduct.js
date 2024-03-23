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
 let updateStoreProductForm = document.getElementById('edit-storeProduct-form');

 // Modify the objects we need
 updateStoreProductForm.addEventListener("submit", function (e) {
     // Prevent the form from submitting
     e.preventDefault();
 
     // Get form fields we need to get data from
     let editStoreProductID = document.getElementById("edit-storeProductID");
     let editQuantity = document.getElementById("edit-quantity");
     let editDateOrdered = document.getElementById("edit-dateOrdered");
     let editDeliveryDate = document.getElementById("edit-deliveryDate");
     let editTotalDue = document.getElementById("edit-totalDue");
     let editInvoiceDueDate = document.getElementById("edit-invoiceDueDate");
     let editProduct = document.getElementById("edit-productID");
     let editStore = document.getElementById("edit-storeID");
 
     // Get the values from the form fields
     let StoreProductIDValue = editStoreProductID.value;
     let QuantityValue = editQuantity.value;
     let DateOrderedValue = editDateOrdered.value;
     let DeliveryDateValue = editDeliveryDate.value;
     let TotalDueValue = editTotalDue.value;
     let InvoiceDueDateValue = editInvoiceDueDate.value;
     let ProductValue = editProduct.value;
     let StoreValue = editStore.value; 
     
 
     if (QuantityValue == "") 
     {
         return;
     } 
     if (DateOrderedValue == "") 
     {
         return;
     }
     if (DeliveryDateValue == "") 
     {
         return;
     } 
     if (TotalDueValue == "") 
     {
         return;
     }
     if (InvoiceDueDateValue == "") 
     {
         return;
     } 
     if (ProductValue == "") 
     {
         return;
     }
     if (StoreValue == "") 
     {
         return;
     }
 
 
     // Put our data we want to send in a javascript object
     let data = {
        storeProductID: StoreProductIDValue,
        quantity: QuantityValue,
        dateOrdered: DateOrderedValue,
        deliveryDate: DeliveryDateValue,
        totalDue: TotalDueValue,
        invoiceDueDate: InvoiceDueDateValue,
        productID: ProductValue,
        storeID: StoreValue
     }
     
     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "/edit-storeProduct-form", true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     // Tell our AJAX request how to resolve
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
 
             location.reload();
 
         }
         else if (xhttp.readyState == 4 && xhttp.status != 200) {
             console.log("There was an error with the input.")
         }
     }
 
     // Send the request and wait for the response
     xhttp.send(JSON.stringify(data));
 
 })


 function updateForm() {
    
    let table = document.getElementById("storeProducts-table");
    let storeProductID = document.getElementById("edit-storeProductID").value;

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == storeProductID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            document.getElementById("edit-storeProductID").value = updateRowIndex.getElementsByTagName("td")[2].innerHTML;
            document.getElementById("edit-quantity").value = updateRowIndex.getElementsByTagName("td")[3].innerHTML;
            document.getElementById("edit-dateOrdered").value = updateRowIndex.getElementsByTagName("td")[4].innerHTML;
            document.getElementById("edit-deliveryDate").value = updateRowIndex.getElementsByTagName("td")[5].innerHTML;
            document.getElementById("edit-totalDue").value = updateRowIndex.getElementsByTagName("td")[6].innerHTML;
            document.getElementById("edit-invoiceDueDate").value = updateRowIndex.getElementsByTagName("td")[7].innerHTML;

            
            let dropdown1 = document.getElementById("edit-productID");
            let dropdown2 = document.getElementById("edit-storeID");

            /*Citation for how to loop through all values of a drop down:
            Date: 3/4/2024
            Source URL: https://tech.chandrahasa.com/2015/05/08/javascript-iterate-through-all-options-of-dropdown-list/
            */
            
            for (let i = 0; i < dropdown1.options.length; i++) {
                if (dropdown1.options[i].text == updateRowIndex.getElementsByTagName("td")[8].innerHTML) {
                    dropdown1.selectedIndex = i;
                    break;
                }
            }
            for (let i = 0; i < dropdown2.options.length; i++) {
                if (dropdown2.options[i].text == updateRowIndex.getElementsByTagName("td")[10].innerHTML) {
                    dropdown2.selectedIndex = i;
                    break;
                }
            }
            
        }
 
        }   
}
