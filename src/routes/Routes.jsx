import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Error from "../pages/Error";
import PageLogin from "../pages/PageLogin";
import PageRegister from "../pages/PageRegister";
import PageHome from "../pages/PageHome";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <Error/>,
        children: [
            {
                path: '/login',
                element: <PageLogin/>
            },
            {
                path: '/register',
                element: <PageRegister/>
            },
            {
                path: '/home',
                element: <PageHome/>
            },
            {
                path: '/*',
                element: <Navigate to={'/'}/>
            }
        ]
    }
])