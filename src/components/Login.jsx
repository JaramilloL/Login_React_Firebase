import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext"; //*impoeramos el estado global
import { useNavigate, Link } from "react-router-dom";
import Alert from './Alert';

const Login = () => {
	//estado para almacenar el error de cada alerta
	const [messageError, setMessageError] = useState('');
	
	//usamos la navegacion para redirijir al usuario
	const navigateUser = useNavigate();
	//? Resivimos la funcion de sigup del contexto
	const { login, loginAcces, loginGoogle, user, resetPassword } = useContext(UserContext);

	//funcion para ejecutar el evento del inicio de sesion con google
	const handleGoogleLogin = async ()=>{
		try{
			await loginGoogle()
			loginAcces()
			navigateUser('/home')
		}catch(err){
			console.log(err.message)
		}
	}
	//reseteo de password
	const handleResetPassword = async () => {
		const userEmail = getValues("email");

		if (!userEmail) {
		  //return alert("You have not added an email");
		  setMessageError('You have not added an email')
		}
		await resetPassword(userEmail);
		console.log("reset")
	  };


	//? usamos react hook form para evaluar los estado de cada input es decir si estos son campos requeridos o no
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
		getValues, //funcion para evaluar los campos de entrada
	} = useForm();

	const onSubmit = handleSubmit(async (data, e) => {
		e.preventDefault();
		console.log(data);
		console.log(data.email);
		console.log(data.password);
		try {
			//? Le pasamos los parametros del inicio de secion
			await login(data.email, data.password);
			loginAcces()
			navigateUser('/home')
			reset();
		} catch (error) {
			console.log(error.code);
			if (error.code === "auth/invalid-credential")
				setMessageError("Error User dont`t register");
			else if(error.code === "auth/too-many-requests")
			setMessageError("too many request")
		}
	});

	return (
		<div className="">
			<form onSubmit={onSubmit} className="w-25 m-auto mt-5 dark-glass-container">
				<div className="form-floating mb-3">
				<input
					type="email"
					name="email"
					id="floatingInput"
					className="form-control"
					{...register("email", {
						required: {
							value: true,
							message: "email is required",
						},
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: "Invalid email address",
						},
					})}
				/>
				<label htmlFor="floatingInput">Email</label>
				</div>
				<p className="text-danger text-center">{errors?.email?.message}</p>

				<div className="form-floating mb-3">
				<input
					type="password"
					name="password"
					id="floatingPassword"
					className="form-control"
					{...register("password", {
						required: {
							value: true,
							message: "password is required",
						},
					})}
				/>
				<label htmlFor="floatingPassword">Password</label>
				</div>
				<p className="text-danger text-center">{errors?.password?.message}</p>

				<div className="text-center mt-5 justify-content-betteewn">
					<input type="submit" value="Login" className="btn btn-primary w-100 mb-2"/>
					<a href="#" className="h6 text-dark" onClick={handleResetPassword}>Forgot password?</a>
					<p className="text-decoration-underline text-dark"> or </p>
					<Link to={'/register'} className="h6 text-dark">Register</Link>
				</div>
				
				
			</form>
			{ /**Creamos un boton para el inicio de sesion mediante google */ }
			<div className="text-center mt-2">
				<button onClick={handleGoogleLogin} className="btn border w-25 m-auto bg-google"><span className="bi bi-google me-2"></span>Google</button>
			</div>
			<Alert message={messageError} />
		</div>
	);
};

export default Login;