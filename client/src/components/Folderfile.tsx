import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
import { useEffect, useState } from "react"
type foldertype={
    id:string,
    name:string,
    created:Date,
    userid:string
}
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
import {File,Folder} from "lucide-react";
import buttonbg from "../assets/bg-btn.jpg"

import {Link, useOutletContext} from "react-router";
export default function Folderfile(){
    const {folders,fileadded}=useOutletContext<{folders:foldertype[],fileadded:File|null}>()
    const [files,setfiles]=useState<filetype[]>([]);
   async function getfoldersfiles(){
    const response=await fetch(`${import.meta.env.VITE_API_URL}/dashboard`,{
        credentials:"include"
    })
    const data=await response.json();
    setfiles(data.files);
   }
   useEffect(()=>{
    getfoldersfiles();
   },[fileadded])
    return(
        <div className="bg-neutral-900 h-200 w-375 flex flex-col items-center gap-5 text-white overflow-y-scroll">
           
            <section className="flex flex-col gap-10 text-white w-full pl-10">
                <h2 className="justify-start text-2xl pt-5 font-[IM_Fell_DW_Pica_SC]">Folders</h2>
                <div className="flex flex-wrap gap-5">
                {folders.map((folder)=>{
                    return(
                        <Link to={`/dashboard/folder/${folder.id}`} key={folder.id}>
        <Card className="h-50 w-50" style={{backgroundImage:`url(${buttonbg})`}}>
        <CardContent className="justify-center items-center">
        <Folder className="h-30 w-50"/>
         </CardContent>
        <CardFooter className="flex justify-center items-center font-[IM_Fell_DW_Pica_SC] text-xl">
        <p>{folder.name}</p>
        </CardFooter>
         </Card>
         </Link>
                );
})}
</div>
         </section>
         <section className="flex flex-col gap-10 text-white w-full pl-10">
         <h2 className="justify-start text-2xl pt-5 font-[IM_Fell_DW_Pica_SC]">Files</h2>
         <div className="flex flex-wrap gap-5">
                {files.map((file)=>{
                    return(
                        <Link to={`/dashboard/file/${file.id}`} key={file.id}>
        <Card className="h-50 w-70 flex justify-center" style={{backgroundImage:`url(${buttonbg})`}}>
        <CardContent className="justify-center items-center">
        <File className="h-30 w-50"/>
         </CardContent>
        <CardFooter className="flex justify-center items-center font-[IM_Fell_DW_Pica_SC] text-xl">
        <p>{file.name}</p>
        </CardFooter>
         </Card>
         </Link>
                );
})}
</div>
         </section>
        </div>
    )
}