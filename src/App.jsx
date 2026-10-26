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

  // =========================
  // TASKS FROM BACKEND
  // =========================

  const [tasks, setTasks] = useState([]);

  // =========================
  // PROJECTS
  // =========================

  const [projects, setProjects] = useState(function () {

    const savedProjects =
      localStorage.getItem("reactProjects");

    return savedProjects
      ? JSON.parse(savedProjects)
      : [];

  });

  // =========================
  // CURRENT PAGE
  // =========================

  const [activePage, setActivePage] =
    useState("dashboard");


  // =========================
  // LOAD TASKS FROM SPRING BOOT
  // =========================

  useEffect(function () {

    getTasks()
      .then(function (data) {

        console.log("Tasks received from backend:", data);

        setTasks(data);

      })
      .catch(function (error) {

        console.error(
          "Error loading tasks:",
          error
        );

      });

  }, []);


  // =========================
  // SAVE PROJECTS LOCALLY
  // =========================

  useEffect(function () {

    localStorage.setItem(
      "reactProjects",
      JSON.stringify(projects)
    );

  }, [projects]);


  // =========================
  // ADD TASK
  // =========================

  async function addTask(task) {

    try {

      // FIX: remove the id created by the form (Date.now()).
      // The Spring Boot backend generates the real id itself.
      const { id, ...taskWithoutId } = task;

      const savedTask =
        await createTask(taskWithoutId);

      setTasks(function (currentTasks) {

        return [
          ...currentTasks,
          savedTask
        ];

      });

    } catch (error) {

      console.error(
        "Error creating task:",
        error
      );

      alert("Could not create task.");

    }

  }


  // =========================
  // COMPLETE / UNDO TASK
  // =========================

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
        await updateTask(
          id,
          updatedTask
        );

      setTasks(function (currentTasks) {

        return currentTasks.map(function (task) {

          if (task.id === id) {

            return savedTask;

          }

          return task;

        });

      });

    } catch (error) {

      console.error(
        "Error updating task:",
        error
      );

      alert("Could not update task.");

    }

  }


  // =========================
  // DELETE TASK
  // =========================

  async function deleteTask(id) {

    try {

      await deleteTaskApi(id);

      setTasks(function (currentTasks) {

        return currentTasks.filter(function (task) {

          return task.id !== id;

        });

      });

    } catch (error) {

      console.error(
        "Error deleting task:",
        error
      );

      alert("Could not delete task.");

    }

  }


  // =========================
  // UI
  // =========================

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
