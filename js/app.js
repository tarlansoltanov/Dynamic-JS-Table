var users = []

class Person {
    constructor(name, surname, email, age) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
    }

    info(index) {
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
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
    }
}

const addBtn = document.querySelector('#add');

const entries = document.querySelector('tbody');

var check = true;

var edit = false;

for (var i = 0; i < users.length; i++) {
    var row = document.createElement('tr');
    row.innerHTML = users[i].info(i);
    entries.appendChild(row);
    addListeners(row);
}

addBtn.addEventListener("click", () => {
    if (check == false) {
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
    row.querySelector('#cancel').addEventListener("click", () => {
        removeRow(row);
        check = true;
    })
    row.querySelector('#success').addEventListener("click", () => {
        addEntry(row);
        check = true;
    })
    entries.appendChild(row);
    check = false;
    return true;
})

function removeRow(row) {
    var removedIndex = row.children[0].innerHTML;
    users.splice(removedIndex - 1,1);
    row.remove();
    adjustIndices();
}

function adjustIndices() {
    for (var i = 0; i < entries.children.length; i++) {
        entries.children[i].children[0].innerHTML = i+1;
    }
}

function addEntry(row) {
    users.push(new Person(row.querySelector('#name').value, 
        row.querySelector('#surname').value, 
        row.querySelector('#email').value, 
        row.querySelector('#age').value));
    index = parseInt(row.children[0].innerHTML)-1;
    row.innerHTML = users[index].info(index);
    addListeners(row);
}

function editEntry(row) {
    console.log(row);
    if(edit==true){
        return false;
    }
    edit = true;
    index = parseInt(row.children[0].innerHTML)-1;
    console.log(index);
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

function addListeners(row){
    row.querySelector('#remove').addEventListener("click", () => {
        removeRow(row);
    })
    row.querySelector('#edit').addEventListener("click", ()=>{
        editEntry(row);
    })
}