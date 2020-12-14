let input = document.querySelector("#text");
let root = document.querySelector("ul");
let All = document.querySelector(".All");
let Completed = document.querySelector(".Completed");
let Active = document.querySelector(".Active");
let Clear = document.querySelector(".Clear");
let item = document.querySelector(".item");

let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

function handleEvent(event) {
  console.log(event.keyCode);
  let value = event.target.value;
  if (event.keyCode === 13 && event.target.value !== "") {
    allTodos.push({
      todo: value,
      isDone: false,
    });
    createUI(allTodos, root);
    event.target.value = "";
  }
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function deleteTodo(event) {
  let id = event.target.dataset.id;

  allTodos.splice(id, 1);
  localStorage.setItem("todos", JSON.stringify(allTodos));
  createUI(allTodos, root);
}

function handleToggle(event) {
  let id = event.target.dataset.id;
  allTodos[id].isDone = !allTodos[id].isDone;

  localStorage.setItem("todos", JSON.stringify(allTodos));

  createUI(allTodos, root);
}

function handleCompleted(event) {
  let completed = allTodos.filter((e) => e.isDone);
  createUI(completed);
}
function handleActive() {
  let active = allTodos.filter((e) => !e.isDone);
  createUI(active);
}
function handleALl() {
  createUI();
}

function createUI(data = allTodos, rootElm = root) {
  rootElm.innerHTML = "";
  data.forEach((elm, index) => {
    let li = document.createElement("li");
    let inp = document.createElement("input");
    inp.type = "checkbox";
    inp.checked = elm.isDone;
    inp.setAttribute("data-id", index);
    inp.addEventListener("input", handleToggle);

    let p = document.createElement("p");
    p.innerText = elm.todo;
    if (elm.isDone == true) {
      p.classList.add("checked");
    }
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.innerText = "X";
    span.innerText = "X";
    span.setAttribute("data-id", index);

    span.addEventListener("click", deleteTodo);

    div.append(span);

    li.append(inp, p, div);
    root.append(li);

    item.innerText = `${allTodos.filter((e) => !e.isDone).length} items left`;
  });
}

input.addEventListener("keyup", handleEvent);
Completed.addEventListener("click", handleCompleted);
Active.addEventListener("click", handleActive);
All.addEventListener("click", handleALl);
