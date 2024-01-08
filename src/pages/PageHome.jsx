import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import ProfileNotGoogle from "../components/ProfileNotGoogle";

const PageHome = () => {
  const userNavigate = useNavigate();
  //state es el estado del reducer donde verofica si se logeo correctamente
  //user es el estado de quien es el usuario logeado
  const { state, user, logout, loginNotAcces } = useContext(UserContext);

  const handleOut = async () => {
    loginNotAcces();
    //cerramos secion mediante un boton
    await logout();
    userNavigate("/login");
  };

  console.log(user);
  return (
    <div>
      {state.isAuthenticated ? (
        <div>
          {user.displayName ? (
            <Profile user={user} handleOut={handleOut}/>
          ) : (
            <ProfileNotGoogle user={user} handleOut={handleOut}/>
          )}
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default PageHome;
