//? Aqui se implementara la creacion de tareas para agregar la informacion en firebase storage

const Task = () => {
  return (
    <div className="form-control w-50 m-2">
      <form className="w-100  d-flex justify-content-evenly">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingTask"
            placeholder="Task"
          />
          <label htmlFor="floatingTask">Add title of the task</label>
        </div>
        <div className="form-floating">
          <textarea
            rows="5"
            className="form-control"
            id="floatingDesciptions"
            placeholder="Descriptions"
          />
          <label htmlFor="floatingDesciptions">Descriptions</label>
        </div>
      </form>
      <div className="d-flex justify-content-center">
      <input type="submit" value="Create Task" className="btn btn-primary" />
      </div>
    </div>
  );
};

export default Task;
