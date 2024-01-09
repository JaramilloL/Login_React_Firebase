const TaskList = () => {
  return (
    <div>
      <div className="card">
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </p>
          <button className="btn btn-danger">Delete Task</button>
          <button className="btn btn-light">Edit Task</button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
