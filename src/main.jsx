import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import UseState from './context/UseState'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <UseState>
    <RouterProvider router={router} />
  </UseState>
  </React.StrictMode>,
)
