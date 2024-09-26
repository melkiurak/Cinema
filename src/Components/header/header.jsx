import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "./Search/search";
import { Auth } from './Auth/Auth'
import logo from '../../assets/img/logo.png'; 

import { SlSocialVkontakte } from "react-icons/sl";
import { FaInstagram, FaTwitter  } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export function Header() {
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const [auth, setAuth] = useState(false);
    const handelSearch = () => {
        setSearch(true);
    } 
    const handelClose = () => {
        setSearch(false);
        setAuth(false);
    }
    const handelAuth = () => {
        setAuth(true)
    }
    const handelOpenBurger = () => {
        setBurgerOpen(!burgerOpen);
    };
    const handelCloseBurger = () => {
        setBurgerOpen(false);
    };
    useEffect(() =>{
        if(burgerOpen) {
            document.body.classList.add('fixed-position');
        } else {
            document.body.classList.remove('fixed-position');
        }
        return () => {
            document.body.classList.remove('fixef-position');
        };
    }, [burgerOpen]);
    return (
        <header className=" w-full pt-[27px]">
            <div className="container flex items-center justify-between gap-5 relative max-LaptopL:flex-col h-full">
                <button onClick={handelOpenBurger} className="menu__burger max-md:flex max-md:absolute left-2 top-0">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="max-w-[129px] w-full flex flex-col gap-[10px]">
                    <div className="w-full">
                        <img src={logo}  alt="" />
                    </div>
                    <div className="flex items-center justify-between w-full text-lg leading-[14.95px] font-normal text-[#686868]">
                        <SlSocialVkontakte className="hover:text-white cursor-pointer"/>
                        <FaInstagram className="hover:text-white cursor-pointer"/>
                        <FaTwitter className="hover:text-white cursor-pointer"/>
                        <ImFacebook className="hover:text-white cursor-pointer"/>
                    </div>
                </div>
                <nav className={`max-w-[760px] w-full h-[21px] ${burgerOpen ? 'fixed top-0 left-0 z-50 w-full h-full bg-[#1E2538EB] max-md:flex flex-col  items-center gap-[14px] pt-14' : 'max-md:hidden'}`}>
                    <img src={logo}  alt="" className={` ${burgerOpen ? 'block' : 'hidden'}`} />
                    <ul className={`w-full flex items-center justify-between ${burgerOpen ? 'flex-col h-[275px] justify-center' : ''}`}>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[41.5px] text-white"><Link to="/Billboard" onClick={() => handelCloseBurger()}>Афиша</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[41.5px] text-white"><Link to="/мудаи" onClick={() => handelCloseBurger()} >Медиа</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[41.5px] text-white"><Link to="/services" onClick={() => handelCloseBurger()}>Фильмы</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[41.5px] text-white"><Link to="/contact" onClick={() => handelCloseBurger()}>Актёры</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[41.5px] text-white"><Link to="/portfolio" onClick={() => handelCloseBurger()}>Новости</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[41.5px] text-white"><Link to="/blog" onClick={() => handelCloseBurger()}>Подборки</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[41.5px] text-white"><Link to="/faq" onClick={() => handelCloseBurger()}>Категории</Link></li>
                    </ul>
                    <button onClick={handelCloseBurger} className={` absolute top-[3.9rem] right-5 w-[20px] h-[20px] text-white ${burgerOpen ? 'block' : 'hidden '}`}><RxCross2 className="w-full h-full"/></button>
                </nav>
                <div className="max-w-[205px] h-full w-full flex justify-between max-LaptopL:hid">
                    <button className="w-[55px]  max-md:w-[28.56px] h-[52px] max-LaptopL:h-[42px] max-md:h-[27px] bg-white flex items-center justify-center color-[#3657CB] rounded-xl max-md:rounded-[5px] text-[#3657CB] font-bold text-xl max-LaptopL:absolute left-10 max-md:left-11 top-0" onClick={() => handelSearch()}><IoIosSearch/></button>
                    <button className="w-[138px] max-md:w-[66px]  h-[53px]  max-LaptopL:h-[42px] max-md:h-[27px]  bg-[#3657CB] border-none shadow-button-shadow rounded-xl max-md:rounded-[5px] text-white font-bold leading-[26.64px] max-LaptopL:absolute right-2 top-0" onClick={() => handelAuth()}>Войти</button>
                </div>
                {search && (
                    <div className='fixed top-0 left-0 z-[100] w-full h-full bg-[#1E2538]/70 flex justify-center'>
                        <Search onClose={handelClose} />
                    </div>
                )}
                {auth && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#191E2E]/80 z-[100]">
                        <Auth onClose={handelClose}/>
                    </div>
                )}
            </div>
        </header>
    )
}