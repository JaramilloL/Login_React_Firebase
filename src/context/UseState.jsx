import { useReducer, useState } from "react";
import UserReducer from "./UserReducer";
import UserContext from "./UserContext";
import PropTypes from "prop-types";
import { useEffect } from "react"
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, 
		signInWithEmailAndPassword, 
		onAuthStateChanged, signOut, 
		GoogleAuthProvider,
		signInWithPopup,
		sendPasswordResetEmail } from "firebase/auth";
 //? LLamamos a las funciones de autentucacion de firebase
//?  createUserWithEmailAndPassword = creat un usuario nuevo en la base de datos de firebase, signInWithEmailAndPassword = hace la funcion de login si existe un usuario registrafo con el mismo correo y password, onAuthStateChanged = crea un estado en el cual se mantienen los datos del inicio de secion y el cerre de sesion

const UseState = ({ children }) => {
	//guardamos el esto del login en un estado para saber si este esta o no logeado
	const [user, setUser] = useState(null)
	const initialState = {
		isAuthenticated: false,
		user: null,
	};

	//? Creamo una funcion para guardar los datos del registro
	const singUp = (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

    //? Crea,os una funcion login para guardar el inicio de session
    const login = async(email, password) => signInWithEmailAndPassword(auth, email, password);
		//usamos las credesnciales del usuario para ver los parametros de su registro
	
	//?creamos una funcion para actualizar el payload
	const loginAcces = ()=> dispatch({ type: 'LOGIN'})

	const loginNotAcces = ()=> dispatch({ type: 'LOGOUT'})

	//? Creamos la funcion para cerrar secion es decir un logout
	const logout = ()=> signOut(auth)

	const loginGoogle = ()=> {
		const loginWithGoogle = new GoogleAuthProvider();
		return signInWithPopup(auth, loginWithGoogle)
	}

	const resetPassword = (email)=> sendPasswordResetEmail(auth, email)

	//?usamos el reducer oara mantener las acciones
	const [state, dispatch] = useReducer(UserReducer, initialState);

	//* Creamos un useeffect para ejecutar el estado del usuario
	useEffect(()=> {
		// aqui ejecutamos el estado del usuario en cuanto a su logeo
		//el segundo parametro es un objeto que nos regresa
		onAuthStateChanged(auth, (currectUser) => {
			console.log(currectUser)
			setUser(currectUser);
		});
	},[])

	return (
		<UserContext.Provider value={{ state, dispatch, singUp, login, loginAcces, user, logout, loginNotAcces, loginGoogle, resetPassword }}>
			{children}
		</UserContext.Provider>
	);
};

export default UseState;

UseState.propTypes = {
	children: PropTypes.any,
};
