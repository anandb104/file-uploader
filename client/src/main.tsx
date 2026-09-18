import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
function Main(){
const router=createBrowserRouter(
 [
 {path:"/",element:<App/>,
  children:[
    {path:"/",element:<Signup/>},
    {path:"login",element:<Login/>},
  ]
 }
 ]
)
return <RouterProvider router={router}/>
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main/>
  </StrictMode>,
)

