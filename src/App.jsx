import { useEffect, useState } from "react";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import MyTasks from "./Components/MyTasks";
import Projects from "./Components/Projects";

function App() {
  const [tasks, setTasks] = useState(function () {
    const savedTasks = localStorage.getItem("reactTasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  const [projects, setProjects] = useState(function () {
    const savedProjects =
      localStorage.getItem("reactProjects");

    return savedProjects
      ? JSON.parse(savedProjects)
      : [];
  });

  const [activePage, setActivePage] =
    useState("dashboard");

  // Save tasks
  useEffect(function () {
    localStorage.setItem(
      "reactTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // Save projects
  useEffect(function () {
    localStorage.setItem(
      "reactProjects",
      JSON.stringify(projects)
    );
  }, [projects]);

  // Complete or undo a task
  function completeTask(id) {
    setTasks(function (currentTasks) {
      return currentTasks.map(function (task) {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed
          };
        }

        return task;
      });
    });
  }

  // Delete a task
  function deleteTask(id) {
    setTasks(function (currentTasks) {
      return currentTasks.filter(function (task) {
        return task.id !== id;
      });
    });
  }

  return (
    <div>

      <Header />

      <Sidebar
        onNavigate={setActivePage}
      />

      {activePage === "dashboard" && (
        <Dashboard
          tasks={tasks}
          setTasks={setTasks}
          projects={projects}
        />
      )}

      {activePage === "tasks" && (
        <MyTasks
          tasks={tasks}
          projects={projects}
          onCompleteTask={completeTask}
          onDeleteTask={deleteTask}
        />
      )}

      {activePage === "projects" && (
        <Projects
          tasks={tasks}
          setTasks={setTasks}
          projects={projects}
          setProjects={setProjects}
        />
      )}

      {activePage === "settings" && (
        <main className="main">

          <h2>Settings</h2>

          <p>
            Settings will be added later.
          </p>

        </main>
      )}

    </div>
  );
}

export default App;