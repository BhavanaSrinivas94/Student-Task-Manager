import { useEffect, useState } from "react";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask as deleteTaskApi
} from "./api/taskApi";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import MyTasks from "./Components/MyTasks";
import Projects from "./Components/Projects";

function App() {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState(function () {
    const savedProjects =
      localStorage.getItem("reactProjects");

    return savedProjects
      ? JSON.parse(savedProjects)
      : [];
  });

  const [activePage, setActivePage] =
    useState("dashboard");

  // Load tasks from Spring Boot
  useEffect(function () {

    getTasks()
      .then(function (data) {
        setTasks(data);
      })
      .catch(function (error) {
        console.error("Error loading tasks:", error);
      });

  }, []);

  // Save projects locally for now
  useEffect(function () {

    localStorage.setItem(
      "reactProjects",
      JSON.stringify(projects)
    );

  }, [projects]);


  // Add task to MySQL through Spring Boot
  async function addTask(task) {

    try {

      const savedTask = await createTask(task);

      setTasks(function (currentTasks) {
        return [...currentTasks, savedTask];
      });

    } catch (error) {

      console.error("Error creating task:", error);

      alert("Could not create task.");

    }
  }


  // Complete or undo task
  async function completeTask(id) {

    const task = tasks.find(function (task) {
      return task.id === id;
    });

    if (!task) {
      return;
    }

    const updatedTask = {
      ...task,
      completed: !task.completed
    };

    try {

      const savedTask =
        await updateTask(id, updatedTask);

      setTasks(function (currentTasks) {

        return currentTasks.map(function (task) {

          if (task.id === id) {
            return savedTask;
          }

          return task;

        });

      });

    } catch (error) {

      console.error("Error updating task:", error);

      alert("Could not update task.");

    }
  }


  // Delete task from MySQL
  async function deleteTask(id) {

    try {

      await deleteTaskApi(id);

      setTasks(function (currentTasks) {

        return currentTasks.filter(function (task) {
          return task.id !== id;
        });

      });

    } catch (error) {

      console.error("Error deleting task:", error);

      alert("Could not delete task.");

    }
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
          onAddTask={addTask}
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