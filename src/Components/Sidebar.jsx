function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">

      <h2>Menu</h2>

      <nav>

        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("dashboard");
          }}
        >
          Dashboard
        </a>

        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("tasks");
          }}
        >
          My Tasks
        </a>

        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("projects");
          }}
        >
          Projects
        </a>

        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("settings");
          }}
        >
          Settings
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;