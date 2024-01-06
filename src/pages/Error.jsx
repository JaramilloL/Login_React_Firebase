import { useRouteError } from "react-router-dom"

const Error = () => {
    const error = useRouteError();

  return (
    <div>
      <p>{ error }</p>
    </div>
  )
}

export default Error
