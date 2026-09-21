import { useEffect, useState } from "react";
import Dashboardheader from "../components/Dashboardheader.tsx";
import { Outlet } from "react-router";
import { Button } from "./ui/button.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
 import { Field, FieldGroup } from "@/components/ui/field"
 import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Dashboard(){
    const[user,setuser]=useState("");
    const [foldername,setfoldername]=useState<string>("");
    const [folderadded,setfolderadded]=useState(0);
    async function handlefoldersubmit(){
     const response=await fetch(`${import.meta.env.VITE_API_URL}/folder`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
            name:foldername
        })
     })
     const data=await response.json();
     if(!response.ok){
        toast.error(data.message,{position:"bottom-right"});
        return;
     }
     toast.success(data.message,{position:"bottom-right"});
     setfoldername("");
     setfolderadded((prev)=>prev+1);
    }
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
        <div className="flex gap-10 mb-5 overflow-y-scroll ml-315">
        <Button className="bg-yellow-500 font-[IM_Fell_DW_Pica_SC]">Upload File</Button>
        <Dialog>
       <DialogTrigger asChild>
       <Button className="bg-yellow-500 font-[IM_Fell_DW_Pica_SC]">Add Folder</Button>
     </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
    
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">New folder name</Label>
              <Input id="name-1" name="foldername"  placeholder="Enter Your Folder Name" value={foldername} onChange={(e)=>setfoldername(e.target.value)} />
            </Field>
          </FieldGroup>
          <DialogFooter>
           <DialogClose asChild>
           <Button variant="outline">Cancel</Button>
           </DialogClose>
            <DialogClose asChild>
            <Button type="submit" onClick={handlefoldersubmit}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
        </div>
        <div className="bg-black">
        <Outlet context={{folderadded}}/>
        </div>
        </div>
    )
}