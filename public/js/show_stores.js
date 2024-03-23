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
function showEditForm(storeID) {
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('table-container').style.display = 'block';
    document.getElementById('add-form-container').style.display = 'none';
    document.getElementById('edit-form-container').style.display = 'block';

    let table = document.getElementById("stores-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == storeID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            document.getElementById("edit-storeID").value = updateRowIndex.getElementsByTagName("td")[2].innerHTML;
            document.getElementById("edit-address").value = updateRowIndex.getElementsByTagName("td")[3].innerHTML;
            document.getElementById("edit-city").value = updateRowIndex.getElementsByTagName("td")[4].innerHTML;
            document.getElementById("edit-state").value = updateRowIndex.getElementsByTagName("td")[5].innerHTML;
            document.getElementById("edit-telephone").value = updateRowIndex.getElementsByTagName("td")[6].innerHTML;
            document.getElementById("edit-email").value = updateRowIndex.getElementsByTagName("td")[7].innerHTML;

            let dropdown = document.getElementById("edit-locationType");
            
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
       }
    }
 
}
