
import { useState } from "react";
import TaskList from "./TaskList";

function MyTasks({
  tasks,
  projects,
  onCompleteTask,
  onDeleteTask
}) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");

  // Search and filter tasks
  const filteredTasks = tasks.filter(function (task) {
    const matchesSearch = (task.title || "")
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && !task.completed);

    const matchesPriority =
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort tasks without changing the original tasks array
  const sortedTasks = [...filteredTasks].sort(function (a, b) {
    if (sortBy === "date-asc") {
      // Tasks without a due date appear last
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate) - new Date(b.dueDate);
    }

    if (sortBy === "date-desc") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(b.dueDate) - new Date(a.dueDate);
    }

    if (sortBy === "priority") {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3
      };

      return (
        (priorityOrder[a.priority] || 4) -
        (priorityOrder[b.priority] || 4)
      );
    }

    return 0;
  });

  return (
    <main className="main">
      <h2>My Tasks</h2>

      <p>
        View and manage all your study tasks.
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchText}
        onChange={function (event) {
          setSearchText(event.target.value);
        }}
      />

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={function (event) {
          setStatusFilter(event.target.value);
        }}
      >
        <option value="all">All Tasks</option>
        <option value="pending">Pending Tasks</option>
        <option value="completed">Completed Tasks</option>
      </select>

      {/* Priority filter */}
      <select
        value={priorityFilter}
        onChange={function (event) {
          setPriorityFilter(event.target.value);
        }}
      >
        <option value="all">All Priorities</option>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      {/* Sorting */}
      <select
        value={sortBy}
        onChange={function (event) {
          setSortBy(event.target.value);
        }}
      >
        <option value="date-asc">Due Date: Earliest First</option>
        <option value="date-desc">Due Date: Latest First</option>
        <option value="priority">Priority: High to Low</option>
      </select>

      {/* Task list */}
      <TaskList
        tasks={sortedTasks}
        projects={projects}
        onCompleteTask={onCompleteTask}
        onDeleteTask={onDeleteTask}
      />

      <p>
        Showing {sortedTasks.length} of {tasks.length} tasks
      </p>
    </main>
  );
}

export default MyTasks;
