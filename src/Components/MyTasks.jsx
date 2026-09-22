import TaskList from "./TaskList";

function MyTasks({
  tasks,
  projects,
  onCompleteTask,
  onDeleteTask
}) {
  return (
    <main className="main">

      <h2>My Tasks</h2>

      <p>
        View and manage all your study tasks.
      </p>

      <TaskList
        tasks={tasks}
        projects={projects}
        onCompleteTask={onCompleteTask}
        onDeleteTask={onDeleteTask}
      />

    </main>
  );
}

export default MyTasks;