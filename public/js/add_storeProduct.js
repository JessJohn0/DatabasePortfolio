/*Citation for the following functions:
Date: 2/29/2024
Copied from /OR/ Adapted from /OR/ Based on:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

let addStoreProductForm = document.getElementById('add-storeProduct-form');
    
// Modify the objects we need
addStoreProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    var addQuantity = document.getElementById("add-quantity");
    var addDateOrdered = document.getElementById("add-dateOrdered");
    var addDeliveryDate = document.getElementById("add-deliveryDate");
    var addInvoiceDueDate = document.getElementById("add-invoiceDueDate");
    var addProduct = document.getElementById("add-productID");
    var addStore = document.getElementById("add-storeID");

    // Get the values from the form fields
    let QuantityValue = addQuantity.value;
    let DateOrderedValue = addDateOrdered.value;
    let DeliveryDateValue = addDeliveryDate.value;
    let InvoiceDueDateValue = addInvoiceDueDate.value;
    let ProductValue = addProduct;
    let StoreValue = addStore; 

    // Put our data we want to send in a javascript object
    let data = {
        quantity: QuantityValue,
        dateOrdered: DateOrderedValue,
        deliveryDate: DeliveryDateValue,
        invoiceDueDate: InvoiceDueDateValue,
        productID: ProductValue.value,
        storeID: StoreValue.value 
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-storeProduct-form", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
 
            // Clear the input fields for another store product
            addQuantity.value = '';
            addDateOrdered.value = '';
            addDeliveryDate.value = '';
            addInvoiceDueDate.value = '';
            addProduct.value = '';
            addStore.value = '';
            
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input." + " " + xhttp.status);
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})