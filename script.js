function saveTasks() {
    const nowList = Array.from(document.querySelectorAll("#nowUl li span")).map(span => span.textContent);
    const doneList = Array.from(document.querySelectorAll("#doneUl li span")).map(span => span.textContent);
  
    localStorage.setItem("nowTasks", JSON.stringify(nowList));
    localStorage.setItem("doneTasks", JSON.stringify(doneList));
  }
  
  function loadTasks() {
    const nowList = JSON.parse(localStorage.getItem("nowTasks")) || [];
    const doneList = JSON.parse(localStorage.getItem("doneTasks")) || [];
    const nowUl = document.getElementById("nowUl") || createNewList();
    const doneUl = document.getElementById("doneUl") || createDoneList();
    const pNow = document.getElementById("now");
    const pDone = document.getElementById("done");
    const list = document.getElementsByClassName('list')[0];
    const List = document.getElementsByClassName("doneList")[0];
  
    nowUl.innerHTML = "";
    doneUl.innerHTML = "";
  
    nowList.forEach(task => {
      const li = createTaskElement(task);
      nowUl.appendChild(li);
    });
  
    doneList.forEach(task => {
      const li = createTaskElement(task);
      doneUl.appendChild(li);
    });

    const li = list.querySelectorAll("li");
    const liDone = List.querySelectorAll("li");

    if (li.length !=0) {
      pNow.remove();
    } 

    if (liDone.length !=0) {
      pDone.remove();
    } 
}

  
  function addTask() {
    const input = document.getElementById("input").value;
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const p = document.getElementById("now");
  
    const repitTask = Array.from(document.querySelectorAll("li span")).some((span) => span.textContent === input);
  
    if (input === "") {
      alert("Вы не ввели задачу, попробуйте еще раз");
      return;
    }
  
    if (input.length > 70) {
      alert("Задача слишком длинная, попробуйте еще раз(не более 70 символов)");
      return;
    }
  
    if (repitTask) {
      alert("Такая задача уже есть, попробуйте еще раз");
      return;
    }
  
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
    document.getElementById("input").value = "";
  
    saveTasks();
  }
  
  function createNewList() {
    const list = document.getElementsByClassName('list')[0];
    const ul = document.createElement("ul");
    ul.id = "nowUl";
    list.appendChild(ul);
    return ul;
  }
  
  function createDoneList() {
    const doneList = document.getElementsByClassName('doneList')[0];
    const ul = document.createElement("ul");
    ul.id = "doneUl";
    doneList.appendChild(ul);
    return ul;
  }
  
  function createTaskElement(task) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement("button");
  
    button.textContent = "X";
    button.id = "delete";
    checkbox.type = "checkbox";
    checkbox.id = "check";
    span.textContent = task;
  
    li.appendChild(span);
    li.appendChild(checkbox);
    li.appendChild(button);
  
    return li;
  }
  
  function removeTask() {
    this.parentElement.remove();
    const list = document.getElementsByClassName('list')[0];
    const doneList = document.getElementsByClassName('doneList')[0];
    const liNow = list.querySelectorAll("li");
    const liDone = doneList.querySelectorAll("li");
    const pNow = document.getElementById("now");
    const pDone = document.getElementById("done");
  
    createParagraph(liNow, pNow, list);
    createParagraph(liDone, pDone, doneList);
  
    saveTasks();
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
        const newUl = createDoneList();
        newUl.appendChild(li);
        const liNow = list.querySelectorAll("li");
        createParagraph(liNow, pNow, list);
      } else {
        pDone?.remove();
        ul.appendChild(li);
        const liNow = list.querySelectorAll("li");
        createParagraph(liNow, pNow, list);
      }
    } else {
      pNow?.remove();
      const ul = document.getElementById('nowUl') || createNewList();
      ul.appendChild(li);
      const liDone = doneList.querySelectorAll("li");
      createParagraph(liDone, pDone, doneList);
    }
  
    saveTasks();
  }
  
  function createParagraph(arr, p, list) {
    if (arr.length === 0 && !p) {
      const newP = document.createElement("p");
      newP.textContent = list.classList.contains("list") ? "Нет задач" : "Нет выполненных задач";
      newP.id = list.classList.contains("list") ? "now" : "done";
      list.appendChild(newP);
    }
  }
  
  window.addEventListener("DOMContentLoaded", loadTasks);
  
  const add = document.getElementById("add");
  add.addEventListener("click", addTask);
  const inputTask = document.getElementById("input");
  inputTask.addEventListener("keydown", (e) => e.key === "Enter" ? addTask() : null);
  
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
  