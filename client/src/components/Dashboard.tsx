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
type foldertype={
    id:string,
    name:string,
    created:Date,
    userid:string
}
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default function Dashboard(){
 const [folders,setfolders]=useState<foldertype[]>([]);
    const[user,setuser]=useState("");
    const [foldername,setfoldername]=useState<string>("");
    const [file,setfile]=useState<File|null>(null);
    const [fileadded,setfileadded]=useState(0);
    const [folderid,setfolderid]=useState("");
    async function getfolders(){
        const response=await fetch(`${import.meta.env.VITE_API_URL}/dashboard`,{
            credentials:"include"
        })
        const data=await response.json();
        setfolders(data.folders);
       }
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
     getfolders();
    }
    useEffect(()=>{
        getfolders();
    },[])
    async function handlefilesubmit(){
        if(!file)return;
        const formdata=new FormData();
        formdata.append("file",file);
        if(folderid!="none"){
            formdata.append("folderid",folderid);
        }
        const response=await fetch(`${import.meta.env.VITE_API_URL}/file/upload`,{
           method:"POST",
           credentials:"include",
           body:formdata
        })
        const data=await response.json();
        if(!response.ok){
           toast.error(data.message,{position:"bottom-right"});
           return;
        }
        toast.success(data.message,{position:"bottom-right"});
        setfile(null);
        setfileadded((prev)=>prev+1);
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
        <Dialog>
       <DialogTrigger asChild>
       <Button className="bg-yellow-500 font-[IM_Fell_DW_Pica_SC]">Upload File</Button>
     </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Upload File</Label>
              <Input id="name-1" name="file" type="file" placeholder="Enter Your File"  onChange={(e)=>setfile(e.target.files[0])} />
            </Field>
            <Field>
            <Label >Folders</Label>
            <Select value={folderid} onValueChange={setfolderid} >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select A Folder"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="none">
              None
            </SelectItem>
          {folders.map((folder) => (
            <SelectItem key={folder.id} value={folder.id}>
              {folder.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
           <DialogClose asChild>
           <Button variant="outline">Cancel</Button>
           </DialogClose>
            <DialogClose asChild>
            <Button type="submit" onClick={handlefilesubmit}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
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
        <Outlet context={{folders,fileadded}}/>
        </div>
        </div>
    )
}