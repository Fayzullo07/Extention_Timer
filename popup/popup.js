let tasks = [];

const timer = document.getElementById("timer");

function update() {
    chrome.storage.local.get(["timer", "timeOption"], (result) => {
       const minutes = `${result.timeOption - Math.ceil(result.timer / 60)}`.padStart(2, "0");
       let seconds = "00"
       if(result.timer % 60 != 0){
           seconds = `${60 - result.timer % 60}`.padStart(2, "0");

       }
       timer.textContent = `${minutes} : ${seconds}`

    })
}
update();
setInterval(update, 1000)


const startBtn = document.getElementById("start_btn");
startBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (result) => {
        startBtn.innerHTML = result.isRunning ? "Stop Timer" : "Start Timer"
        chrome.storage.local.set({
            isRunning: !result.isRunning
        })

    })
});

const reset_btn = document.getElementById("reset_btn");
reset_btn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: true
    }, () => {
        startBtn.textContent = "Start Timer"
    })
})



const addTaskBtn = document.getElementById("add_btn");

addTaskBtn.addEventListener("click", addTask);

chrome.storage.sync.get(['tasks'], (result) => {
    tasks = result.tasks ? result.tasks : [];
    renderTasks();
})

function saveTasks() {
    chrome.storage.sync.set({
        tasks
    });
};

function renderTask(taskNum) {
    const taskRow = document.createElement("div");
    
    const text = document.createElement("input");
    text.type = "text";
    text.placeholder = "Enter a task...";
    text.value = tasks[taskNum];
    text.className = "task-input";
    text.addEventListener("change", () => {
        tasks[taskNum] = text.value;
        saveTasks();
    })
    
    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "X";
    deleteBtn.className = "task-delete"
    deleteBtn.addEventListener("click", () => {
        dateleTask(taskNum)
    })

    taskRow.appendChild(text);
    taskRow.appendChild(deleteBtn);
    
    const task_container = document.getElementById("task_container");
    task_container.appendChild(taskRow);

}


function addTask() {
    const taskNum = tasks.length;
    tasks.push("");
    renderTask(taskNum);
    saveTasks();
}

function dateleTask(taskNum){
    tasks.splice(taskNum, 1);
    renderTasks();
    saveTasks()
}

function renderTasks() {
    const task_container = document.getElementById("task_container");
    task_container.textContent = "";
    tasks.forEach((taskText, taskNum) => {
        renderTask(taskNum);
    })
}