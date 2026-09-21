import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { useEffect, useState } from "react"
  type filetype={
    id:string,
    name:string,
    created:Date,
    userid:string,
    folderid:string,
    mime:string,
    size:number,
    path:string,
    filename:string
}
import { toast } from "sonner"
import { useParams } from "react-router"
import buttonbg from "../assets/bg-btn.jpg"
import { Button } from "./ui/button"
export default function File(){
    const [files,setfiles]=useState<filetype|undefined>();
    const {id}=useParams();
    async function getfile(){
    const response=await fetch(`${import.meta.env.VITE_API_URL}/file/${id}`,{
        credentials:"include"
    })
    const data=await response.json();
    setfiles(data.file);
    }
    async function handledownload(){
    const response=await fetch(`${import.meta.env.VITE_API_URL}/file/${id}/download`,{
        credentials:"include"
    });
    if(!response.ok){
        const data=await response.json();
        toast.error(data.message);
        return;
    }
    const blob=await response.blob();
    const url=window.URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=files.name;
    a.click();
    window.URL.revokeObjectURL(blob);
    }
    useEffect(()=>{
        getfile();
    },[])
    return(
        <div className="bg-neutral-900 h-200 w-375 flex flex-col items-center gap-5 text-white justify-center" >
            {files && (
            <Card className="h-130 w-130 flex flex-col  font-[IM_Fell_DW_Pica_SC] relative"style={{backgroundImage:`url(${buttonbg})`}}>
        <CardContent className="flex flex-col  gap-10 h-80 w-80 relative top-10 left-5">
        <p  className="text-2xl flex relative left-5 ">FileName:<br></br>{files.name}</p>
        <p className="text-2xl flex relative left-5">Mime:<br></br>{files.mime}</p>
        <p className="text-2xl relative left-5">Size:<br></br>{files.size}</p>
        <Button className="bg-orange-400 text-black relative left-5 " onClick={handledownload}>Download<img src='/download.png' className="h-5 w-5"></img></Button>
         </CardContent>
         </Card>
            )
}
            </div>
    )
}