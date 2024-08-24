let taskTitle = document.querySelector(".container__left-titleinput") as HTMLInputElement;
taskTitle.required = true;
let taskDueDate = document.querySelector(".container__left-duedateinput") as HTMLInputElement;
let taskPriority = document.querySelector(".container__left-priorityselect") as HTMLSelectElement;
let taskCategory = document.querySelector(".container__left-categoryselect") as HTMLSelectElement;
let taskCategoryRight = document.querySelector(".container__right-categoryselect") as HTMLSelectElement;
let addBtn = document.querySelector(".container__left-button") as HTMLButtonElement;
let taskDescription = document.querySelector(".container__left-textarea") as HTMLTextAreaElement;
let taskContainer = document.querySelector(".container__right-lower") as HTMLElement;
let categoryContainer = document.querySelector(".container__left-categorycontainer") as HTMLElement;
let searchEl = document.querySelector(".container__right-titleinput") as HTMLInputElement;
let priorityEl = document.querySelector(".container__right-priority") as HTMLElement;
let statusEl = document.querySelector(".container__right-completedselect") as HTMLSelectElement;
// console.log(taskTitle.value);

let allTaskArr: Array<any> = [];

function createTask(){
    let newTask = document.createElement("div");
    let checkboxDiv = document.createElement("div");
    let descriptionDiv = document.createElement("div");
    let checkbox = document.createElement("input");
    let deleteDiv = document.createElement("div");
    let dueDiv = document.createElement("div");
    let borderDiv1 = document.createElement("div");
    let borderDiv2 = document.createElement("div");
    let catDiv = document.createElement("div");
    let titleText = document.createElement("h3");
    let dueDate = document.createElement("p");
    let dueTime = document.createElement("p");
    let taskCategoryElement = document.createElement("p");
    let taskPriorityElement = document.createElement("p");
    let taskDescriptionElement = document.createElement("p");

    checkbox.addEventListener("change", () => {
        if(checkbox.checked) {
            titleText.style.textDecoration = "line-through";
            checkbox.classList.toggle("checked");
        }
        else{
            titleText.style.textDecoration = "none";
            checkbox.classList.toggle("checked");
        }
    });
    
    deleteDiv.addEventListener("click", () => {
        newTask.remove();
    });
    

    checkboxDiv.classList.add("container__right-checkboxDiv");
    deleteDiv.classList.add("container__right-deleteDiv");
    dueDiv.classList.add("container__right-dueDiv");
    descriptionDiv.classList.add("container__right-descriptionDiv");
    checkbox.classList.add("container__right-checkboxEl");
    newTask.classList.add("container__right-taskscontainer");

    checkbox.type = "checkbox";
    checkboxDiv.appendChild(checkbox);
    // taskTitle.setAttribute("required", "true");
    titleText.textContent = taskTitle.value;
    titleText.classList.add("container__right-tasktitle");
    // titleText.setAttribute("required", "true");
    descriptionDiv.appendChild(titleText);
    newTask.appendChild(checkboxDiv);
    dueDate.textContent = taskDueDate.value;
    let date = new Date(taskDueDate.value);
    let day = date.toLocaleString('en-IN', { weekday: 'short' });
    let dayNo = date.getDate();
    const month = date.toLocaleString('en-IN', { month: 'short' });
    let year = date.getFullYear();
    dueDate.textContent = `${day} ${month} ${dayNo} ${year}`;
    dueDiv.appendChild(dueDate);
    borderDiv1.classList.add("container__right-borderDiv");
    dueDiv.appendChild(borderDiv1);
    dueTime.textContent = `12:10 in the Afternoon`;
    dueDiv.appendChild(dueTime);
    borderDiv2.classList.add("container__right-borderDiv");
    dueDiv.appendChild(borderDiv2);
    // console.log("Printing TaksPriority",taskPriority.value);
    if(taskPriority.value !== ""){
        taskPriorityElement.textContent = taskPriority.value;
    }
    if(taskPriority.value === "High-Priority"){
        // console.log("Hello Dheeraj");
        dueDiv.classList.add("container__right-highPriority");
        borderDiv1.classList.add("container__right-borderDivH");
        borderDiv2.classList.add("container__right-borderDivH");
    }else if(taskPriority.value === "Medium-Priority"){
        dueDiv.classList.add("container__right-mediumPriority");
        borderDiv1.classList.add("container__right-borderDivM");
        borderDiv2.classList.add("container__right-borderDivM");
    }else{
        dueDiv.classList.add("container__right-lowPriority");
        borderDiv1.classList.add("container__right-borderDivL");
        borderDiv2.classList.add("container__right-borderDivL");
    }
    dueDiv.appendChild(taskPriorityElement);
    descriptionDiv.appendChild(dueDiv);

    let selectedCategories = categoryContainer.querySelectorAll(".container__left-categoryDiv div");

    selectedCategories.forEach(categoryElement => {
        let category = document.createElement("div");
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
    deleteDiv.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    newTask.appendChild(deleteDiv);


    taskContainer.appendChild(newTask);

    let tasksObj: object = {
        title: taskTitle.value,
        dueDate: dueDate.textContent,
        priority: taskPriority.value,
        category: taskCategory.value,
        description: taskDescription.value
    };

    allTaskArr.push(tasksObj);
    let stringArr = JSON.stringify(allTaskArr);
    localStorage.setItem("taskDetaisl", stringArr);

    // tasksObj.title = titleText;

    // taskTitle.value = "";
    // taskDueDate.value = "";
    // taskPriority.value = "";
    // taskDescription.value = "";
    // taskCategory.value = "";
    // categoryContainer.innerHTML = "";
}

function filter(searchVal: string) {
    const searchLower = searchVal.toLowerCase().trim();
    const tasks = taskContainer.querySelectorAll(".container__right-taskscontainer");

    tasks.forEach((task) => {
        const titleEl = task.querySelector(".container__right-tasktitle") as HTMLElement;
        const descriptionEl = task.querySelector(".container__right-descriptionDiv > p:last-child") as HTMLElement;

        if (titleEl || descriptionEl) {
            const taskTitleLower = titleEl.textContent?.toLowerCase().trim() || "";
            const taskDescriptionLower = descriptionEl.textContent?.toLowerCase().trim() || "";

            const match = taskTitleLower.includes(searchLower) || taskDescriptionLower.includes(searchLower);

            const taskEl = task as HTMLElement;

            if (match) {
                taskEl.style.display = "";
            } else {
                taskEl.style.display = "none";
            }
        }
    });
}

searchEl.addEventListener("input", () => {
    const searchVal = searchEl.value;
    filter(searchVal);
});

function filterPriority(priorityVal: string) {
    const tasks = Array.from(taskContainer.querySelectorAll(".container__right-taskscontainer"));

    tasks.sort((a, b) => {
        const priorityA = (a.querySelector(".container__right-dueDiv p:last-child") as HTMLElement)?.textContent?.trim() || "";
        const priorityB = (b.querySelector(".container__right-dueDiv p:last-child") as HTMLElement)?.textContent?.trim() || "";

        const priorityOrder: { [key: string]: number } = {
            "High-Priority": 1,
            "Medium-Priority": 2,
            "Low-Priority": 3
        };

        if (priorityVal === "High-Low") {
            return (priorityOrder[priorityA]) - (priorityOrder[priorityB]);
        } else if (priorityVal === "Low-High") {
            return (priorityOrder[priorityB]) - (priorityOrder[priorityA]);
        }
        return 0;
    });

    tasks.forEach(task => taskContainer.removeChild(task));
    tasks.forEach(task => taskContainer.appendChild(task));
}


priorityEl.addEventListener("change", () => {
    const priorityVal = (priorityEl.querySelector(".container__right-priorityselect") as HTMLSelectElement).value;
    filterPriority(priorityVal);
});


function filterStatus(statusVal: string) {
    const tasks = taskContainer.querySelectorAll(".container__right-taskscontainer");

    tasks.forEach((task) => {
        const checkbox = task.querySelector(".container__right-checkboxEl") as HTMLInputElement;
        const taskEl = task as HTMLElement;

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

statusEl.addEventListener("change", () => {
    const statusVal = statusEl.value;
    console.log("first", statusVal);
    filterStatus(statusVal);
});

taskCategory.addEventListener('change', () => {
    let selectedCategory = taskCategory.value;
    
    let existingCategory = Array.from(categoryContainer.children).find(child => {
        let categoryElement = child.querySelector('div');
        return categoryElement && categoryElement.textContent === selectedCategory;
    });
    
    if (existingCategory) {
        return; 
    }
    
    let categoryDiv = document.createElement('div');
    let category = document.createElement('div');
    let deleteBtn = document.createElement('button');

    category.textContent = selectedCategory;
    categoryDiv.classList.add("container__left-categoryDiv");
    deleteBtn.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
    deleteBtn.classList.add("container__left-deleteBtn");

    categoryDiv.appendChild(category);
    categoryDiv.appendChild(deleteBtn);

    categoryContainer.appendChild(categoryDiv);

    deleteBtn.addEventListener('click', () => {
        categoryDiv.remove();
    });
});

let el = document.querySelector('.container__right-categoryselect') as HTMLSelectElement;

el.addEventListener('change', function() {
    const selectedOption = this.value;
    if (selectedOption) {
        const chipContainer = document.getElementById('chipContainer');
        
        if (chipContainer) {
            const children = Array.from(chipContainer.children) as HTMLElement[];

            if (children.some(chip => chip.textContent?.includes(selectedOption))) {
                return;
            }
            
            const newChip = document.createElement('div');
            newChip.classList.add("container__right-chip");
            newChip.textContent = selectedOption;

            const deleteBtn = document.createElement('span');
            deleteBtn.classList.add("container__right-deleteBtn");
            deleteBtn.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
            deleteBtn.addEventListener('click', function() {
                chipContainer.removeChild(newChip);
            });

            newChip.appendChild(deleteBtn);
            chipContainer.appendChild(newChip);
        }
    }
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // let emptyEl = document.querySelector(".container__emptyfield") as HTMLLIElement;
    // if(taskTitle.value == "" || taskDueDate.value == "" || taskPriority.value == "" 
    //     || taskDescription.value == "" || taskCategory.value == ""){
    //         let para = document.createElement("p") as HTMLElement;
    //         para.textContent = "Some or All fields are empty, please check before adding them.";
    //         // para.style.display = "block";

    //         emptyEl.appendChild(para);
    //         // if(emptyEl){
    //         //     return;
    //         // }
    //         // else{
    //         //     emptyEl.appendChild(para);
    //         // }
    // }
    // else{
    //     createTask();
    //     // emptyEl.style.display = "none";
    // }
    createTask();
    console.log(allTaskArr);
});

// createTask();