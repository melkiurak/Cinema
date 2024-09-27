import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";


export function Register() {
    const [checked, setChecked] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        surname: '',
        login: '',
        password: '',
        confirnPassword: '',
        email: '',
        phone: '',
    })
    const [formError, setFormError] = useState({});

    const validate = () => {

        const error = {}
        const validateName = (name, surname) => {
            if(!formValues.name.trim()){
                error.name = 'Имя обязательно';
            }
            if(!formValues.surname.trim()){
                error.surname = 'Фамилия обязательно';
            }
        }
        const validateLogin = (login) => {
            if (login.length < 6) {
                error.login = 'Логин должен быть больше 6 символов';
            } else if (/[^a-zA-Z0-9]/.test(login) || /\s/.test(login)) {
                error.login = 'Логин может содержать только буквы и цифры без пробелов';
            } else if (!/[A-Z]/.test(login)) {
                error.login = 'Логин должен содержать хотя бы одну заглавную букву';
            }
        };  
        const validatePassword = (password) => {
            if (password.length < 8) {
                error.password = 'Пароль должен содержать не менее 8 символов';
            } else if (!/[A-Z]/.test(password)) {
                error.password = 'Пароль должен содержать хотя бы одну заглавную букву';
            } else if (!/\d/.test(password)) {
                error.password = 'Пароль должен содержать хотя бы одну цифру';
            }
        };
        if (formValues.password !== formValues.confirnPassword) { 
            error.confirnPassword = 'Пароли не совпадают';
        }
        const validateEmailAndPhone = (email, phone) => {
            if (!email.trim() && !phone.trim()) {
                error.email = 'Введите телефон или почту';
            } else {
                if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                    error.email = 'Некорректный формат электронной почты';
                }
                if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
                    error.phone = 'Некорректный формат телефона';
                }
            }
        };
        validateName(formValues.name, formValues.surname);
        validateLogin(formValues.login);
        validatePassword(formValues.password);
        validateEmailAndPhone(formValues.email, formValues.phone);
        return error;
    }

    const submit = (e) => {
        e.preventDefault();
        const validationErrors = validate(); 
        if(Object.keys(validationErrors).length > 0) {
            setFormError(validationErrors);
        } else {
            setFormError({});
            console.log(formValues);
        }
    }
    const handleCheckbox = () => {
        setChecked((prev) => !prev);
      };
    return (
        <div className="max-w-[422px] w-full flex flex-col gap-5 items-center mb-[96px] mt-[47px] px-8 ">
            <h5 className="text-[40px] max-md:text-[26px] font-extrabold text-white">Зарегистрироваться</h5>
            <form action="" className="flex flex-col gap-[14px] text-[17px] text-[#FFFFFF99] w-full" onSubmit={submit}>
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="text" placeholder="Имя" value={formValues.name} onChange={(e) => setFormValues({...formValues, name: e.target.value})} />
                {formError.name && <span className="text-red-500">{formError.name}</span>}
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="text" placeholder="Фамилия" value={formValues.surname} onChange={(e) => setFormValues({...formValues, surname: e.target.value})}  />
                {formError.surname && <span className="text-red-500">{formError.surname}</span>}
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="text" placeholder="Придумайте логин" value={formValues.login} onChange={(e) => setFormValues({...formValues, login: e.target.value})} />
                {formError.login && <span className="text-red-500">{formError.login}</span>}
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="password" placeholder="Придумайте пароль" value={formValues.password} onChange={(e) => setFormValues({...formValues, password: e.target.value})} />
                {formError.password && <span className="text-red-500">{formError.password}</span>}
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none" type="password" placeholder="Повторите пароль" value={formValues.confirnPassword} onChange={(e) => setFormValues({...formValues, confirnPassword: e.target.value})} />
                {formError.confirnPassword && <span className="text-red-500">{formError.confirnPassword}</span>}
                <input className="bg-[#1E2538] rounded-[15px] py-[20px] pl-[28px] outline-none"
                    type="text"
                    placeholder="Номер телефона или e-mail"
                    value={formValues.email || formValues.phone} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\+?[1-9]\d{0,14}$/.test(value)) {
                            setFormValues({ ...formValues, phone: value, email: '' });
                        } else {
                            setFormValues({ ...formValues, email: value, phone: '' });
                }}}/>
                {(formError.email || formError.phone) && (<span className="text-red-500">{formError.email || formError.phone}</span>)}
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
                <button className="w-full bg-[#F2F60F] rounded-[10px] py-[15px] text-[#151A26] text-[17px] font-semibold" type="submit">Зарегестрироваться</button>
            </form>
        </div>
    )
}