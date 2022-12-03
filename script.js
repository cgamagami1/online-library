const nav = document.getElementById("nav");
const openMenuBtn = document.getElementById("openMenu");
const closeMenuBtn = document.getElementById("closeMenu");
const openTaskMenuBtn = document.getElementById("openTaskMenu");
const closeTaskMenuBtn = document.getElementById("closeTaskMenu");
const taskMenu = document.getElementById("taskMenu");
const editTaskMenu = document.getElementById("editTaskMenu");
const taskListElement = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTask");
const editTaskBtn = document.getElementById("editTask");
const inputTitle = document.getElementById("inputTitle");
const inputDescription = document.getElementById("inputDescription");
const inputDate = document.getElementById("inputDate");
const inputProject = document.getElementById("inputProject");
const editTitle = document.getElementById("editTitle");
const editDescription = document.getElementById("editDescription");
const editDate = document.getElementById("editDate");
const editProject = document.getElementById("editProject");
const taskFilterList = document.getElementById("taskFilterList");
let taskList = [];
let filter = "All Tasks";

const taskHTML =
`<li class="task">
<div class="top">
    <div class="align-left">
        <div class="check-box task-icon"></div>
        <h2 class="title"></h2>
    </div>
    <div class="align-right">
        <img class="edit-icon task-icon" src="images/edit.svg" alt="edit icon">
        <img class="remove-task-icon task-icon" src="images/round-close-white.svg" alt="remove task icon">
    </div>
</div>
<div class="drop-down hidden">
    <p class="description"></p>
    <div class="bottom">
        <p class="date"></p>
        <p class="project"></p>
    </div>
</div>
</li>`;

function elementFromHTML(html) {
    const taskTemplate = document.createElement("template");
    taskTemplate.innerHTML = html.trim();
    return taskTemplate.content.firstElementChild;
}

function taskCreator(title, description, date, project) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.project = project;
    this.isCompleted = false;
}

function openEditTaskMenu(task) {
    editTaskMenu.classList.remove("hidden")
    editTitle.value = task.title;
    editDescription.value = task.description;
    editDate.value = task.date;
    editProject.value = task.project;
    taskList = taskList.filter((item) => item !== task);
}

function addTask(title, description, date, project) {
    const task = new taskCreator(title, description, date, project);
    taskList.push(task);
    taskList = taskList.sort((a, b) => new Date(a.date) - new Date(b.date));
    regenerateTaskElements();
}

function removeTask(task) {
    taskList = taskList.filter((item) => item !== task);
    regenerateTaskElements();
}

function addTaskElement(task) {
    const taskElement = elementFromHTML(taskHTML);
    const taskTitle = taskElement.querySelector(".title");
    const taskDescription = taskElement.querySelector(".description");
    const taskDate = taskElement.querySelector(".date");
    const taskProject = taskElement.querySelector(".project");
    const taskCheckBox = taskElement.querySelector(".check-box");
    const taskDropDown = taskElement.querySelector(".drop-down");
    const taskRemoveTaskIcon = taskElement.querySelector(".remove-task-icon");
    const taskEditIcon = taskElement.querySelector(".edit-icon");

    taskListElement.appendChild(taskElement);
    taskElement.addEventListener("click", () => taskDropDown.classList.toggle("hidden"));
    taskCheckBox.addEventListener("click", (e) => {
        e.stopPropagation();
        taskCheckBox.classList.toggle("checked");
        task.isCompleted = !task.isCompleted;
    });
    taskRemoveTaskIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        removeTask(task);
    });
    taskEditIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        openEditTaskMenu(task);
    });

    taskTitle.textContent = task.title;
    taskDescription.textContent = task.description;
    taskDate.textContent = task.date;
    taskProject.textContent = task.project;
    setCheckBoxElementCompleted(taskCheckBox, task.isCompleted);
}

function setCheckBoxElementCompleted(checkBox, isCompleted) {
    if (isCompleted) {
        checkBox.classList.add("checked");
    }
    else {
        checkBox.classList.remove("checked");
    }
}

function resetTaskMenuElements() {
    inputTitle.value = "";
    inputDescription.value = "";
    inputDate.value = "";
    inputProject.value = "";
    taskMenu.classList.add("hidden");
    editTitle.value = "";
    editDescription.value = "";
    editDate.value = "";
    editProject.value = "";
    editTaskMenu.classList.add("hidden");
}

function regenerateTaskElements() {
    for (let i = taskListElement.children.length - 1; i >= 0; i--) {
        taskListElement.children[i].remove();
    }

    for (const task of taskList) {
        switch (filter) {
            case "All Tasks":
                addTaskElement(task);
                break;
            case "Today's Tasks":

                break;
            case "This Week's Tasks":

                break;
            case "Completed Tasks":
                if (task.isCompleted) {
                    addTaskElement(task);
                }
                break;
        }
    }
}

function selectFilterElement(target) {
    for (const taskFilter of taskFilterList.children) {
        taskFilter.classList.remove("selected-nav-item");
    }
    target.classList.add("selected-nav-item");

    regenerateTaskElements();
}

openMenuBtn.addEventListener("click", () => nav.classList.add("nav-active"));
closeMenuBtn.addEventListener("click", () => nav.classList.remove("nav-active"));
openTaskMenuBtn.addEventListener("click", () => taskMenu.classList.remove("hidden"));
closeTaskMenuBtn.addEventListener("click", resetTaskMenuElements);
addTaskBtn.addEventListener("click", () => {
    addTask(inputTitle.value, inputDescription.value, inputDate.value, inputProject.value);
    resetTaskMenuElements();
});
editTaskBtn.addEventListener("click", () => {
    addTask(editTitle.value, editDescription.value, editDate.value, editProject.value);
    resetTaskMenuElements();
});
taskFilterList.addEventListener("click", (e) => {
    if (e.target == taskFilterList) {
        return;
    }

    filter = e.target.textContent;
    selectFilterElement(e.target);
});