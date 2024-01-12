//? Aqui se implementara la creacion de tareas para agregar la informacion en firebase storage
import { collection, addDoc } from "firebase/firestore";

//* Usamo useForm para e control de losdatos del formuario
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const Task = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmite = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  const { store } = useContext(UserContext); //extraemos el store de el almacenamiento

  //?contruimos una funcion para a;macenar los datos en firestore
  const storeTask = async () => {
    const taskTitle = getValues("task");
    const desciptions = getValues("descriptions");
    try {
      const storeRequest = await addDoc(collection(store, "taskStore"), {
        task: taskTitle,
        description: desciptions,
      });
      console.log("this is id of task" + storeRequest.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="form-control w-50 m-2">
      <form
        className="w-100  d-flex justify-content-evenly"
        onSubmit={onSubmite}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingTask"
            placeholder="Task"
            name="task"
            {...register("task", {
              required: {
                value: true,
                message: "task is required",
              },
            })}
          />
          <label htmlFor="floatingTask">Add title of the task</label>
        </div>
        {errors?.task?.message}

        <div className="form-floating">
          <textarea
            rows="5"
            className="form-control"
            id="floatingDesciptions"
            placeholder="Descriptions"
            name="descriptions"
            {...register("descriptions", {
              required: {
                value: true,
                message: "descriptions is required",
              },
            })}
          />
          <label htmlFor="floatingDesciptions">Descriptions</label>
        </div>
        {errors?.descriptions?.message}
        <div className="d-block justify-content-center m-auto">
          <input
            type="submit"
            value="Create Task"
            className="btn btn-primary"
            onClick={storeTask}
          />
        </div>
      </form>
    </div>
    </div>
  );
};

export default Task;
