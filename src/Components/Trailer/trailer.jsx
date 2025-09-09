import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchTrailer } from "../../service/moviesService";
import { GoArrowRight } from "react-icons/go";
import 'swiper/swiper-bundle.css'
import { Navigation, Scrollbar } from 'swiper/modules'; 
import { db } from "../../firebaseConfig";
import { doc, updateDoc, increment } from 'firebase/firestore';

import { SlSocialVkontakte } from "react-icons/sl";
import { FaInstagram, FaTwitter  , FaPlay } from "react-icons/fa";
import { ImFacebook } from "react-icons/im";

import { AiFillLike, AiFillDislike } from "react-icons/ai";

export function Trailer() {
    const [trailers, setTrailers] = useState([]);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [likes,setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeVideo, setActiveVideo] = useState(false);
    const handleLike = async () => {
        if (!isAuthenticated) {
            return;
        }
        if (selectedTrailer) {
            const docRef = doc(db, 'NewTrailer', selectedTrailer.id);
            await updateDoc(docRef, {
                likes: increment(1),
                liked: true
            });
            setLikes(likes + 1);
            setLiked(true);
        }
    };
    const handleActiveVideo = () => {
        setActiveVideo(true); 
    }
    useEffect(() => {
        async function fetchData() {
            const data = await fetchTrailer();
            setTrailers(data);
        }
        fetchData();
    }, []);
    useEffect(() => {
        if(trailers.length > 0){
            setSelectedTrailer(trailers[0]);
        };
    }, [trailers])
    return (
        <div className="mt-[51px]">
            <div className="container h-full flex flex-col justify-between gap-9 max-LaptopL:gap-4 max-lg:gap-7 max-md:gap-5">
                <div className="w-full flex justify-between items-center max-md:flex-col">
                    <h2 className="font-black text-[65px] max-LaptopL:text-[40px] max-md:text-[32px] leading-[82.81px] max-LaptopL:leading-[50.96px] max-md:leading-[40.77px] text-white">Новые трейлеры</h2>
                    <button className="text-white flex items-center max-w-[201px] max-md:max-w-[152px] w-full justify-between h-[27px]">
                        <span className="font-bold text-[22px] max-LaptopL:text-[18px] leading-[27.26px] max-LaptopL:leading-[22.3px]">Все трейлеры</span>
                        <GoArrowRight className="text-xl" />
                    </button>
                </div>
                {selectedTrailer && (
                    <div className={`w-100% relative  flex flex-col justify-between gap-[26px] max-LaptopL:gap-[8.81px] max-lg:gap-[7.34px] max-md:gap-[5.13px]`}>
                        <div className="w-full">
                            {
                                activeVideo ? (
                                    <iframe title={selectedTrailer.name}  className="w-full  h-[765px] max-LaptopL:h-[454.19px] max-lg:h-[352.66px] max-md:h-[196.87px] rounded-[10px]" src={`https://www.youtube.com/embed/${selectedTrailer.trailer}?autoplay=1`} allowfullscreen  allow="autoplay; encrypted-media"></iframe>                                        
                                ) : (
                                    <button className="w-full" onClick={() => handleActiveVideo()}>
                                        <img className="w-full rounded-[10px]" src={selectedTrailer.img} alt={selectedTrailer.img} />
                                        <button className=" w-[35px] max-md:w-[22px] h-[31px] max-md:h-[19px] text-white absolute top-[44%] max-md:top-[30%] left-[46%] max-md:left-[48%]"><FaPlay className="w-full h-full"/></button>
                                    </button>
                                )
                            }
                        </div>
                        <div className=" w-full flex justify-between items-center max-LaptopL:gap-4">
                            <div className=" flex flex-grow gap-9 max-md:gap-[5px] items-center max-md:items-start  max-md:flex-col" >
                                <h3>{selectedTrailer.name}</h3>
                                <div className="max-w-[179px] max-md:max-w-[116px] w-full flex items-center justify-between text-[#6D7792]">
                                    <SlSocialVkontakte className="hover:text-white cursor-pointer"/>
                                    <FaInstagram className="hover:text-white cursor-pointer"/>
                                    <FaTwitter className="hover:text-white cursor-pointer"/>
                                    <ImFacebook className="hover:text-white cursor-pointer"/>
                                </div>
                            </div>
                            <div className="max-w-[125px] w-full flex justify-between items-center ">
                                <div className="flex flex-col items-center justify-between h-full gap-2 ">
                                    <button onClick={handleLike} className="assessment"><AiFillLike className="text-xl"/></button>
                                    <span className="text-[15px] max-LaptopL:text-[11px] max-lg:text-[9px] leading-[17.85px] max-LaptopL:leading-[13.09px] max-lg:leading-[10.71px] text-white">{selectedTrailer.likes}</span>
                                </div>
                                <div className="flex flex-col items-center justify-between h-full gap-2 ">
                                    <button className="assessment"><AiFillDislike className="text-xl"/></button>
                                    <span className="text-[15px] max-LaptopL:text-[11px] max-lg:text-[9px] leading-[17.85px] max-LaptopL:leading-[13.09px] max-lg:leading-[10.71px] text-white">{selectedTrailer.dislikes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-full">
                    <div className="swiper-scrollbar mb-[22px] max-md:hidden"></div>
                    <Swiper spaceBetween={20} slidesPerView={4} modules={[Navigation, Scrollbar]} scrollbar={{el: '.swiper-scrollbar', draggable:true}} breakpoints={{320:{slidesPerView:2}, 768:{slidesPerView:4},}}>
                            {trailers.map((trailer) =>
                            <SwiperSlide key={trailer.id} onClick={() => setSelectedTrailer(trailer)}>
                                <div className="max-w-[342.35px] w-full flex flex-col gap-[11px] max-LaptopL:gap-[6.54px] max-lg:gap-[4.92px] max-md:gap-[5.57px] relative">
                                    <div className="w-full relative ">
                                        <img className="w-full rounded-[10px]" src={trailer.img} alt={trailer.img} />
                                        {selectedTrailer === trailer && (
                                            <div className="absolute inset-0 bg-[#3657CB] opacity-[0.65] z-20 rounded-[10px]" />
                                        )}
                                        <button className=" w-[35px] max-lg:w-[16.15px] max-md:w-[18.27px] h-[31px] max-lg:h-[14.31px] max-md:h-[16px] text-white absolute top-[44%] left-[46%] z-50"><FaPlay className="w-full h-full"/></button>
                                    </div>
                                    <h3 className="font-black text-sm max-LaptopL:text-[15px] max-lg:text-[13px] leading-[25.48px] max-LaptopL:leading-[19.11px] max-lg:leading-[16.56px] text-white">{trailer.name}</h3> 
                                </div>
                            </SwiperSlide>
                            )}            
                    </Swiper>
                </div>
            </div>
        </div>
    );
}