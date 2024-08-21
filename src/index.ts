let taskTitle = document.querySelector(".container__left-titleinput") as HTMLInputElement;
let taskDueDate = document.querySelector(".container__left-duedateinput") as HTMLInputElement;
let taskPriority = document.querySelector(".container__left-priorityselect") as HTMLSelectElement;
let taskCategory = document.querySelector(".container__left-categoryselect") as HTMLSelectElement;
let addBtn = document.querySelector(".container__left-button") as HTMLButtonElement;
let taskDescription = document.querySelector(".container__left-textarea") as HTMLTextAreaElement;
let taskContainer = document.querySelector(".container__right-lower") as HTMLElement;
let categoryContainer = document.querySelector(".container__left-categorycontainer") as HTMLElement;
// console.log(taskTitle.value);

function createTask(){
    let newTask = document.createElement("div");
    let checkboxDiv = document.createElement("div");
    let descriptionDiv = document.createElement("div");
    let checkbox = document.createElement("input");
    let deleteDiv = document.createElement("div");
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
    descriptionDiv.classList.add("container__right-descriptionDiv");
    checkbox.classList.add("container__right-checkboxEl");
    newTask.classList.add("container__right-taskscontainer");

    checkbox.type = "checkbox";
    checkboxDiv.appendChild(checkbox);
    titleText.textContent = taskTitle.value;
    descriptionDiv.appendChild(titleText);
    newTask.appendChild(checkboxDiv);
    dueDate.textContent = taskDueDate.value;
    let date = new Date(taskDueDate.value);
    let day = date.toLocaleString('en-IN', { weekday: 'long' });
    let dayNo = date.getDate();
    const month = date.toLocaleString('en-IN', { month: 'long' });
    let year = date.getFullYear();
    dueDate.textContent = `${day} ${month} ${dayNo} ${year}`;
    descriptionDiv.appendChild(dueDate);
    dueTime.textContent = `12:10 in the Afternoon`;
    descriptionDiv.appendChild(dueTime);
    if(taskPriority.value !== ""){
        taskPriorityElement.textContent = taskPriority.value;
    }
    descriptionDiv.appendChild(taskPriorityElement);
    if(taskCategory.value !== ""){
        taskCategoryElement.textContent = taskCategory.value;
    }
    descriptionDiv.appendChild(taskCategoryElement);
    taskDescriptionElement.textContent = taskDescription.value;
    descriptionDiv.appendChild(taskDescriptionElement);
    newTask.appendChild(descriptionDiv);
    deleteDiv.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    newTask.appendChild(deleteDiv);

    taskContainer.appendChild(newTask);
}

taskCategory.addEventListener('change', () => {
    let categoryDiv = document.createElement("div");
    categoryDiv.textContent = taskCategory.value;
    categoryContainer.appendChild(categoryDiv);
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createTask();
});

// createTask();