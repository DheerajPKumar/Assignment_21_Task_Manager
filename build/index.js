"use strict";
var taskTitle = document.querySelector(".container__left-titleinput");
var taskDueDate = document.querySelector(".container__left-duedateinput");
var taskPriority = document.querySelector(".container__left-priorityselect");
var taskCategory = document.querySelector(".container__left-categoryselect");
var taskCategoryRight = document.querySelector(".container__right-categoryselect");
var addBtn = document.querySelector(".container__left-button");
var taskDescription = document.querySelector(".container__left-textarea");
var taskContainer = document.querySelector(".container__right-lower");
var categoryContainer = document.querySelector(".container__left-categorycontainer");
var searchEl = document.querySelector(".container__right-titleinput");
var priorityEl = document.querySelector(".container__right-priority");
var statusEl = document.querySelector(".container__right-completedselect");
var el = document.querySelector(".container__right-categoryselect");
var categorySelect = document.querySelector(".container__right-categoryselect");
var chipContainer = document.querySelector(".container__right-chipcontainer");
var errorContainer = document.querySelector(".container__error");
var allTaskArr = [];
var isEmpty = false;
function createTask() {
    if (!taskTitle.value.trim() || !taskDueDate.value.trim() || !taskPriority.value.trim() || !taskDescription.value.trim()) {
        if (!isEmpty) {
            var errorDiv_1 = document.createElement("div");
            var errorPara = document.createElement('p');
            var deletBtn = document.createElement("button");
            errorPara.textContent = "All fields are mandatory. Please check !!!";
            deletBtn.innerHTML = "<i class=\"fa-regular fa-circle-xmark\"></i>";
            errorDiv_1.classList.add("container__error-handleerror");
            errorPara.classList.add("container__error-para");
            deletBtn.classList.add("container__error-delete");
            errorDiv_1.appendChild(errorPara);
            errorDiv_1.appendChild(deletBtn);
            errorContainer.appendChild(errorDiv_1);
            isEmpty = true;
            deletBtn.addEventListener("click", function () {
                errorDiv_1.remove();
                isEmpty = false;
            });
        }
        return;
    }
    isEmpty = false;
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
    deleteDiv.addEventListener("click", function () {
        newTask.remove();
        var taskId = newTask.getAttribute("data-id");
        if (taskId) {
            allTaskArr = allTaskArr.filter(function (task) { return task.id !== taskId; });
            localStorage.setItem("taskDetails", JSON.stringify(allTaskArr));
        }
    });
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
    var day = date.toLocaleString("en-IN", { weekday: "short" });
    var dayNo = date.getDate();
    var month = date.toLocaleString("en-IN", { month: "short" });
    var year = date.getFullYear();
    dueDate.textContent = "".concat(day, " ").concat(month, " ").concat(dayNo, " ").concat(year);
    dueDiv.appendChild(dueDate);
    borderDiv1.classList.add("container__right-borderDiv");
    dueDiv.appendChild(borderDiv1);
    dueTime.textContent = "12:10 in the Afternoon";
    dueDiv.appendChild(dueTime);
    borderDiv2.classList.add("container__right-borderDiv");
    dueDiv.appendChild(borderDiv2);
    if (taskPriority.value !== "") {
        taskPriorityElement.textContent = taskPriority.value;
    }
    if (taskPriority.value === "High-Priority") {
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
    var selectedCategories = Array.from(categoryContainer.querySelectorAll(".container__left-categoryDiv div"));
    selectedCategories.forEach(function (categoryElement) {
        var category = document.createElement("div");
        category.textContent = categoryElement.textContent;
        category.className = categoryElement.className;
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
    var allCategories = selectedCategories.map(function (categoryElement) { var _a; return ((_a = categoryElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; }).join(", ");
    var taskId = Date.now().toString();
    newTask.setAttribute("data-id", taskId);
    var tasksObj = {
        id: taskId,
        title: taskTitle.value,
        dueDate: dueDate.textContent,
        priority: taskPriority.value,
        category: allCategories,
        description: taskDescription.value,
    };
    allTaskArr.push(tasksObj);
    var stringArr = JSON.stringify(allTaskArr);
    localStorage.setItem("taskDetails", stringArr);
    var storedData = localStorage.getItem("taskDetails");
    if (storedData) {
        console.log(JSON.parse(storedData));
    }
    else {
        console.log("No data found in localStorage for 'taskDetails'.");
    }
    // localStorage.clear();
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
function filterPriority(priorityVal) {
    var tasks = Array.from(taskContainer.querySelectorAll(".container__right-taskscontainer"));
    tasks.sort(function (a, b) {
        var _a, _b, _c, _d;
        var priorityA = ((_b = (_a = a.querySelector(".container__right-dueDiv p:last-child")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
        var priorityB = ((_d = (_c = b.querySelector(".container__right-dueDiv p:last-child")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || "";
        var priorityOrder = {
            "High-Priority": 1,
            "Medium-Priority": 2,
            "Low-Priority": 3,
        };
        if (priorityVal === "High-Low") {
            return priorityOrder[priorityA] - priorityOrder[priorityB];
        }
        else if (priorityVal === "Low-High") {
            return priorityOrder[priorityB] - priorityOrder[priorityA];
        }
        return 0;
    });
    tasks.forEach(function (task) { return taskContainer.removeChild(task); });
    tasks.forEach(function (task) { return taskContainer.appendChild(task); });
}
priorityEl.addEventListener("change", function () {
    var priorityVal = priorityEl.querySelector(".container__right-priorityselect").value;
    filterPriority(priorityVal);
});
function filterStatus(statusVal) {
    var tasks = taskContainer.querySelectorAll(".container__right-taskscontainer");
    tasks.forEach(function (task) {
        var checkbox = task.querySelector(".container__right-checkboxEl");
        var taskEl = task;
        if (statusVal === "Completed" && checkbox.checked) {
            taskEl.style.display = "";
        }
        else if (statusVal === "Pending" && !checkbox.checked) {
            taskEl.style.display = "";
        }
        else if (statusVal === "") {
            taskEl.style.display = "";
        }
        else {
            taskEl.style.display = "none";
        }
    });
}
statusEl.addEventListener("change", function () {
    var statusVal = statusEl.value;
    // console.log("first", statusVal);
    filterStatus(statusVal);
});
taskCategory.addEventListener("change", function () {
    var selectedCategory = taskCategory.value;
    var existingCategory = Array.from(categoryContainer.children).find(function (child) {
        var categoryElement = child.querySelector("div");
        return (categoryElement && categoryElement.textContent === selectedCategory);
    });
    if (existingCategory) {
        return;
    }
    var categoryDiv = document.createElement("div");
    var category = document.createElement("div");
    var deleteBtn = document.createElement("button");
    category.textContent = selectedCategory;
    categoryDiv.classList.add("container__left-categoryDiv");
    deleteBtn.innerHTML = "<i class=\"fa-regular fa-circle-xmark\"></i>";
    deleteBtn.classList.add("container__left-deleteBtn");
    categoryDiv.appendChild(category);
    categoryDiv.appendChild(deleteBtn);
    categoryContainer.appendChild(categoryDiv);
    deleteBtn.addEventListener("click", function () {
        categoryDiv.remove();
    });
});
el.addEventListener("change", function () {
    var selectedOption = this.value;
    if (selectedOption) {
        var chipContainer_1 = document.getElementById("chipContainer");
        if (chipContainer_1) {
            var children = Array.from(chipContainer_1.children);
            if (children.some(function (chip) { var _a; return (_a = chip.textContent) === null || _a === void 0 ? void 0 : _a.includes(selectedOption); })) {
                return;
            }
            var newChip_1 = document.createElement("div");
            newChip_1.classList.add("container__right-chip");
            newChip_1.textContent = selectedOption;
            var deleteBtn = document.createElement("span");
            deleteBtn.classList.add("container__right-deleteBtn");
            deleteBtn.innerHTML = "<i class=\"fa-regular fa-circle-xmark\"></i>";
            deleteBtn.addEventListener("click", function () {
                chipContainer_1.removeChild(newChip_1);
            });
            newChip_1.appendChild(deleteBtn);
            chipContainer_1.appendChild(newChip_1);
        }
    }
});
function filterCategory() {
    var selectedChips = Array.from(document.querySelectorAll(".container__right-chipcontainer .container__right-chip"));
    var selectedCategories = selectedChips.map(function (chip) { var _a; return ((_a = chip.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
    var tasks = document.querySelectorAll(".container__right-taskscontainer");
    tasks.forEach(function (task) {
        var taskEl = task;
        var taskCategories = Array.from(task.querySelectorAll(".container__right-category")).map(function (category) { var _a; return ((_a = category.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
        var matchesCategory = selectedCategories.length === 0 ||
            selectedCategories.some(function (cat) { return taskCategories.includes(cat); });
        taskEl.style.display = matchesCategory ? "" : "none";
    });
}
categorySelect.addEventListener("change", function () {
    var selectedCategory = categorySelect.value.trim();
    if (selectedCategory) {
        var existingChips = Array.from(chipContainer.querySelectorAll(".container__right-chip"));
        if (!existingChips.some(function (chip) { var _a; return ((_a = chip.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === selectedCategory; })) {
            var newChip_2 = document.createElement("div");
            newChip_2.classList.add("container__right-chip");
            newChip_2.textContent = selectedCategory;
            var deleteBtn = document.createElement("span");
            deleteBtn.classList.add("container__right-deleteBtn");
            deleteBtn.innerHTML = "<i class=\"fa-regular fa-circle-xmark\"></i>";
            deleteBtn.addEventListener("click", function () {
                chipContainer.removeChild(newChip_2);
                filterCategory();
            });
            newChip_2.appendChild(deleteBtn);
            chipContainer.appendChild(newChip_2);
            filterCategory();
        }
    }
});
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    createTask();
    // console.log(allTaskArr);
});
