const nav = document.getElementById("nav");
const openMenuBtn = document.getElementById("openMenu");
const closeMenuBtn = document.getElementById("closeMenu");
const openTaskMenuBtn = document.getElementById("openTaskMenu");
const closeTaskMenuBtn = document.getElementById("closeTaskMenu");
const taskMenu = document.getElementById("taskMenu");
const taskList = document.getElementById("taskList");

const taskHTML =
`<li class="task">
<div class="align-left">
    <div class="check-box task-icon"></div>

    <h2 class="title"></h2>
</div>

<div class="align-right">
    <img class="edit-icon task-icon" src="images/edit.svg" alt="edit icon">

    <img class="remove-task-icon task-icon" src="images/round-close-white.svg" alt="remove task icon">
</div>
</li>`;

const elementFromHTML = (html) => {
    const taskTemplate = document.createElement("template");
    taskTemplate.innerHTML = html.trim();
    return taskTemplate.content.firstElementChild;
}

// const addTask = () => {
//     const newTask = elementFromHTML(taskHTML);
//     taskList.appendChild(newTask);
// }

function taskCreator(title) {
    this.title = title;
}

openMenuBtn.addEventListener("click", () => nav.classList.add("nav-active"));
closeMenuBtn.addEventListener("click", () => nav.classList.remove("nav-active"));
openTaskMenuBtn.addEventListener("click", () => taskMenu.classList.remove("hidden"));
closeTaskMenuBtn.addEventListener("click", () => taskMenu.classList.add("hidden"));

