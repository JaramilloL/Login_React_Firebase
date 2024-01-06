import { useContext } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext"; //*impoeramos el estado global
import { useNavigate } from "react-router-dom";

const Register = () => {
	//usamos la navegacion para redirijir al usuario
	const navigateUser = useNavigate();
	//? Resivimos la funcion de sigup del contexto
	const { singUp } = useContext(UserContext);

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
		console.log(data.username);
		console.log(data.email);
		console.log(data.password);
		try {
			//? Le pasamos los parametros del inicio de secion
			await singUp(data.email, data.password);
			navigateUser("/login");
		} catch (error) {
			console.log(error.code);
			if (error.code === "auth/weak-password")
				alert("Error password invalidate should more than 6 characters");
			else if (error.code === "auth/internal-error") {
				alert("Error email invalidate");
			}
			else if (error.code === "auth/email-already-in-use"){
				alert("Error this email is register")
			}
		}
		reset();
	});
	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor="username">User name</label>
				<input
					type="text"
					name="username"
					{...register("username", {
						required: {
							value: true,
							message: "Username is required",
						},
					})}
				/>
				{errors?.username?.message}

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

				<input type="submit" value="Register" />
			</form>
		</div>
	);
};

export default Register;
