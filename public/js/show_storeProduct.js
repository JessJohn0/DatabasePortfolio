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
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('table-container').style.display = 'block';
    document.getElementById('add-form-container').style.display = 'block';
    document.getElementById('edit-form-container').style.display = 'none';
}

// When "Edit..." is clicked on, search, table, and edit are displayed as blocks and the add form is not displayed.
function showEditForm(storeProductID) {
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('table-container').style.display = 'block';
    document.getElementById('add-form-container').style.display = 'none';
    document.getElementById('edit-form-container').style.display = 'block';

    let table = document.getElementById("storeProducts-table");

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
                //break;
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
}