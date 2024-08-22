"use strict";
var taskTitle = document.querySelector(".container__left-titleinput");
var taskDueDate = document.querySelector(".container__left-duedateinput");
var taskPriority = document.querySelector(".container__left-priorityselect");
var taskCategory = document.querySelector(".container__left-categoryselect");
var addBtn = document.querySelector(".container__left-button");
var taskDescription = document.querySelector(".container__left-textarea");
var taskContainer = document.querySelector(".container__right-lower");
var categoryContainer = document.querySelector(".container__left-categorycontainer");
var searchEl = document.querySelector(".container__right-titleinput");
var priorityEl = document.querySelector(".container__right-priority");
// console.log(taskTitle.value);
var allTaskArr = [];
function createTask() {
    var newTask = document.createElement("div");
    var checkboxDiv = document.createElement("div");
    var descriptionDiv = document.createElement("div");
    var checkbox = document.createElement("input");
    var deleteDiv = document.createElement("div");
    var dueDiv = document.createElement("div");
    var borderDiv1 = document.createElement("div");
    var borderDiv2 = document.createElement("div");
    var catDiv = document.createElement("div");
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
    dueDiv.classList.add("container__right-dueDiv");
    descriptionDiv.classList.add("container__right-descriptionDiv");
    checkbox.classList.add("container__right-checkboxEl");
    newTask.classList.add("container__right-taskscontainer");
    checkbox.type = "checkbox";
    checkboxDiv.appendChild(checkbox);
    titleText.textContent = taskTitle.value;
    titleText.classList.add("container__right-tasktitle");
    descriptionDiv.appendChild(titleText);
    newTask.appendChild(checkboxDiv);
    dueDate.textContent = taskDueDate.value;
    var date = new Date(taskDueDate.value);
    var day = date.toLocaleString('en-IN', { weekday: 'short' });
    var dayNo = date.getDate();
    var month = date.toLocaleString('en-IN', { month: 'short' });
    var year = date.getFullYear();
    dueDate.textContent = "".concat(day, " ").concat(month, " ").concat(dayNo, " ").concat(year);
    dueDiv.appendChild(dueDate);
    borderDiv1.classList.add("container__right-borderDiv");
    dueDiv.appendChild(borderDiv1);
    dueTime.textContent = "12:10 in the Afternoon";
    dueDiv.appendChild(dueTime);
    borderDiv2.classList.add("container__right-borderDiv");
    dueDiv.appendChild(borderDiv2);
    // console.log("Printing TaksPriority",taskPriority.value);
    if (taskPriority.value !== "") {
        taskPriorityElement.textContent = taskPriority.value;
    }
    if (taskPriority.value === "High-Priority") {
        // console.log("Hello Dheeraj");
        dueDiv.classList.add("container__right-highPriority");
        borderDiv1.classList.add("container__right-borderDivH");
        borderDiv2.classList.add("container__right-borderDivH");
    }
    else if (taskPriority.value === "Medium-Priority") {
        dueDiv.classList.add("container__right-mediumPriority");
        borderDiv1.classList.add("container__right-borderDivM");
        borderDiv2.classList.add("container__right-borderDivM");
    }
    else {
        dueDiv.classList.add("container__right-lowPriority");
        borderDiv1.classList.add("container__right-borderDivL");
        borderDiv2.classList.add("container__right-borderDivL");
    }
    dueDiv.appendChild(taskPriorityElement);
    descriptionDiv.appendChild(dueDiv);
    // if(taskCategory.value !== ""){
    //     taskCategoryElement.textContent = taskCategory.value;
    // }
    // descriptionDiv.appendChild(taskCategoryElement);
    var selectedCategories = categoryContainer.querySelectorAll(" .container__left-categoryDiv div");
    selectedCategories.forEach(function (categoryElement) {
        var category = categoryElement.cloneNode(true);
        category.classList.add("container__right-category");
        catDiv.appendChild(category);
    });
    catDiv.classList.add("container__right-catDiv");
    descriptionDiv.appendChild(catDiv);
    taskDescriptionElement.textContent = taskDescription.value;
    descriptionDiv.appendChild(taskDescriptionElement);
    newTask.appendChild(descriptionDiv);
    deleteDiv.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
    newTask.appendChild(deleteDiv);
    taskContainer.appendChild(newTask);
    var tasksObj = {
        title: taskTitle.value,
        dueDate: dueDate.textContent,
        priority: taskPriority.value,
        category: taskCategory.value,
        description: taskDescription.value
    };
    allTaskArr.push(tasksObj);
    var stringArr = JSON.stringify(allTaskArr);
    localStorage.setItem("taskDetaisl", stringArr);
    // tasksObj.title = titleText;
    // taskTitle.value = "";
    // taskDueDate.value = "";
    // taskPriority.value = "";
    // taskDescription.value = "";
    // taskCategory.value = "";
    // categoryContainer.innerHTML = "";
}
function filter(searchVal) {
    var searchLower = searchVal.toLowerCase().trim();
    var tasks = taskContainer.querySelectorAll(".container__right-taskscontainer");
    tasks.forEach(function (task) {
        var _a, _b;
        var titleEl = task.querySelector(".container__right-tasktitle");
        var descriptionEl = task.querySelector(".container__right-descriptionDiv > p:last-child");
        if (titleEl || descriptionEl) {
            var taskTitleLower = ((_a = titleEl.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim()) || "";
            var taskDescriptionLower = ((_b = descriptionEl.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase().trim()) || "";
            var match = taskTitleLower.includes(searchLower) || taskDescriptionLower.includes(searchLower);
            var taskEl = task;
            if (match) {
                taskEl.style.display = "";
            }
            else {
                taskEl.style.display = "none";
            }
        }
    });
}
searchEl.addEventListener("input", function () {
    var searchVal = searchEl.value;
    filter(searchVal);
});
// priorityEl.addEventListener("change", () =>{
//     createTask();
// });
taskCategory.addEventListener('change', function () {
    var categoryDiv = document.createElement('div');
    var category = document.createElement('div');
    var deleteBtn = document.createElement('button');
    category.textContent = taskCategory.value;
    categoryDiv.classList.add("container__left-categoryDiv");
    deleteBtn.innerHTML = "<i class=\"fa-regular fa-circle-xmark\"></i>";
    deleteBtn.classList.add("container__left-deleteBtn");
    categoryDiv.appendChild(category);
    categoryDiv.appendChild(deleteBtn);
    if (categoryContainer.contains(category)) {
        return;
    }
    else {
        categoryContainer.appendChild(categoryDiv);
    }
    deleteBtn.addEventListener('click', function () {
        categoryDiv.remove();
    });
});
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    createTask();
    console.log(allTaskArr);
});
// createTask();
