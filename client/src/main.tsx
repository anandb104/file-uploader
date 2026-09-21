import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import Folder from "./components/Folder.tsx";
import File from "./components/File.tsx";
import Folderfile from "./components/Folderfile.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { Toaster } from "@/components/ui/sonner"
function Main(){
const router=createBrowserRouter(
 [
 {path:"/",element:<App/>,
  children:[
    {index:true,element:<Signup/>},
    {path:"login",element:<Login/>},
  ]
 },
 {path:"/dashboard",element:<Dashboard/>,
  children:[
    {path:"folder/:id",element:<Folder/>},
    {path:"file/:id",element:<File/>},
    {index:true,element:<Folderfile/>}
  ]
 }
 ]
)
return (
  <>
<RouterProvider router={router}/>
<Toaster/>
</>
)
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main/>
  </StrictMode>,
)

