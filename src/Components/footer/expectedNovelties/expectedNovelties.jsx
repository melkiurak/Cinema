import { useEffect , useState } from "react";

import { fetchExpectedNoveltieS } from "../../../service/moviesService";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export function ExpectedNovelties() {
    const  [expectedNovelties, setExpectedNovelties] = useState([]);
    const navigate = useNavigate();

    const handleFilmInfo = (filmName) => {
        navigate(`/movies/${filmName}`);
        window.scrollTo(0, 0);
    };
    useEffect(() =>{
        async function fetchData() {
            const data = await fetchExpectedNoveltieS();
            setExpectedNovelties(data);
        }
        fetchData();
    },[])
    return <div className="flex flex-col gap-[70px] max-LaptopL:gap-[12px] max-lg:gap-[20px] relative">
        <div className="w-full flex justify-between items-center h-full">
            <h2 className="max-md:text-[26px]">Ожидаемые новинки</h2>
            <div className=" max-md:absolute flex justify-center h-[24px] mt-4 max-md:mt- bottom-0 left-1/2  transform -translate-x-1/2">
                <div className="w-[130px]  h-full flex items-center flex-row">
                    <div className="swiper-button-prev"><GrLinkPrevious /></div>
                    <div className="swiper-pagination-expectedNovelties  mx-auto"></div>
                    <div className="swiper-button-next"><GrLinkNext /></div>
                </div>
            </div>
        </div>
        <div className="w-full h-full relative max-md:mb-4">
            <Swiper 
            spaceBetween={22.51}
            slidesPerView={4}
            modules={[Pagination, Navigation]}
            pagination={{
                el: ".swiper-pagination-expectedNovelties",
                clickable: true, 
                type: "fraction", 
            }}
            navigation={{nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev",}}
            breakpoints={
                {
                    320:{slidesPerView:2, spaceBetween:12.06},
                    768:{slidesPerView:3, spaceBetween:14.23},
                    1024:{slidesPerView:4, spaceBetween:22.51},
                }
            }
            >
                {expectedNovelties.map((expectedNovelties =>
                    <SwiperSlide key={expectedNovelties}>
                        <div className="flex flex-col gap-[14px]">
                            <img className="h-[464.41px] max-LaptopL:h-[275.91px] max-lg:h-[286.4px] max-md:h-[242.57px]" src={expectedNovelties.poster} alt="" />
                            <div className="flex flex-col gap-1">
                                <h5 className="text-[18px] max-LaptopL:text-[15px] font-bold leading-[22.3px] max-LaptopL:leading-[18.58px] text-white">{expectedNovelties.name}</h5>
                                <p className="text-[#F2F60F] text-[15px] max-LaptopL:text-[12px] font-medium max-LaptopL:font-normal leading-[28.68px] max-LaptopL:leading-[14.28px]">{expectedNovelties.date} в Украине</p>
                            </div>
                            <div className="w-full h-[462.91px] max-LaptopL:h-[275px] max-lg:h-[286px] max-md:h-[240.99px] absolute inset-0 bg-[#3657CBA6] rounded-[10px] opacity-0 hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                                <button className="w-[224px] max-LaptopL:w-[160px] max-lg:w-[166.4px] max-md:w-[129.85px] h-[71px] max-LaptopL:h-[49px] max-lg:h-[50.96px] max-md:h-[43.13px] text-[#3657CB] font-bold text-[14px] leading-[21.31px] bg-white rounded-[10px]" onClick={() => handleFilmInfo(expectedNovelties.name)} >
                                    Карточка фильма
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
}

