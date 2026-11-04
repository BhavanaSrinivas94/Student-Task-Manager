
function Statistics({ total, completed, pending, overdue, upcoming }) {
  const completionPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>Total Tasks</h3>
        <p>{total}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>

      <div className="stat-card">
        <h3>Overdue</h3>
        <p>{overdue}</p>
      </div>

      <div className="stat-card">
        <h3>Upcoming</h3>
        <p>{upcoming}</p>
      </div>

      <div className="stat-card progress-card">
        <h3>Task Completion</h3>
        <p>{completionPercentage}%</p>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <p className="progress-text">
          {completed} of {total} tasks completed
        </p>
      </div>
    </div>
  );
}

export default Statistics;
