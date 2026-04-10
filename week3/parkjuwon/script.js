let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let list = document.querySelector("#list");

let allBtn = document.querySelector("#all");
let doneBtn = document.querySelector("#done");
let notDoneBtn = document.querySelector("#notDone");

let countText = document.querySelector("#count"); 
let allDoneBtn = document.querySelector("#allDone");

let todos = [];
let mode = "all";

addBtn.addEventListener("click", () => {
    addTodo();
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

allBtn.addEventListener("click", () => {
    mode = "all";
    render();
});

doneBtn.addEventListener("click", () => {
    mode = "done";
    render();
});

notDoneBtn.addEventListener("click", () => {
    mode = "notDone";
    render();
});

allDoneBtn.addEventListener("click", () => {
    todos.forEach(todo => todo.done = true);
    render();
});

function addTodo() {
    let text = input.value.trim();
    if (text === "") return;

    todos.push({
        text: text,
        done: false
    });

    input.value = "";
    input.focus();
    render();
}

function render() {
    list.innerHTML = "";

    let filtered = todos;

    if (mode === "done") {
        filtered = todos.filter(todo => todo.done);
    } else if (mode === "notDone") {
        filtered = todos.filter(todo => !todo.done);
    }

    let remaining = todos.filter(todo => !todo.done).length;
    countText.textContent = remaining;

    filtered.forEach(todo => {
        let li = document.createElement("li");

        let check = document.createElement("div");
        check.className = `check ${todo.done ? "checked" : ""}`;

        check.addEventListener("click", () => {
            todo.done = !todo.done;
            render();
        });

        let span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.done) {
            li.classList.add("done");
        }

        li.append(check, span);
        list.appendChild(li);
    });
}