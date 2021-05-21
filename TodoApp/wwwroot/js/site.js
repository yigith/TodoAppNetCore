

const frmNewTodo = document.getElementById("frmNewTodo");

frmNewTodo.onsubmit = function (event) {
    event.preventDefault();
    const newTodo = document.getElementById("newTodo").value;
    this.reset();
    const data = {
        id: 0,
        name: newTodo,
        isComplete: false
    };
    fetch("api/TodoItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => addTodoItem(data));
};

function addTodoItem(todo) {
    const tbody = document.getElementById("todos");
    let tr = tbody.insertRow();
    if (todo.isComplete) {
        tr.classList.add("completed");
    }
    tr.id = "row-" + todo.id;
    let td1 = tr.insertCell();
    let checkbox = document.createElement("input");
    checkbox.checked = todo.isComplete;
    checkbox.setAttribute("type", "checkbox");
    checkbox.onchange = onStatusChange;
    checkbox.todoId = todo.id;
    td1.appendChild(checkbox);

    let td2 = tr.insertCell();
    let textNode = document.createTextNode(todo.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell();
    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-danger");
    btnDelete.textContent = "Delete";
    btnDelete.setAttribute("onclick", `deleteItem(${todo.id})`);
    td3.appendChild(btnDelete);

    let td4 = tr.insertCell();
}

function onStatusChange(event) {
    let id = this.todoId;
    let isComplete = this.checked;
    let data = { id, isComplete };
    let tr = document.getElementById("row-" + id);
    fetch("api/TodoItems/UpdateStatus/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                if (isComplete) {
                    tr.classList.add("completed");
                }
                else {
                    tr.classList.remove("completed");
                }
            }
        });
}

function deleteItem(id) {
    fetch("api/TodoItems/" + id, {
        method: "DELETE"
    })
        .then(() => deleteRow(id));
}

function deleteRow(id) {
    let tr = document.getElementById("row-" + id);
    tr.remove();
}

function getItems() {
    fetch("api/TodoItems")
        .then(response => response.json())
        .then(data => displayItems(data));
}

function displayItems(todos) {
    const tbody = document.getElementById("todos");
    tbody.innerHTML = "";

    for (const todo of todos) {
        addTodoItem(todo);
    }
}

getItems();