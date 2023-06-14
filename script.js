function addTask() {
    const list = document.getElementsByClassName('list')[0];
    const input = document.getElementById("input").value;
    const p = document.getElementById("now");
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const button = document.createElement("button");
    const nowLi = document.querySelectorAll("li");
    const span = document.createElement("span");
  

    button.textContent = "X";
    button.id = "delete";
    checkbox.type = "checkbox";
    checkbox.id = "check";
    span.textContent = input;
    let exit = false;

    if (input === "") {
        alert("Вы не ввели задачу, попробуйте еще раз");
        return;
    }
    
    nowLi.forEach( (li) => {
        const taskTekst = li.querySelector("span").textContent;
        if (taskTekst == input) {
            alert("Такая задача уже есть");
            exit = true;
            return;
        }
    });

    if (exit) {
        return;
    }

    if (!ul) {
        p.remove();
        const newUl = document.createElement("ul");
        newUl.id = "nowUl";
        list.appendChild(newUl);
        newUl.appendChild(li);
        li.appendChild(span);
        li.appendChild(checkbox);
        li.appendChild(button);
    } else {
        ul.appendChild(li); 
        li.appendChild(span);
        li.appendChild(checkbox);
        li.appendChild(button);
    }
}
    

document.getElementById("add").addEventListener("click", addTask);

document.addEventListener("click", function(e) {
    const list = document.getElementsByClassName('list')[0];
    const li = list.querySelectorAll("li");
    const p = document.getElementById("now");
    if (e.target.id === "delete") {
        e.target.parentElement.remove();
    }
    if (li.length === 0 && !p) {
        const p = document.createElement("p");
        p.textContent = "Нет задач";
        p.id = "now";
        list.appendChild(p);
    }
});


document.addEventListener("click", function(e) {
    const doneList = document.getElementsByClassName("doneList")[0];
    const ul = doneList.querySelector("ul");
    p = doneList.querySelector("p");
    if (e.target.id === "check") {
        if (e.target.checked) {
            if (!ul) {
            p.remove();
            const newUl = document.createElement("ul");
            newUl.id = "doneUl";
            doneList.appendChild(newUl);
            newUl.appendChild(e.target.parentElement);
            } else {  
            ul.appendChild(e.target.parentElement);
            }
        } else {
            const ul = document.getElementById('nowUl');
            ul.appendChild(e.target.parentElement);
        }
    }
});