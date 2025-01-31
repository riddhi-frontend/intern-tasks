document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.sort((a, b) => a.completed - b.completed);
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("task-item");
            if (task.completed) {
                taskItem.classList.add("completed");
            }
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => toggleTask(index));

            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.classList.add("task-text");
            if (task.completed) {
                taskText.style.textDecoration = "line-through";
                taskText.style.opacity = "0.5";
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => deleteTask(index));

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask(text) {
        if (text.trim() === "") {
            alert("Please enter a task!");
            return;
        }
        tasks.unshift({ text, completed: false }); // Add new task at the top
        taskInput.value = "";
        renderTasks();
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    document.getElementById("addTaskBtn").addEventListener("click", () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    renderTasks();
});