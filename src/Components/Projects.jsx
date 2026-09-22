import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

function Projects({
  tasks,
  setTasks,
  projects,
  setProjects
}) {

  function addProject(project) {
    setProjects(function (currentProjects) {
      return [...currentProjects, project];
    });
  }

  function deleteProject(id) {

    const project = projects.find(
      function (project) {
        return project.id === id;
      }
    );

    if (!project) {
      return;
    }

    const confirmDelete = confirm(
      `Delete project "${project.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    // Delete the project
    setProjects(function (currentProjects) {
      return currentProjects.filter(
        function (project) {
          return project.id !== id;
        }
      );
    });

    // Remove project from related tasks
    setTasks(function (currentTasks) {
      return currentTasks.map(
        function (task) {

          if (task.projectId == id) {
            return {
              ...task,
              projectId: ""
            };
          }

          return task;
        }
      );
    });
  }

  return (
    <main className="main">

      <h2>My Projects</h2>

      <p>
        Organize your tasks into different projects.
      </p>

      <ProjectForm
        onAddProject={addProject}
      />

      <ProjectList
        projects={projects}
        tasks={tasks}
        onDeleteProject={deleteProject}
      />

    </main>
  );
}

export default Projects;