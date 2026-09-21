import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
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
import {Link} from "react-router";
export default function Folderfile(){
    const [folders,setfolders]=useState<foldertype[]>([]);
    const [files,setfiles]=useState<filetype[]>([]);
   async function getfoldersfiles(){
    const response=await fetch(`${import.meta.env.VITE_API_URL}/dashboard`,{
        credentials:"include"
    })
    const data=await response.json();
    setfolders(data.folders);
    setfiles(data.files);
   }
   useEffect(()=>{
    getfoldersfiles();
   },[])
    return(
        <div className="bg-neutral-900 h-200 w-375 flex flex-col items-center gap-5 text-white">
           
            <section className="flex flex-col gap-10 text-white w-full pl-10">
                <h2 className="justify-start text-2xl pt-5 font-[IM_Fell_DW_Pica_SC]">Folders</h2>
                {folders.map((folder)=>{
                    return(
                        <Link to={`/dashboard/folder/${folder.id}`}>
        <Card className="h-50 w-50">
        <CardContent className="justify-center items-center">
        <Folder className="h-30 w-30"/>
         </CardContent>
        <CardFooter className="flex justify-center items-center font-[IM_Fell_DW_Pica_SC] text-xl">
        <p>{folder.name}</p>
        </CardFooter>
         </Card>
         </Link>
                );
})}
         </section>
         <section className="flex flex-col gap-10 text-white w-full pl-10">
         <h2 className="justify-start text-2xl pt-5 font-[IM_Fell_DW_Pica_SC]">Files</h2>
                {files.map((file)=>{
                    return(
                        <Link to={`/dashboard/file/${file.id}`}>
        <Card className="h-50 w-50">
        <CardContent className="justify-center items-center">
        <File className="h-30 w-30"/>
         </CardContent>
        <CardFooter className="flex justify-center items-center font-[IM_Fell_DW_Pica_SC] text-xl">
        <p>{file.name}</p>
        </CardFooter>
         </Card>
         </Link>
                );
})}
         </section>
        </div>
    )
}