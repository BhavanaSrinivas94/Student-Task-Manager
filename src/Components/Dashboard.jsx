
import Statistics from "./Statistics";
import TaskForm from "./TaskForm";

function Dashboard({ tasks, onAddTask, projects }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  }).length;

  const pendingTasks = tasks.length - completedTasks;

  const overdueTasks = tasks.filter(function (task) {
    if (task.completed || !task.dueDate) {
      return false;
    }

    const dueDate = new Date(task.dueDate + "T00:00:00");
    return dueDate < today;
  }).length;

  const upcomingTasks = tasks.filter(function (task) {
    if (task.completed || !task.dueDate) {
      return false;
    }

    const dueDate = new Date(task.dueDate + "T00:00:00");
    const differenceInDays =
      (dueDate - today) / (1000 * 60 * 60 * 24);

    return differenceInDays >= 0 && differenceInDays <= 3;
  }).length;

  return (
    <main className="main">
      <h2>Dashboard</h2>
      <p>Welcome! Manage your study tasks from here.</p>

      <Statistics
        total={tasks.length}
        completed={completedTasks}
        pending={pendingTasks}
        overdue={overdueTasks}
        upcoming={upcomingTasks}
      />

      <TaskForm
        onAddTask={onAddTask}
        projects={projects}
      />
    </main>
  );
}

export default Dashboard;
