function saveTasks() {
  const nowList = Array.from(document.querySelectorAll("#nowUl li span")).map(span => span.textContent);
  const doneList = Array.from(document.querySelectorAll("#doneUl li span")).map(span => span.textContent);
  const nowChecked = Array.from(document.querySelectorAll("#nowUl li input[type='checkbox']")).map(checkbox => checkbox.checked);
  const doneChecked = Array.from(document.querySelectorAll("#doneUl li input[type='checkbox']")).map(checkbox => checkbox.checked);

  localStorage.setItem("nowTasks", JSON.stringify(nowList));
  localStorage.setItem("doneTasks", JSON.stringify(doneList));
  localStorage.setItem("nowChecked", JSON.stringify(nowChecked));
  localStorage.setItem("doneChecked", JSON.stringify(doneChecked));
}
  
  function loadTasks() {
    const nowList = JSON.parse(localStorage.getItem("nowTasks")) || [];
    const doneList = JSON.parse(localStorage.getItem("doneTasks")) || [];
    const nowChecked = JSON.parse(localStorage.getItem("nowChecked")) || [];
    const doneChecked = JSON.parse(localStorage.getItem("doneChecked")) || [];
    const nowUl = document.getElementById("nowUl") || createNewList();
    const doneUl = document.getElementById("doneUl") || createDoneList();
    const noTasksMessage = document.getElementById("noTasksMessage");
    const doneTasksMessage = document.getElementById("doneTasksMessage");
    const listContainer = document.getElementsByClassName('listContainer')[0];
    const doneListContainer = document.getElementsByClassName("doneListContainer")[0];
  
    nowUl.innerHTML = "";
    doneUl.innerHTML = "";
  
    nowList.forEach((task, index) => {
      const li = createTaskElement(task);
      const checkbox = li.querySelector("input[type='checkbox']");
      checkbox.checked = nowChecked[index];
      nowUl.appendChild(li);
    });
  
    doneList.forEach((task, index) => {
      const li = createTaskElement(task);
      const checkbox = li.querySelector("input[type='checkbox']");
      checkbox.checked = doneChecked[index];
      doneUl.appendChild(li);
    });

    const li = listContainer.querySelectorAll("li");
    const liDone = doneListContainer.querySelectorAll("li");

    if (li.length != 0) {
      noTasksMessage.remove();
    }
  
    if (liDone.length != 0) {
      doneTasksMessage.remove();
    }

    document.addEventListener("click", (e) => {
      if (e.target.id === "delete") {
        removeTask.call(e.target);
      }
      if (e.target.id === "check") {
        checkTask.call(e.target);
      }
    });
    
}

  
  function addTask() {
    const input = document.getElementById("input").value;
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const noTasksMessage = document.getElementById("noTasksMessage");
  
    const repitTask = Array.from(document.querySelectorAll("li span")).some((span) => span.textContent === input);
  
    if (input === "") {
      alert("Вы не ввели задачу, попробуйте еще раз");
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
    noTasksMessage?.remove();
    ul.appendChild(li);
    document.getElementById("input").value = "";

    saveTasks();
  }
  
  function createNewList() {
    const listContainer = document.getElementsByClassName('listContainer')[0];
    const ul = document.createElement("ul");
    ul.id = "nowUl";
    listContainer.appendChild(ul);
    return ul;
  }
  
  function createDoneList() {
    const doneListContainer = document.getElementsByClassName('doneListContainer')[0];
    const ul = document.createElement("ul");
    ul.id = "doneUl";
    doneListContainer.appendChild(ul);
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
    const listContainer = document.getElementsByClassName('listContainer')[0];
    const doneListContainer = document.getElementsByClassName('doneListContainer')[0];
    const liNow = listContainer.querySelectorAll("li");
    const liDone = doneListContainer.querySelectorAll("li");
    const noTasksMessage = document.getElementById("noTasksMessage");
    const doneTasksMessage = document.getElementById("doneTasksMessage");

    createParagraph(liNow, noTasksMessage, listContainer);
    createParagraph(liDone, doneTasksMessage, doneListContainer);
  
    saveTasks();
  }
  
  function checkTask() {
    const listContainer = document.getElementsByClassName('listContainer')[0];
    const doneListContainer = document.getElementsByClassName('doneListContainer')[0];
    const ul = doneListContainer.querySelector("ul");
    const noTasksMessage = document.getElementById("noTasksMessage");
    const doneTasksMessage = document.getElementById("doneTasksMessage");
    const li = this.parentElement;
  
    if (this.checked) {
      if (!ul) {
        doneTasksMessage?.remove();
        const newUl = createDoneList();
        newUl.appendChild(li);
        const liNow = listContainer.querySelectorAll("li");
        createParagraph(liNow, noTasksMessage, listContainer);
      } else {
        doneTasksMessage?.remove();
        ul.appendChild(li);
        const liNow = listContainer.querySelectorAll("li");
        createParagraph(liNow, noTasksMessage, listContainer);
      }
    } else {
      noTasksMessage?.remove();
      const ul = document.getElementById('nowUl') || createNewList();
      ul.appendChild(li);
      const liDone = doneListContainer.querySelectorAll("li");
      createParagraph(liDone, doneTasksMessage, doneListContainer);
    }
  
    saveTasks();
  }
  
  function createParagraph(arr, p, listContainer) {
    if (arr.length === 0 && !p) {
      const newP = document.createElement("p");
      newP.textContent = listContainer.classList.contains("listContainer") ? "Нет задач" : "Нет выполненных задач";
      newP.id = listContainer.classList.contains("listContainer") ? "noTasksMessage" : "doneTasksMessage";
      listContainer.appendChild(newP);
    }
  }
  
  window.addEventListener("DOMContentLoaded", loadTasks);
  
  const add = document.getElementById("add");
  add.addEventListener("click", addTask);
  const inputTask = document.getElementById("input");
  inputTask.addEventListener("keydown", (e) => e.key === "Enter" ? addTask() : null);
  