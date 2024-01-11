import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { getDocs, collection } from "firebase/firestore"; //para traerla coleccion de datos de firestore

//?Traemos la funcion crada en UseSttate que trae los datos de firestore
const TaskList = () => {
  //?creamos un estado para guardar el arreglo de tareas de la base de datos
  const [data, setdata] = useState([]);

  const { store } = useContext(UserContext);

  //*creamos una funcion asyncronica para llamar los datos
  useEffect(() => {
    const getTaskList = async () => {
      const querySnapshot = await getDocs(collection(store, "taskStore"));
      const dataQuerySnapshot = querySnapshot.docs.map((item) => item.data());
      setdata(dataQuerySnapshot);
      console.log(dataQuerySnapshot);
    };
    getTaskList();
  }, [store]);

  return (
    <div className="m-5">
      {data.map((task) => (
        <div className="card" key={task}>
          <div className="card-body">
            <h5 className="card-title text-center">{task.task}</h5>
            <p className="card-text">{task.description}</p>
            <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-danger border m-1">Delete Task</button>
              <button className="btn btn-light border m-1">Edit Task</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
