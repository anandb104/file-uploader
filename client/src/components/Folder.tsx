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
import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
  import {File} from "lucide-react";
import { useEffect } from "react";
import {Link} from "react-router";
import { useParams } from "react-router";
import { useState } from "react";
export default function Folder(){
    const [files,setfiles]=useState<filetype[]>([]);
    const {id}=useParams();
    console.log(id);
    async function getfiles(){
      const response=await fetch(`${import.meta.env.VITE_API_URL}/folder/${id}`,{
        credentials:"include"
      })
      const data=await response.json();
      setfiles(data.folder.files);
    }
    useEffect(()=>{
        getfiles();
    },[])
    return(
        <div className="bg-neutral-900 h-200 w-375 flex flex-col items-center gap-5 text-white">
            <section className="flex flex-col gap-10 text-white w-full pl-10">
         <h2 className="justify-start text-2xl pt-5 font-[IM_Fell_DW_Pica_SC]">Files</h2>
         <div className="flex flex-wrap gap-5">
                {files.map((file)=>{
                    return(
                        <Link to={`/dashboard/file/${file.id}`} key={file.id}>
        <Card className="h-50 w-70 flex justify-center">
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