import { useContext } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext"; //*impoeramos el estado global
import { useNavigate } from "react-router-dom";

const Login = () => {
	//usamos la navegacion para redirijir al usuario
	const navigateUser = useNavigate();
	//? Resivimos la funcion de sigup del contexto
	const { login, loginAcces } = useContext(UserContext);


	//? usamos react hook form para evaluar los estado de cada input es decir si estos son campos requeridos o no
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
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
				alert("Error User dont`t register");
		}
	});

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
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
				{errors?.email?.message}

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					{...register("password", {
						required: {
							value: true,
							message: "password is required",
						},
					})}
				/>
				{errors?.password?.message}
			
				<input type="submit" value="Login" />
				
			</form>
			
		</div>
	);
};

export default Login;