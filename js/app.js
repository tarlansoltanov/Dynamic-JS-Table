var users = [] // For storing entries

class Person {
    constructor(name, surname, email, age) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
    }

    info(index) {
        // This method will fill row with users info
        return `<td>${index+1}</td>
        <td>${this.name}</td>
        <td>${this.surname}</td>
        <td>${this.email}</td>
        <td>${this.age}</td>
        <td>
            <a href="#" class="btn btn-sm btn-default" id="edit">
                <i class="far fa-edit"></i>
            </a>
            <a href="#" class="btn btn-sm btn-default" id="remove">
                <i class="far fa-trash-alt"></i>
            </a>
        </td>`
    }

    edit(name, surname, email, age){
        // This method will edit persons info with given data
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
    }
}

const addBtn = document.querySelector('#add'); // Add Button

const entries = document.querySelector('tbody'); // All entries

var check = false; // Checking the add row is exist or not

var edit = false; // Checking the any row is editing or not

// Filling table with users info
for (var i = 0; i < users.length; i++) {
    var row = document.createElement('tr');
    row.innerHTML = users[i].info(i);
    entries.appendChild(row);
    addListeners(row);
}

// Event Listener for add button
// This will add a row with inputs to the table
addBtn.addEventListener("click", () => {
    if (check == true) {
        // Checking add row exist or not
        return false;
    }
    var row = document.createElement("tr");
    row.innerHTML = `<td>${users.length + 1}</td>
                    <td><input type="text" id="name" class="form-control input-sm"/></td>
                    <td><input type="text" id="surname" class="form-control input-sm"/></td>
                    <td><input type="text" id="email" class="form-control input-sm"/></td>
                    <td><input type="text" id="age" class="form-control input-sm"/></td>
                    <td>
                    <a href="#" class="btn btn-sm btn-default" id="success">
                        <i class="far fa-check"></i>
                    </a>
                    <a href="#" class="btn btn-sm btn-default" id="cancel">
                        <i class="far fa-times"></i>
                    </a>
                    </td>`
    // Adding event listener for removing the row
    row.querySelector('#cancel').addEventListener("click", () => {
        removeRow(row);
        check = false;
    })
    // Adding event listener for adding info's in row
    row.querySelector('#success').addEventListener("click", () => {
        addEntry(row);
        check = false;
    })
    entries.appendChild(row);
    check = true;
    return true;
})

// Function for removing the given row
function removeRow(row) {
    var removedIndex = row.children[0].innerHTML;
    users.splice(removedIndex - 1,1);
    row.remove();
    adjustIndices();
}

// Function for adjust indexes in table's rows
function adjustIndices() {
    for (var i = 0; i < entries.children.length; i++) {
        entries.children[i].children[0].innerHTML = i+1;
    }
}

// Function for adding entries to the list in the given row's inputs
function addEntry(row) {
    users.push(new Person(row.querySelector('#name').value, 
        row.querySelector('#surname').value, 
        row.querySelector('#email').value, 
        row.querySelector('#age').value));
    index = parseInt(row.children[0].innerHTML)-1;
    row.innerHTML = users[index].info(index);
    addListeners(row);
}

// Function for editing etries in given row
function editEntry(row) {
    if(edit==true){
        return false;
    }
    edit = true;
    index = parseInt(row.children[0].innerHTML)-1;
    row.innerHTML = `
            <td>${index + 1}</td>
            <td><input type="text" id="name" class="form-control input-sm" value="${users[index].name}"/></td>
            <td><input type="text" id="surname" class="form-control input-sm" value="${users[index].surname}"/></td>
            <td><input type="text" id="email" class="form-control input-sm" value="${users[index].email}"/></td>
            <td><input type="text" id="age" class="form-control input-sm" value="${users[index].age}"/></td>
            <td>
                <a href="#" class="btn btn-sm btn-default" id="success">
                    <i class="far fa-check"></i>
                </a>
                <a href="#" class="btn btn-sm btn-default" id="cancel">
                    <i class="far fa-times"></i>
                </a>
            </td>
            `
    row.querySelector('#success').addEventListener("click", ()=>{
        users[index].edit(row.querySelector('#name').value, 
            row.querySelector('#surname').value, 
            row.querySelector('#email').value, 
            row.querySelector('#age').value);
        row.innerHTML = users[index].info(index);
        edit = false;
        addListeners(row);
    })
    row.querySelector('#cancel').addEventListener("click", () => {
        row.innerHTML = users[index].info(index);
        addListeners(row);
    })
}

// Function for adding event listeners to given row
function addListeners(row){
    row.querySelector('#remove').addEventListener("click", () => {
        removeRow(row);
    })
    row.querySelector('#edit').addEventListener("click", ()=>{
        editEntry(row);
    })
}