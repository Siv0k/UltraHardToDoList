function saveTasks() {
  const tasksArray = [];
  const nowListArray = document.querySelectorAll("#nowUl li span");
  const nowCheckedArray = document.querySelectorAll("#nowUl li input[type='checkbox']");
  const doneListArray = document.querySelectorAll("#doneUl li span");
  const doneCheckedArray = document.querySelectorAll("#doneUl li input[type='checkbox']");
  
  nowListArray.forEach((span, index) => {
    const task = {
      text: span.textContent,
      done: nowCheckedArray[index].checked
    };
    tasksArray.push(task);
  });
  
  doneListArray.forEach((span, index) => {
    const task = {
      text: span.textContent,
      done: doneCheckedArray[index].checked
    };
    tasksArray.push(task);
  });

  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
  
  function loadTasks() {
    const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
    const nowUl = document.getElementById("nowUl") || createNewList();
    const doneUl = document.getElementById("doneUl") || createDoneList();
  
    nowUl.innerHTML = "";
    doneUl.innerHTML = "";
  
    tasksArray.forEach(task => {
      const li = createTaskElement(task.text);
      const checkbox = li.querySelector("input[type='checkbox']");
      checkbox.checked = task.done;
  
      if (task.done) {
        doneUl.appendChild(li);
      } else {
        nowUl.appendChild(li);
      }
    });
  
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
    const spanArray = Array.from(document.querySelectorAll("li span"));
    const repitTask = Array.from(spanArray).some((span) => span.textContent === input);
    const nowUl = document.getElementById("nowUl")
  
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
  
    const ul = nowUl || createNewList();
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
    saveTasks();
  }
  
  function checkTask() {
    const doneListContainer = document.getElementsByClassName('doneListContainer')[0];
    const ul = doneListContainer.querySelector("ul");
    const li = this.parentElement;
  
    if (this.checked) {
      if (!ul) {
        const newUl = createDoneList();
        newUl.appendChild(li);
      } else {
        ul.appendChild(li);
      }
    } else {
      const nowUl = document.getElementById('nowUl') || createNewList();
      nowUl.appendChild(li);
    }
  
    saveTasks();
  }
  
  window.addEventListener("DOMContentLoaded", loadTasks);
  
  const add = document.getElementById("add");
  add.addEventListener("click", addTask);

  const inputTask = document.getElementById("input");
  inputTask.addEventListener("keydown", (e) => {
    if(e.key === "Enter") addTask()});
  