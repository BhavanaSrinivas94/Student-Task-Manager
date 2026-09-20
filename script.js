console.log("Student Task Manager started");

// Get HTML elements
const addTaskButton = document.getElementById("addTaskButton");
const taskForm = document.getElementById("taskForm");
const saveTaskButton = document.getElementById("saveTaskButton");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDueDate = document.getElementById("taskDueDate");

const todoContainer = document.getElementById("todoContainer");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const addProjectButton = document.getElementById("addProjectButton");

const projectForm = document.getElementById("projectForm");

const saveProjectButton = document.getElementById("saveProjectButton");

const projectName = document.getElementById("projectName");

const projectDescription = document.getElementById("projectDescription");

const projectContainer = document.getElementById("projectContainer");
const taskProject = document.getElementById("taskProject");

// Hide form when page loads
taskForm.style.display = "none";
projectForm.style.display = "none";

// Load tasks from LocalStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let projects = JSON.parse(localStorage.getItem("projects")) || [];

addProjectButton.addEventListener("click", function () {

    projectForm.style.display = "block";

});
function saveProjects() {

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

}

saveProjectButton.addEventListener("click", function () {

    const name = projectName.value.trim();

    const description = projectDescription.value.trim();


    if (name === "") {

        alert("Please enter a project name.");

        return;

    }


    const newProject = {

        id: Date.now(),

        name: name,

        description: description

    };


    projects.push(newProject);

    saveProjects();

    renderProjects();


    projectName.value = "";

    projectDescription.value = "";


    alert("Project added successfully!");

});
function renderProjects() {

    projectContainer.innerHTML = "";


    projects.forEach(function (project) {

        const projectCard = document.createElement("div");

        projectCard.className = "project-card";


        projectCard.innerHTML = `

            <h3>${project.name}</h3>

            <p>
                ${project.description || "No description"}
            </p>

        `;


        projectContainer.appendChild(projectCard);

    });

}

// Save tasks to LocalStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function updateStatistics() {

    const total = todos.length;

    const completed = todos.filter(function (todo) {
        return todo.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Show task form
addTaskButton.addEventListener("click", function () {
    taskForm.style.display = "block";
});


// Add new task
saveTaskButton.addEventListener("click", function () {

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const priority = taskPriority.value;
    const dueDate = taskDueDate.value;

    // Check title
    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    // Create task
    const newTodo = {

        id: Date.now(),

        title: title,

        description: description,

        priority: priority,

        dueDate: dueDate,

        completed: false
    };


    // Add task
    todos.push(newTodo);

    // Save task
    saveTodos();

    // Display tasks
    renderTodos();


    // Clear form
    taskTitle.value = "";
    taskDescription.value = "";
    taskPriority.value = "Low";
    taskDueDate.value = "";


    alert("Task added successfully!");

});


// Display tasks
function renderTodos() {
    updateStatistics();

    todoContainer.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();

    const filter = filterSelect.value;


    // Search + filter
    const filteredTodos = todos.filter(function (todo) {

        const matchesSearch =
            todo.title.toLowerCase().includes(searchText);


        const matchesFilter =
            filter === "all" ||
            (filter === "pending" && !todo.completed) ||
            (filter === "completed" && todo.completed);


        return matchesSearch && matchesFilter;

    });


    // Display filtered tasks
    filteredTodos.forEach(function (todo) {

        const todoCard = document.createElement("div");

        todoCard.className = "todo-card";


        todoCard.innerHTML = `

            <h3>${todo.title}</h3>

            <p>${todo.description}</p>

            <p>
                <strong>Priority:</strong>
                ${todo.priority}
            </p>

            <p>
                <strong>Due Date:</strong>
                ${todo.dueDate || "No due date"}
            </p>

            <p>
                <strong>Status:</strong>
                ${todo.completed ? "Completed" : "Pending"}
            </p>

            <button onclick="completeTodo(${todo.id})">
                ${todo.completed ? "Undo" : "Complete"}
            </button>

            <button onclick="deleteTodo(${todo.id})">
                Delete
            </button>

        `;


        todoContainer.appendChild(todoCard);

    });

}


// Search tasks
searchInput.addEventListener("input", function () {
    renderTodos();
});


// Filter tasks
filterSelect.addEventListener("change", function () {
    renderTodos();
});


// Complete task
function completeTodo(id) {

    const todo = todos.find(function (todo) {
        return todo.id === id;
    });


    if (todo) {

        todo.completed = !todo.completed;

        // Save updated task
        saveTodos();

        // Display updated task
        renderTodos();

    }

}


// Delete task
function deleteTodo(id) {

    todos = todos.filter(function (todo) {
        return todo.id !== id;
    });


    // Save updated list
    saveTodos();

    // Display updated list
    renderTodos();

}


// Load saved tasks when page opens
renderTodos();
renderProjects();

// Browser notification permission
function requestNotificationPermission() {

    if ("Notification" in window) {

        Notification.requestPermission();

    }

}

requestNotificationPermission();


// Test notification
function sendTestNotification() {

    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification("Student Task Manager", {

            body: "This is your task reminder!"

        });

    }

}
