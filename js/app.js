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
}

const entries = document.querySelector('tbody');

person_1 = new Person('Tarlan', 'Soltanov', 'tarlan@example.com', '16')

users.push(person_1);

for (var i = 0; i < users.length; i++) {
    var row = document.createElement('tr');
    row.innerHTML = users[i].info(i);
    entries.appendChild(row);
}