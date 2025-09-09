import { Link } from "react-router-dom";
import { ExpectedNovelties } from "./expectedNovelties/expectedNovelties"
import { BoxOffice } from "./boxOffice/boxOffice"
import { Subscription } from "./subscription/subscription"

import { SlSocialVkontakte } from "react-icons/sl";
import { FaInstagram, FaTwitter  } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";
export function Footer() {
    return <footer className="w-full bg-[#151A26]">
        <div className="container flex flex-col  gap-[100px] max-LaptopL:gap-[40px] max-md:gap-[30px] !py-[30px]">
            <ExpectedNovelties/>
            <BoxOffice/>
            <Subscription/>
            <div className="flex flex-col gap-[30px] items-center h-full">
                <div className="flex items-center w-[249px] justify-around text-lg leading-[14.95px] font-normal text-[#3C4767]">
                    <SlSocialVkontakte className="hover:text-white cursor-pointer"/>
                    <FaInstagram className="hover:text-white cursor-pointer"/>
                    <FaTwitter className="hover:text-white cursor-pointer"/>
                    <ImFacebook className="hover:text-white cursor-pointer"/>
                </div>
                <nav className="max-w-[724px] w-full">
                    <ul className="w-full flex items-center justify-between max-md:flex-col gap-2">
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[33px] text-white"><Link to="/">Афиша</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[33px] text-white"><Link to="/aпид">Медиа</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[33px] text-white"><Link to="/services">Фильмы</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[33px] text-white"><Link to="/contact">Актёры</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[33px] text-white"><Link to="/portfolio">Новости</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[33px] text-white"><Link to="/blog">Подборки</Link></li>
                        <li className="font-bold text-[17px] max-md:text-[13px] leading-[21.06px] max-md:leading-[33px] text-white"><Link to="/faq">Категории</Link></li>
                    </ul>
                </nav>
                <div className="flex flex-col gap-2">
                    <p className="text-[#E3E6F0B8] text-[15px] max-md:text-[13px] leading-[17.85px] max-md:leading-[15.47px] text-center">2020 © Kinoarea.  Все права защищены</p>
                    <p className="text-[#E3E6F0B8] text-[15px] max-md:text-[13px] leading-[17.85px] max-md:leading-[15.47px] text-center underline">Политика конфиденциальности</p>
                </div>
            </div>
        </div>
    </footer>
}