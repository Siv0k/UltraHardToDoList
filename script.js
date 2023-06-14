function addTask() {
    const input = document.getElementById("input").value;

    if (input === "") {
        alert("Вы не ввели задачу, попробуйте еще раз");
        return;
    }

    if (input.length > 70) {
        alert("Задача слишком длинная, попробуйте еще раз(не более 70 символов)");
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
    const p = document.getElementById("now");

    button.textContent = "X";
    button.id = "delete";
    checkbox.type = "checkbox";
    checkbox.id = "check";
    span.textContent = input;

    li.appendChild(span);
    li.appendChild(checkbox);
    li.appendChild(button);

    const ul = document.getElementById("nowUl") || createNewList();
    p?.remove();
    ul.appendChild(li);
}

function createNewList() {
    const list = document.getElementsByClassName('list')[0];
    const ul = document.createElement("ul");
    ul.id = "nowUl";
    list.appendChild(ul);
    return ul;
}

function removeTask() {
    this.parentElement.remove();
    const list = document.getElementsByClassName('list')[0];
    const doneList = document.getElementsByClassName('doneList')[0];
    const liNow = list.querySelectorAll("li");
    const liDone = doneList.querySelectorAll("li");
    const pNow = document.getElementById("now");
    const pDone = document.getElementById("done");

    createP(liNow, pNow, list);
    createP(liDone, pDone, doneList);
}

function checkTask() {
    const list = document.getElementsByClassName('list')[0];
    const doneList = document.getElementsByClassName("doneList")[0];
    const ul = doneList.querySelector("ul");
    const pNow = document.getElementById("now");
    const pDone = document.getElementById("done");
    const li = this.parentElement;

    if (this.checked) {
        if (!ul) {
            pDone?.remove();
            const newUl = document.createElement("ul");
            newUl.id = "doneUl";
            doneList.appendChild(newUl);
            newUl.appendChild(li);
            const liNow = list.querySelectorAll("li");
            createP(liNow, pNow, list);
        } else {
            pDone?.remove();
            ul.appendChild(li);
            const liNow = list.querySelectorAll("li");
            createP(liNow, pNow, list);
        }
    } else {
        pNow?.remove();
        const ul = document.getElementById('nowUl');
        ul.appendChild(li);
        const liDone = doneList.querySelectorAll("li");
        createP(liDone, pDone, doneList);
    }
}

function createP(arr, p, list) {
    if (arr.length === 0 && !p) {
        const newP = document.createElement("p");
        newP.textContent = list.classList.contains("list") ? "Нет задач" : "Нет выполненных задач";
        newP.id = list.classList.contains("list") ? "now" : "done";
        list.appendChild(newP);
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