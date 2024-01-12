import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import {
  getDocs,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore"; //para traerla coleccion de datos de firestore

//?Traemos la funcion crada en UseSttate que trae los datos de firestore
const TaskList = () => {
  //?creamos un estado para guardar el arreglo de tareas de la base de datos
  const [data, setdata] = useState([]);

  //*creamos estados para ela edicion de tareas
  const [editTasks, setEditTasks] = useState("");
  const [editDescription, setEditDescription] = useState("");
  //creamos otro estado para asegurarnos si el usuario quiere editar o no
  const [editMode, setEditMode] = useState(null);

  const { store } = useContext(UserContext);

  //*creamos una funcion asyncronica para llamar los datos
  useEffect(() => {
    //*onSnapshot nos ayuda a acutualizar de manera asincrona los datos para evitar refrescar la pagina
    onSnapshot(collection(store, "taskStore"), () => {
      const getTaskList = async () => {
        const querySnapshot = await getDocs(collection(store, "taskStore"));
        const dataQuerySnapshot = querySnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        //?Guardamos como un objeto el id y la data que se guarda en la base de datos
        setdata(dataQuerySnapshot);
        console.log(dataQuerySnapshot);
      };
      getTaskList();
    });
  }, [store]);
  //TODO: en esta funcion bamos a borrar loos datos de una tarea del storage
  const deleteTask = async (id) => {
    console.log("task.id:", id);
    await deleteDoc(doc(store, "taskStore", id));
  };
  //?Creamos la funcion de editar elementos
  const editTask = async (id) => {
    console.log("edit task.id:", id);
    const edit = await getDoc(doc(store, "taskStore", id));
    //? Guardamos el documento de editar en una variable para alterar los valores
    const taskEditing = edit.data();
    setEditTasks(taskEditing.task);
    setEditDescription(taskEditing.description);
    setEditMode(id);
  };

  //?Creamos una funcion para actualizar la edicion
  const saveEditedTask = async (id) => {
    const newTask = editTasks;
    const newTaskDescription = editDescription;

    await updateDoc(doc(store, "taskStore", id), {
      task: newTask,
      description: newTaskDescription,
    });
    setEditDescription("");
    setEditTasks("");
    setEditMode(null);
  };

  return (
    <div className="m-5">
      {data.map((task) => (
        <div className="card" key={task.id}>
          <div className="card-body">
            {
              //creamos una condicion para mostrar input nuevos para la edicion
              editMode === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTasks}
                    onChange={(e) => setEditTasks(e.target.value)}
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h5 className="card-title text-center">{task.task}</h5>
                  <p className="card-text">{task.description}</p>
                </>
              )
            }

            <div className="d-flex justify-content-center align-items-center">
              <button
                className="btn btn-danger border m-1"
                onClick={() => deleteTask(task.id)}
              >
                Delete Task
              </button>
              {editMode === task.id ? (
                <button
                  className="btn btn-success border m-1"
                  onClick={() => saveEditedTask(task.id)}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="btn btn-light border m-1"
                  onClick={() => editTask(task.id)}
                >
                  Edit Task
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
