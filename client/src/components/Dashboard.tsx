import { useEffect, useState } from "react";
import Dashboardheader from "../components/Dashboardheader.tsx";
import { Outlet } from "react-router";
export default function Dashboard(){
    const[user,setuser]=useState("");
    useEffect(()=>{
       async function getuser(){
      const response=await fetch(`${import.meta.env.VITE_API_URL}/auth/me`,{
       credentials:"include"
      });
      const data=await response.json();
      setuser(data.username);
    }
    getuser();
    },[])
    return (
        <div className="bg-black min-h-screen">
        <Dashboardheader user={user}/>
        <div className="bg-black">
        <Outlet/>
        </div>
        </div>
    )
}