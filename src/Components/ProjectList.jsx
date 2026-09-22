function ProjectList({
  projects,
  tasks,
  onDeleteProject
}) {

  return (

    <div className="project-container">

      {projects.length === 0 ? (

        <p>No projects found.</p>

      ) : (

        projects.map(function (project) {

          // Tasks belonging to this project
          const projectTasks = tasks.filter(function (task) {

            return task.projectId == project.id;

          });


          // Completed tasks
          const completedTasks =
            projectTasks.filter(function (task) {

              return task.completed;

            }).length;


          // Pending tasks
          const pendingTasks =
            projectTasks.length - completedTasks;


          return (

            <div
              className="project-card"
              key={project.id}
            >

              <h3>{project.name}</h3>


              <p>
                {project.description ||
                  "No description"}
              </p>


              <p>
                <strong>Total Tasks:</strong>{" "}
                {projectTasks.length}
              </p>


              <p>
                <strong>Completed:</strong>{" "}
                {completedTasks}
              </p>


              <p>
                <strong>Pending:</strong>{" "}
                {pendingTasks}
              </p>


              <button
                onClick={() =>
                  onDeleteProject(project.id)
                }
              >
                Delete Project
              </button>

            </div>

          );

        })

      )}

    </div>

  );

}

export default ProjectList;