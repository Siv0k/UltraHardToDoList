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
        console.log(taskTekst);
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
    if (e.target.id === "delete") {
        e.target.parentElement.remove();
    }
});
