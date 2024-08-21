"use strict";
var taskTitle = document.querySelector(".container__left-titleinput");
var taskDueDate = document.querySelector(".container__left-duedateinput");
var taskPriority = document.querySelector(".container__left-priorityselect");
var taskCategory = document.querySelector(".container__left-categoryselect");
var addBtn = document.querySelector(".container__left-button");
var taskDescription = document.querySelector(".container__left-textarea");
var taskContainer = document.querySelector(".container__right-lower");
var categoryContainer = document.querySelector(".container__left-categorycontainer");
// console.log(taskTitle.value);
function createTask() {
    var newTask = document.createElement("div");
    var checkboxDiv = document.createElement("div");
    var descriptionDiv = document.createElement("div");
    var checkbox = document.createElement("input");
    var deleteDiv = document.createElement("div");
    var titleText = document.createElement("h3");
    var dueDate = document.createElement("p");
    var dueTime = document.createElement("p");
    var taskCategoryElement = document.createElement("p");
    var taskPriorityElement = document.createElement("p");
    var taskDescriptionElement = document.createElement("p");
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            titleText.style.textDecoration = "line-through";
            checkbox.classList.toggle("checked");
        }
        else {
            titleText.style.textDecoration = "none";
            checkbox.classList.toggle("checked");
        }
    });
    // taskTitle.addEventListener("input", () => {
    //     titleText.innerText = taskTitle.value;
    //     console.log(titleText);
    // });
    // taskDueDate.addEventListener("input", () => {
    //     let dateInput = taskDueDate.value;
    //     let date = new Date(dateInput);
    // let day = date.toLocaleString('en-IN', { weekday: 'long' });
    // let dayNo = date.getDate();
    // const month = date.toLocaleString('en-IN', { month: 'long' });
    // let year = date.getFullYear();
    // let time = date.toLocaleTimeString('en-IN', { hour12: true });
    // dueDate.textContent = `${day} ${month} ${dayNo} ${year}`;
    // dueTime.textContent = `12:10 in the Afternoon`;
    // console.log(dueDate.textContent);
    // console.log(dueTime.textContent);
    // });
    // taskPriority.addEventListener('change', () => {
    //     if(taskPriority.value !== ""){
    //         taskPriorityElement.textContent = taskPriority.value;
    //         console.log(taskPriorityElement.textContent);
    //     }
    //     else{
    //         return;
    //     }
    // });
    // taskDescription.addEventListener('input', () => {
    //     taskDescriptionElement.textContent = taskDescription.value;
    //     console.log(taskDescriptionElement.textContent);
    // });
    deleteDiv.addEventListener("click", function () {
        newTask.remove();
    });
    // checkbox.addEventListener("checked", () => {
    //     if(checkbox.checked) {
    //         titleText.style.textDecoration = "line-through";
    //     }
    //     else{
    //         checkbox.classList.add("checked");
    //     }
    // });
    checkboxDiv.classList.add("container__right-checkboxDiv");
    deleteDiv.classList.add("container__right-deleteDiv");
    descriptionDiv.classList.add("container__right-descriptionDiv");
    checkbox.classList.add("container__right-checkboxEl");
    newTask.classList.add("container__right-taskscontainer");
    checkbox.type = "checkbox";
    checkboxDiv.appendChild(checkbox);
    titleText.textContent = taskTitle.value;
    descriptionDiv.appendChild(titleText);
    newTask.appendChild(checkboxDiv);
    dueDate.textContent = taskDueDate.value;
    var date = new Date(taskDueDate.value);
    var day = date.toLocaleString('en-IN', { weekday: 'long' });
    var dayNo = date.getDate();
    var month = date.toLocaleString('en-IN', { month: 'long' });
    var year = date.getFullYear();
    dueDate.textContent = "".concat(day, " ").concat(month, " ").concat(dayNo, " ").concat(year);
    descriptionDiv.appendChild(dueDate);
    dueTime.textContent = "12:10 in the Afternoon";
    descriptionDiv.appendChild(dueTime);
    if (taskPriority.value !== "") {
        taskPriorityElement.textContent = taskPriority.value;
    }
    descriptionDiv.appendChild(taskPriorityElement);
    if (taskCategory.value !== "") {
        taskCategoryElement.textContent = taskCategory.value;
    }
    descriptionDiv.appendChild(taskCategoryElement);
    taskDescriptionElement.textContent = taskDescription.value;
    descriptionDiv.appendChild(taskDescriptionElement);
    newTask.appendChild(descriptionDiv);
    deleteDiv.innerHTML = "<i class=\"fa-solid fa-trash\"></i>";
    newTask.appendChild(deleteDiv);
    taskContainer.appendChild(newTask);
}
taskCategory.addEventListener('change', function () {
    var categoryDiv = document.createElement("div");
    categoryDiv.textContent = taskCategory.value;
    categoryContainer.appendChild(categoryDiv);
});
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    createTask();
});
// createTask();
