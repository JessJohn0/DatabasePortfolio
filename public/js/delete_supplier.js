/*Citation for the following functions:
Date: 2/29/2024
Copied from /OR/ Adapted from /OR/ Based on:
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/

/*Citation for the following functions:
Date: 3/05/2024
Adapted from:
Source URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
*/

//Delete record from table

//Called on button click
//a pop-up window will ask the user to confirm the deletion
function deleteSupplier(supplierID) {
  var userResponse = confirm("Do you want to delete supplier?");
  if (!userResponse) {
    return;
  }
    let link = '/delete-supplier-form/';
    let data = {
      id: supplierID
     };
  
    //Passes along the ID in the delete request
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
      deleteRow(supplierID);
      }
    });
  }
  
  //Delete any rows in the dropdown that match the ID in the delete request
  function deleteRow(supplierID){
  
      let table = document.getElementById("suppliers-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
  
         if (table.rows[i].getAttribute("data-value") == supplierID) {
              table.deleteRow(i);
              break;
         }
      }
  }
  
  function deleteDropDownMenu(supplierID){
      let selectMenu = document.getElementById("edit-supplierID");
      for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(supplierID)){
          selectMenu[i].remove();
          break;
        } 
    
      }
    }
  