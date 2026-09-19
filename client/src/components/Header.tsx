import {Link} from "react-router"
export default function Header(){
    return (
        <Link to="/">
        <div className="h-20 text-2xl flex justify-center items-center text-white">
            File 
            <div className="text-yellow-500">
            Uploader
            </div>
        </div>
        </Link>
    )
}