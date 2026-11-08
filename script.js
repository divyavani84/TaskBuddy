
let tasks = [];

function addTask() {
    let name = document.getElementById("taskInput").value.trim();
    let priority = document.getElementById("priority").value;
    let category = document.getElementById("category").value;

    if (name === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: name,
        priority: priority,
        category: category,
        completed: false
    });

    document.getElementById("taskInput").value = "";
    displayTasks();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function clearTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        displayTasks();
    }
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let completed = tasks.filter(t => t.completed).length;
    let total = tasks.length;

    tasks.forEach((task, index) => {
        let div = document.createElement("div");
        div.className = "task";

        let name = document.createElement("span");
        name.textContent = task.name + " | " +
            task.priority + " | " + task.category;

        if (task.completed) {
            name.style.textDecoration = "line-through";
        }

        let complete = document.createElement("button");
        complete.className = "complete";
        complete.textContent = task.completed ? "Undo" : "Complete";
        complete.onclick = () => completeTask(index);

        let del = document.createElement("button");
        del.className = "delete";
        del.textContent = "Delete";
        del.onclick = () => deleteTask(index);

        let actions = document.createElement("div");
        actions.append(complete, del);

        div.append(name, actions);
        list.appendChild(div);
    });

    let percentage = total === 0 ? 0 :
        Math.round((completed / total) * 100);

    document.getElementById("count").textContent =
        completed + " of " + total + " tasks completed";

    document.getElementById("progress").style.width =
        percentage + "%";
}

displayTasks();
