import { useState } from "react";

function ProjectForm({ onAddProject }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  function handleSubmit(event) {

    event.preventDefault();


    if (name.trim() === "") {

      alert("Please enter a project name.");

      return;

    }


    const newProject = {

      id: Date.now(),

      name: name,

      description: description

    };


    onAddProject(newProject);


    // Clear form
    setName("");
    setDescription("");

  }


  return (

    <form
      className="project-form"
      onSubmit={handleSubmit}
    >

      <h2>Add New Project</h2>


      <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />


      <textarea
        placeholder="Project description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />


      <button type="submit">
        Add Project
      </button>

    </form>

  );

}

export default ProjectForm;