import {Link} from "react-router"
export default function Header(){
    return (
        <Link to="/">
        <div className="h-30 text-5xl flex justify-center items-center text-white font-['Love_Ya_Like_A_Sister']">
            File 
            <div className="text-yellow-500">
            Uploader
            </div>
        </div>
        </Link>
    )
}