import Statistics from "./Statistics";
import TaskForm from "./TaskForm";

function Dashboard({ tasks, onAddTask, projects }) {

  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  }).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <main className="main">

      <h2>Dashboard</h2>

      <p>
        Welcome! Manage your study tasks from here.
      </p>

      <Statistics
        total={tasks.length}
        completed={completedTasks}
        pending={pendingTasks}
      />

      <TaskForm
        onAddTask={onAddTask}
        projects={projects}
      />

    </main>
  );
}

export default Dashboard;