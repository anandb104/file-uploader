import {Link} from "react-router"
import { Button } from "./ui/button"
type dashboardheaderprops={
    user:string
}
import { toast } from "sonner"
import { useNavigate } from "react-router"
export default function Dashboardheader({user}:dashboardheaderprops){
    const navigate=useNavigate();
    async function handlelogout(){
    const response=await fetch(`${import.meta.env.VITE_API_URL}/logout`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },credentials:"include"
    },)
    const data=await response.json();
    if(!response.ok){
        toast.error(data.message,{position:"bottom-center"});
        return;
    }
     toast.success(data.message,{position:"bottom-center"});
     navigate("/");
    }
return(
    <div className="h-30 text-5xl flex items-center gap-220  text-white font-['Love_Ya_Like_A_Sister']">
    <Link to="/dashboard">
        <div className="flex flex-row justify-start ml-5">
        File 
        <div className="text-yellow-500">
        Uploader
        </div>
        </div>
        </Link>
        <div className="flex items-center gap-15">
            <div>@{user}</div>
        <Button className="text-white bg-yellow-500 w-30 h-10 text-2xl" onClick={handlelogout}>Log Out</Button>
        </div>
    </div>
    
)
}