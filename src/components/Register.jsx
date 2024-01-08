import { useContext } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext"; //*impoeramos el estado global
import { useNavigate, Link } from "react-router-dom";

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
			console.log(error.message);

			if (error.code === "auth/weak-password")
				alert("Error password invalidate should more than 6 characters");

			else if (error.code === "auth/internal-error") {
				alert("Error email invalidate");
			}
			else if (error.code === "auth/email-already-in-use") {
				alert("Error this email is register")
			}
			else {
				alert("Error password or email invalidate")
			}
		}
		reset();
	});
	return (
		<div className="">
			<form onSubmit={onSubmit} className="w-25 m-auto mt-5 dark-glass-container">
				<div className="form-floating mb-3">
					<input
						id="floatingInput"
						className="form-control"
						type="text"
						name="username"
						{...register("username", {
							required: {
								value: true,
								message: "Username is required",
							},
						})}
					/>
					<label htmlFor="floatingInput">User name</label>
				</div>
				<p className="text-danger text-center">{errors?.username?.message}</p>

				<div className="form-floating mb-3">
					<input
						id="floatingEmail"
						className="form-control"
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
					<label htmlFor="floatingEmail">Email</label>
				</div>
				<p className="text-danger text-center">{errors?.email?.message}</p>

				<div className="form-floating mb-3">
					<input
						id="floatingPassword"
						className="form-control"
						type="password"
						name="password"
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

				<div className="d-flex justify-content-between align-items-center">
					<Link to={'/login'} className="btn btn-primary text-center">Login</Link>
					<input type="submit" value="Register" className="btn btn-primary border w-50" />
				</div>
			</form>
		</div>
	);
};

export default Register;
