import { useContext } from "react"
import UserContext from "../context/UserContext"
import { Navigate, useNavigate } from "react-router-dom";

const PageHome = () => {
  const userNavigate = useNavigate()
  //state es el estado del reducer donde verofica si se logeo correctamente
  //user es el estado de quien es el usuario logeado
  const { state, user, logout, loginNotAcces } = useContext(UserContext);

  const handleOut = async()=>{
    loginNotAcces()
    //cerramos secion mediante un boton
    await logout()
    userNavigate('/login')
  }

  console.log(user)
  return (
    <div>
    {
      state.isAuthenticated ? (
        <div>
        <p>LOGEADO CON EXITO</p>
        <p>Bienvenido: {user.email}</p>
        </div>
      ):
      (
        <Navigate to={'/login'}/>
      )
    }
    <button onClick={handleOut}>LogOut</button>
    </div>
  )
}

export default PageHome
