import React from 'react';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import playIcons from '../../../assets/icons/play.svg'

import { SlSocialVkontakte } from "react-icons/sl";
import { FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";
import { AiFillLike, AiFillDislike } from "react-icons/ai";


export function MovieDetailsInfo({ film }) {
    function colorsRating(rating) {
        if (rating  >= 9) {
            return '#34EA16'; // От 9 до 10
        } else if (rating  >= 8) {
            return '#4BCB36'; // От 8 до 9
        } else if (rating  >= 7) {
            return '#78CB36'; // От 7 до 8
        } else if (rating  >= 6) {
            return '#89CB36'; // От 6 до 7
        } else if (rating  >= 5) {
            return '#CB6C36'; // От 5 до 6 (другой цвет, чтобы не совпадал с 0-2)
        } else if (rating  >= 4) {
            return '#CB3F36'; // От 4 до 5
        } else if (rating  >= 3) {
            return '#DA3434'; // От 3 до 4
        } else if (rating  >= 2) {
            return '#F13030'; // От 2 до 3
        } else { 
            return '#FF0000'; // От 0 до 2
        }
    } 
    function colorsExpectationRating(rating) {
        let backgroundColor, textColor;
        if( rating >= 60) {
            backgroundColor = '#2E6125';
            textColor = '#57D043';
        } else if (rating >= 50) {
            backgroundColor = '#CB6C364D';
            textColor = '#CB6C36';
        } else {
            backgroundColor = '#F130304D';
            textColor = '#F13030';
        }
        return { backgroundColor, textColor };
    }       
    const percentage = (film.expectationRating / 10) * 10;
    const ratingColor = colorsRating(film.ratingKinoarea && film.ratingIMDb);
    const { backgroundColor, textColor } = colorsExpectationRating(film.expectationRating);
    return (
        <div className='max-w-[1187px] mx-auto my-auto'>
            <div className='flex gap-[50px] max-LaptopL:gap-[20px] max-lg:gap-[10px] w-full'>
                <img className='w-[395px] max-LaptopL:w-[291px] max-md:w-[225px] h-[549px] max-LaptopL:h-[387.68px] max-md:h-[299.75px] rounded-[10px] max-md:hidden' src={film.poster} alt="" />
                <div className='flex flex-col'>
                    <Breadcrumb />
                    <h2>{film.name}</h2>
                    <h5 className='text-[25px] max-LaptopL:text-[20px] font-medium leading-[30.18px] max-LaptopL:leading-[24.14px] text-white mb-[14px]'>{film.name_en}</h5>
                    <div className='flex max-md:gap-[9px] max-md:mb-[22px] max-md:mt-[18px] '>
                        <img className='w-[225px] h-[299.75px] rounded-[10px] md:hidden' src={film.poster} alt="" />
                        <div className='flex max-md:flex-col gap-[20px] mb-[10px]'>
                            <div className=" flex flex-col gap-[2px] items-center">
                                    <div className='w-[52px] h-[52px] rounded-full flex items-center justify-center text-white relative' style={{ backgroundColor: `${colorsRating(film.ratingKinoarea)}70` }}>
                                        {film.ratingKinoarea}
                                        <svg className="absolute top-0 left-0 w-full h-full rounded-full" style={{ transformOrigin: 'center' }} viewBox="0 0 52 52">
                                            <circle
                                                cx="26"
                                                cy="26"
                                                r="24"
                                                stroke={ratingColor}
                                                strokeWidth="10"
                                                fill="none"
                                                strokeDasharray="150"
                                                strokeDashoffset={150 - (film.ratingKinoarea / 10) * 150} 
                                                transform="rotate(-90 26 26)" 
                                            />
                                        </svg>                           
                                    </div>
                                    <span className='block mt-2 text-white text-[15px]'>Kinoarea</span>
                            </div>
                            <div className=" flex flex-col gap-[2px] items-center">
                                <div className='w-[52px] h-[52px] rounded-full flex items-center justify-center text-white relative' style={{ backgroundColor: `${colorsRating(film.ratingIMDb)}70` }}>
                                    {film.ratingIMDb}
                                    <svg className="absolute top-0 left-0 w-full h-full rounded-full" style={{ transformOrigin: 'center' }} viewBox="0 0 52 52">
                                        <circle
                                            cx="26"
                                            cy="26"
                                            r="24"
                                            stroke={ratingColor}
                                            strokeWidth="10"
                                            fill="none"
                                            strokeDasharray="150"
                                            strokeDashoffset={150 - (film.ratingIMDb / 10) * 150} 
                                            transform="rotate(-90 26 26)" 
                                        />
                                    </svg>  
                                </div>
                                <span className='block mt-2 text-white text-[15px]'>IMDb</span>
                            </div>
                        </div>
                    </div>
                    <p className=' font-medium text-[20px] max-LaptopL:text-[15px] text-white mb-[30px] max-lg:mb-[10px] max-md:mb-[46px]'>{film.description}</p>
                    <div className='flex max-lg:flex-col  gap-[37px] max-lg:gap-[22px] max-md:gap-[26px] max-md:items-center'>
                        <button className='w-[260px] max-LaptopL:w-[215px] h-[71px] max-LaptopL:h-[60px] border-2 border-solid border-white rounded-[10px] flex items-center justify-center gap-3'>
                            <img src={playIcons} alt="" />
                            <span className='text-[18px] leading-[29.97px] font-bold text-white' >Смотреть трейлер</span>
                        </button>
                        <div className="flex items-center justify-between w-[179px] text-lg leading-[14.95px] font-normal text-[#686868]">
                            <SlSocialVkontakte className="hover:text-white cursor-pointer"/>
                            <FaInstagram className="hover:text-white cursor-pointer"/>
                            <FaTwitter className="hover:text-white cursor-pointer"/>
                            <ImFacebook className="hover:text-white cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex max-lg:flex-col gap-[13px] h-[59px] max-lg:h-[52px] mt-[26px] max-lg:mt-0 mb-[45px]'>
                <div className='h-full flex gap-[8px]'>
                    <button className="assessment h-full"><AiFillLike className="text-xl"/></button>
                    <button className="assessment h-full"><AiFillDislike className="text-xl"/></button>
                    <button className='relative w-[185px] max-lg:w-[141.01px] h-full bg-[#1B2133] rounded-[10px] '>
                        <span className=' text-[14px] max-lg:text-[12px] whitespace-nowrap relative z-10 font-medium' style={{color: textColor}}>Рейтинг ожиданий {film.expectationRating}%</span>
                        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r  rounded-[10px] `}  style={{ width: `${percentage}%`, backgroundColor: backgroundColor}}></div>
                    </button>
                </div>
                <div className='flex items-center gap-3'>
                    <button className="assessment"><FaHeart/></button>
                    <span className='font-medium text-[14px] text-[#E8E9EB]'>В избранном у 200 человек</span>
                </div>
            </div>
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-y-3 max-md:gap-3'>
                <div className='info-item'>
                    <span className='info-label'>Год:</span>
                    <span className='info-value'>{film.year}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Художник:</span>
                    <span className='info-value'>{film.productionDesigner}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Страна:</span>
                    <span className='info-value'>{film.country}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Монтаж:</span>
                    <span className='info-value'>{film.editor}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Слоган:</span>
                    <span className='info-value'>{film.slogan}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Жанр:</span>
                    <span className='info-value'>{Array.isArray(film.genres) ? film.genres.join(', ') : 'Unknown'}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Режиссер:</span>
                    <span className='info-value'>{film.director}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Сборы в мире:</span>
                    <span className='info-value'>{film.worldBoxOffice}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Сценарий:</span>
                    <span className='info-value'>{film.screenwriter}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Премьера (мир):</span>
                    <span className='info-value'>{film.worldPremiere}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Продюсер:</span>
                    <span className='info-value'>{film.producer}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Премьера (Укр):</span>
                    <span className='info-value'>{film.ukrainePremiere}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Оператор:</span>
                    <span className='info-value'>{film.cinematographer}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Возраст:</span>
                    <span className='info-value'>{film.ageRating}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Композитор:</span>
                    <span className='info-value'>{film.composer}</span>
                </div>
                <div className='info-item'>
                    <span className='info-label'>Время:</span>
                    <span className='info-value'>{film.duration} мин</span>
                </div>
            </div>
            <div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
