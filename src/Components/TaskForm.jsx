import { useState } from "react";

function TaskForm({ onAddTask, projects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a task title.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      projectId: projectId,
      completed: false
    };

    onAddTask(newTask);

    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    setProjectId("");
  }

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      <select
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value)
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(event) =>
          setDueDate(event.target.value)
        }
      />

      <select
        value={projectId}
        onChange={(event) =>
          setProjectId(event.target.value)
        }
      >
        <option value="">
          No Project
        </option>

        {projects.map(function (project) {
          return (
            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>
          );
        })}
      </select>

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;