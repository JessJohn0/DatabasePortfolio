/*Citation for the following functions:
Date: 2/29/2024
Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box
Source URL: 
*/

/*Citation for the following functions:
Date: 2/29/2024
Adapted from: 
Source URL: https://www.w3schools.com/jsref/prop_style_display.asp
*/

//When to show table, add form, and edit form

// When "Add..." is clicked on, search, table, and add are displayed as blocks and the edit form is not displayed. 
function showAddForm() {
    document.getElementById('table-container').style.display = 'block';
    document.getElementById('add-form-container').style.display = 'block';
    document.getElementById('edit-form-container').style.display = 'none';
}

// When "Edit..." is clicked on, search, table, and edit are displayed as blocks and the add form is not displayed.
function showEditForm(supplierID) {
    document.getElementById('table-container').style.display = 'block';
    document.getElementById('add-form-container').style.display = 'none';
    document.getElementById('edit-form-container').style.display = 'block';

    let table = document.getElementById("suppliers-table");

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
