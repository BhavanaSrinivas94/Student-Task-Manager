function TaskList({
  tasks,
  projects,
  onCompleteTask,
  onDeleteTask
}) {
  return (
    <div className="todo-container">

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map(function (task) {

          const project = projects.find(
            function (project) {
              return project.id == task.projectId;
            }
          );

          return (
            <div
              className="todo-card"
              key={task.id}
            >
              <h3>{task.title}</h3>

              <p>
                {task.description || "No description"}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {task.priority}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {task.dueDate || "No due date"}
              </p>

              <p>
                <strong>Project:</strong>{" "}
                {project
                  ? project.name
                  : "No Project"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {task.completed
                  ? "Completed"
                  : "Pending"}
              </p>

              <button
                onClick={() =>
                  onCompleteTask(task.id)
                }
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                onClick={() =>
                  onDeleteTask(task.id)
                }
              >
                Delete
              </button>
            </div>
          );
        })
      )}

    </div>
  );
}

export default TaskList;