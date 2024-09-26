import { FaVk,  FaGoogle, FaFacebookF , FaTwitter } from "react-icons/fa";


export function Login({onShowRegister}) {
    return (
        <div className="max-w-[422px] w-full flex flex-col items-center gap-[18px] my-[40px] px-8">
            <h5 className="text-[40px] font-extrabold text-white">Войти</h5>
            <div className="flex flex-col gap-[14px] text-[17px] text-[#FFFFFF99] w-full ">
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none"  type="text" placeholder="Логин, почта или телефон" />
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="password" placeholder="Ваш пароль" />
            </div>
            <div className="flex flex-col gap-[14px] w-full">
                <button className="bg-[#F2F60F] rounded-[10px] py-[14px] text-[#151A26] text-[17px] font-semibold">Войти</button>
                <button className="bg-[#1E2538] rounded-[10px] py-[14px] text-[#FFFFFF] text-[17px] font-medium" onClick={() => onShowRegister()}>Зарегестрироваться</button>
            </div>
            <p><a className="text-[#3657CB] text-[17px] font-medium underline cursor-pointer">Восстановить пароль</a></p>
            <div className="flex gap-2">
                <button className="w-[41px] h-[41px] bg-[#1E2538] rounded-[10px] flex items-center justify-center hover:bg-[#3657CB] transition-all duration-200 "><FaVk className="text-[#FFFFFF] text-xl"/></button>
                <button className="w-[41px] h-[41px] bg-[#1E2538] rounded-[10px] flex items-center justify-center hover:bg-[#3657CB] transition-all duration-200"><FaGoogle className="text-[#FFFFFF] text-xl"/></button>
                <button className="w-[41px] h-[41px] bg-[#1E2538] rounded-[10px] flex items-center justify-center hover:bg-[#3657CB] transition-all duration-200"><FaFacebookF className="text-[#FFFFFF] text-xl"/></button>
                <button className="w-[41px] h-[41px] bg-[#1E2538] rounded-[10px] flex items-center justify-center hover:bg-[#3657CB] transition-all duration-200"><FaTwitter className="text-[#FFFFFF] text-xl"/></button>
            </div>
        </div>
    )
}