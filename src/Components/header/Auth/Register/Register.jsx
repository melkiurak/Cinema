import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";


export function Register() {
    const [checked, setChecked] = useState(false);
    const handleCheckbox = () => {
        setChecked((prev) => !prev);
      };
    return (
        <div className="max-w-[422px] w-full flex flex-col gap-5 items-center mb-[96px] mt-[47px] px-8 ">
            <h5 className="text-[40px] max-md:text-[26px] font-extrabold text-white">Зарегистрироваться</h5>
            <form action="" className="flex flex-col gap-[14px] text-[17px] text-[#FFFFFF99] w-full">
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="text" placeholder="Имя" />
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="text" placeholder="Фамилия" />
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="text" placeholder="Придумайте логин" />
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="password" placeholder="Придумайте пароль" />
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="password" placeholder="Повторите пароль" />
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="text" placeholder="Номер телефона или e-mail" />
                <div className="flex flex-col gap-[9px]">
                    <label htmlFor=""  className="flex gap-[9px]" onClick={() => handleCheckbox()}  onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); handleCheckbox();}}}>
                        <input type="checkbox" className="hidden" onChange={handleCheckbox} checked={checked}/>
                        <div className={`h-5 w-5 rounded-sm flex items-center justify-center ${checked ? 'bg-[#F2F60F] border-none' : 'bg-transparent border border-[#A6A6A6]'}`}>
                            {checked && <IoIosCheckmark className="text-[#151A26] text-lg" />}
                        </div>
                        <span className="text-[15px] text-white ">Соглашаюсь на условия <a className="underline text-[#F2F60F]">политики конфиденциальности</a></span>
                    </label>
                    <label htmlFor="" className="flex gap-[9px]">
                        <input type="checkbox" className=""  />
                        <span className="text-[15px] text-white ">Соглашаюсь на обработку персональных данных</span>
                    </label>
                </div>
            </form>
            <button className="w-full bg-[#F2F60F] rounded-[10px] py-[15px] text-[#151A26] text-[17px] font-semibold">Зарегестрироваться</button>
        </div>
    )
}