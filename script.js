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

// Hide form when page loads
taskForm.style.display = "none";

// Store tasks
let todos = [];


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


    // Create task object
    const newTodo = {

        id: Date.now(),

        title: title,

        description: description,

        priority: priority,

        dueDate: dueDate,

        completed: false

    };


    // Add task to array
    todos.push(newTodo);


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

    todoContainer.innerHTML = "";


    todos.forEach(function (todo) {

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


// Complete task
function completeTodo(id) {

    const todo = todos.find(function (todo) {

        return todo.id === id;

    });


    if (todo) {

        todo.completed = !todo.completed;

        renderTodos();

    }

}


// Delete task
function deleteTodo(id) {

    todos = todos.filter(function (todo) {

        return todo.id !== id;

    });


    renderTodos();

}