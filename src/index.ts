let taskTitle = document.querySelector(".container__left-titleinput") as HTMLInputElement;
let taskDueDate = document.querySelector(".container__left-duedateinput") as HTMLInputElement;
let taskPriority = document.querySelector(".container__left-priorityselect") as HTMLSelectElement;
let taskCategory = document.querySelector(".container__left-categoryselect") as HTMLSelectElement;
let addBtn = document.querySelector(".container__left-button") as HTMLButtonElement;
let taskDescription = document.querySelector(".container__left-textarea") as HTMLTextAreaElement;
let taskContainer = document.querySelector(".container__right-lower") as HTMLElement;
let categoryContainer = document.querySelector(".container__left-categorycontainer") as HTMLElement;
let searchEl = document.querySelector(".container__right-titleinput") as HTMLInputElement;
let priorityEl = document.querySelector(".container__right-priority") as HTMLElement;
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
    deleteDiv.addEventListener("click", () => {
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
    // if(taskCategory.value !== ""){
    //     taskCategoryElement.textContent = taskCategory.value;
    // }
    // descriptionDiv.appendChild(taskCategoryElement);
    let selectedCategories = categoryContainer.querySelectorAll(" .container__left-categoryDiv div");
    selectedCategories.forEach(categoryElement => {
        let category = categoryElement.cloneNode(true) as HTMLElement;
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

// priorityEl.addEventListener("change", () =>{
//     createTask();
// });

taskCategory.addEventListener('change', () => {
    let categoryDiv = document.createElement('div');
    let category = document.createElement('div');
    let deleteBtn = document.createElement('button');

    category.textContent = taskCategory.value;
    categoryDiv.classList.add("container__left-categoryDiv");
    deleteBtn.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
    deleteBtn.classList.add("container__left-deleteBtn");

    categoryDiv.appendChild(category);
    categoryDiv.appendChild(deleteBtn);

    if(categoryContainer.contains(category)){
        return;
    }
    else{
        categoryContainer.appendChild(categoryDiv);
    }

    deleteBtn.addEventListener('click', () => {
        categoryDiv.remove();
    });
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createTask();
    console.log(allTaskArr);
});

// createTask();