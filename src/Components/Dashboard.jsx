import Statistics from "./Statistics";
import TaskForm from "./TaskForm";

function Dashboard({ tasks, setTasks, projects }) {

  function addTask(task) {
    setTasks(function (currentTasks) {
      return [...currentTasks, task];
    });
  }

  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  }).length;

  const pendingTasks =
    tasks.length - completedTasks;

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
        onAddTask={addTask}
        projects={projects}
      />

    </main>
  );
}

export default Dashboard;