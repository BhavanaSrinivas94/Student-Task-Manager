function Statistics({ total, completed, pending }) {

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

    </div>

  );

}

export default Statistics;