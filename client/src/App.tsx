import './App.css'
import Header from "./components/Header.tsx";
import {Outlet} from "react-router";
function App() {
  return (
    <div className='bg-black'>
      <Header/>
      <Outlet/>
      </div>
  )
}

export default App
