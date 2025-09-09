import React from "react";
import logo_footer from '../../../assets/img/logo_footer.png';
export function Subscription() {
    return <div className="relative w-full h-[548px] max-LaptopL:h-[396px] max-lg:h-[370px] max-md:h-[460px] bg-footer-bg bg-cover bg-center flex items-center justify-center rounded-[10px]">
        <div className="absolute inset-0 bg-[#1D3AA0E5] z-10 rounded-[10px]"></div>
        <div className="max-w-[798px] max-LaptopL:max-w-[639px] max-lg:max-w-[569px] max-md:max-w-[322px] h-[366px] max-LaptopL:h-[295px] max-md:h-[409px] flex flex-col items-center justify-between relative z-20">
            <img src={logo_footer} alt="" />
            <h5 className="text-[50px] max-LaptopL:text-[35px] max-md:text-[25px] leading-[63.7px] max-LaptopL:leading-[44.59px] max-md:leading-[31.85px] text-center text-white font-black whitespace-nowrap max-md:whitespace-normal">Подпишитесь на E-mail рассылку</h5>
            <p className="text-[22px] text-center max-LaptopL:text-[17px] max-md:text-[15px] leading-[30.83px] max-LaptopL:leading-[23.83px] max-md:leading-[21.03px] font-medium text-white">Если хотиет быть в курсе последних новостей и новинок кино - заполните форму ниже и оформите бесплатную E-mail рассылку! </p>
            <div className="flex justify-between gap-[8px] max-md:gap-0 h-[71px] max-LaptopL:h-[62px] max-md:h-[133px] max-md:flex-col max-md:w-[284px]">
                <input className="w-[425px] max-LaptopL:w-[378px] max-md:w-full h-full max-md:h-[62px] rounded-[10px] text-[17px] font-normal leading-[28.31px] text-[#151A2699] pl-[27px]" type='email' placeholder="Введите свой E-mail адрес" />
                <button className="w-[182px] max-LaptopL:w-[164px] max-md:w-full h-full max-md:h-[62px] rounded-[10px] bg-[#F2F60F] text-[18px] font-bold leading-[29.97px] text-[#151A26] text-center ">Подписаться</button>
            </div>
            <div className="flex gap-[8px] items-center max-md:items-start">
                <label className="text-[17px] max-md:text-[14px] leading-[23.83px] max-md:leading-[19.63px] text-white ">
                <span>Соглашаюсь на условия   <a href="/privacy-policy" className="underline text-[#F2F60F]">политики конфиденциальности</a></span>
                <input type="checkbox"  className="w-[17px] h-[22px]"/>
                </label>
            </div>
        </div>
    </div>
}