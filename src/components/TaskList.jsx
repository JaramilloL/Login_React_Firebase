const TaskList = () => {
  return (
    <div className="m-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-danger border m-1">Delete Task</button>
            <button className="btn btn-light border m-1">Edit Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
