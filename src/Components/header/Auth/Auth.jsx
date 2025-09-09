import { IoCloseSharp } from "react-icons/io5";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { useEffect, useState } from "react";

export function Auth({onClose}) {
    const [showComponents, setShowComponents] = useState(false);
    const handelOpenRegister = () => {
        setShowComponents(true);
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [])
    return (
        <div className=" max-w-[815px] w-full flex items-center justify-center bg-[#191E2E] relative rounded-[10px]">
            {!showComponents ? (
                <Login onShowRegister={handelOpenRegister}/>
            ) : (
                <Register/>
            )}
            <button className="w-5 h-5 absolute top-[21px] right-[23px]"><IoCloseSharp className="text-2xl text-[#FFFFFF]" onClick={() => onClose()} /></button>
        </div>
    )
}