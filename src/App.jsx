import Login from "./components/Login"
import Register from "./components/Register"
import UseState from "./context/UseState"

const App = () => {
  return (
    <UseState>
      <Login/>
      <hr />
      <p>register</p>
      <Register/>
    </UseState>
  )
}

export default App
