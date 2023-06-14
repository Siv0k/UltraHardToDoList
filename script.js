function addTask() {
    const input = document.getElementById("input").value;

    if (input === "") {
        alert("Вы не ввели задачу, попробуйте еще раз");
        return;
    }
    
    const repitTask = Array.from(document.querySelectorAll("li span")).some((span) => span.textContent === input);

    if (repitTask) {
        alert("Такая задача уже есть, попробуйте еще раз");
        return;
    }
    
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement("button");
    
    button.textContent = "X";
    button.id = "delete";
    checkbox.type = "checkbox";
    checkbox.id = "check";
    span.textContent = input;

    li.appendChild(span);
    li.appendChild(checkbox);
    li.appendChild(button);

    const ul = document.getElementById("nowUl") || createNewList();
    ul.appendChild(li);
}

function createNewList() {
    const list = document.getElementsByClassName('list')[0];
    const p = document.getElementById("now");
    const ul = document.createElement("ul");
    ul.id = "nowUl";
    list.appendChild(ul);
    p?.remove();
    return ul;
}

function removeTask() {
    this.parentElement.remove();
    const list = document.getElementsByClassName('list')[0];
    const doneList = document.getElementsByClassName('doneList')[0];
    const li = list.querySelectorAll("li");
    const p = document.getElementById("now");

    if (li.length === 0 && !p) {
        const newP = document.createElement("p");
        newP.textContent = "Нет задач";
        newP.id = "now";
        list.appendChild(newP);
    }
}

function checkTask() {
    const doneList = document.getElementsByClassName("doneList")[0];
    const ul = doneList.querySelector("ul");
    const p = doneList.querySelector("p");
    const li = this.parentElement;

    if (this.checked) {
        if (!ul) {
            p?.remove();
            const newUl = document.createElement("ul");
            newUl.id = "doneUl";
            doneList.appendChild(newUl);
            newUl.appendChild(li);
        } else {
            ul.appendChild(li);
        }
    } else {
        const ul = document.getElementById('nowUl');
        ul.appendChild(li);
    }
}

document.getElementById("add").addEventListener("click", addTask);

document.addEventListener("click", (e) => { 
    if (e.target.id === "delete") {
        removeTask.call(e.target);
    }
});

document.addEventListener("click", (e) => { 
    if (e.target.id === "check") {
        checkTask.call(e.target);
    }
});