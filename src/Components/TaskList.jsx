
function TaskList({
  tasks,
  projects,
  onCompleteTask,
  onDeleteTask
}) {
  // Determine the deadline status of a task
  function getDeadlineStatus(task) {
    if (task.completed || !task.dueDate) {
      return null;
    }

    // Use local calendar dates to avoid timezone issues
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(task.dueDate + "T00:00:00");
    dueDate.setHours(0, 0, 0, 0);

    const differenceInDays = Math.round(
      (dueDate - today) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays < 0) {
      return {
        label: "Overdue",
        className: "deadline-overdue"
      };
    }

    if (differenceInDays === 0) {
      return {
        label: "Due Today",
        className: "deadline-today"
      };
    }

    if (differenceInDays <= 3) {
      return {
        label: "Upcoming",
        className: "deadline-upcoming"
      };
    }

    return null;
  }

  return (
    <div className="todo-container">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map(function (task) {
          const project = projects.find(function (project) {
            return project.id == task.projectId;
          });

          const deadlineStatus = getDeadlineStatus(task);

          return (
            <div
              className="todo-card"
              key={task.id}
            >
              <h3>{task.title}</h3>

              {deadlineStatus && (
                <p className={deadlineStatus.className}>
                  <strong>{deadlineStatus.label}</strong>
                </p>
              )}

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
                onClick={() => onCompleteTask(task.id)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                onClick={() => onDeleteTask(task.id)}
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
