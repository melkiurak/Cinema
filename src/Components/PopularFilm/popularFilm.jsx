import { useEffect, useState } from "react";
import { fetchPopularFilm } from "../../service/moviesService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import 'swiper/swiper-bundle.css'; 
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  setPopularFilms } from "../../Redux/actions/actions";

export function PopularFilm() {
    const [selecterFilter, setSelecterFilter] = useState('Всё время');
    const [menuFilter, setMenuFilter] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { films } = useSelector(state => state.popularFilms)
    const handleOpenMenuFilter = () => {
        setMenuFilter(!menuFilter);
    };
    const handleFilter = (filter) => {
        setSelecterFilter(filter);
        setMenuFilter(false);
    };
    const handleFilmInfo = (filmName) => {
        navigate(`/movies/${filmName}`);
        window.scrollTo(0, 0);
    };
    const filterFilms = films.filter((film) => {
        if (selecterFilter === 'Всё время') {
            return true;
        }
        return film.year === parseInt(selecterFilter);
    });
    useEffect(() => {
        async function fetchData() {
            const data = await fetchPopularFilm();
            dispatch(setPopularFilms(data));
        }
        fetchData();
    }, [dispatch]);

    return (
        <div className="mt-[75px] max-LaptopL:mt-[34px] max-lg:mt-[21px] max-md:mt-[28.51px]">
            <div className="container h-full flex flex-col gap-[54px] max-LaptopL:gap-[30px] max-md:gap-[23px]">
                <div className="w-full flex max-md:flex-col items-center max-LaptopL:items-start max-md:items-center justify-between max-md:justify-center max-md:gap-[9px] max-LaptopL:flex-col max-LaptopL:gap-[8px]">
                    <div className="text-center max-md:h-[41px] max-md:flex  items-center gap-[12px]">
                        <h2 className="max-md:text-[23px] max-md:leading-[35.71px]">Популярные фильмы</h2>
                        <button className="hidden w-[14px] h-[11px] flex-col justify-between items-center max-md:flex" onClick={handleOpenMenuFilter}>
                            <span className="bg-white h-[1px] w-full"></span>
                            <span className="bg-white h-[1px] w-full"></span>
                            <span className="bg-white h-[1px] w-full"></span>
                        </button>
                    </div>
                    <span className="block border-t-2 border-solid border-white w-[51.5px] rounded-sm max-LaptopL:hidden"></span>
                    <div className={`${menuFilter ? 'block' : 'max-md:hidden'}`}>
                        <ul className="flex flex-wrap items-center justify-center gap-x-[30px] max-md:gap-x-[15px] w-full">
                            {['Всё время', '2024', '2023', '2022', '2021', '2020'].map((filter) => (
                                <li key={filter} className={`filter ${selecterFilter === filter ? 'text-white' : 'text-[#6D707A]'}`}>
                                    <button onClick={() => handleFilter(filter)}>
                                        {filter}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full h-full relative">
                    <Swiper 
                        spaceBetween={23}
                        slidesPerView={4}
                        modules={[Pagination, Navigation]}
                        pagination={{
                            el: ".swiper-pagination",
                            clickable: true, 
                            type: "fraction"
                        }}
                        navigation={{nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev",}}
                        breakpoints={{
                            320: {slidesPerView: 2, spaceBetween: 12.23},
                            768: {slidesPerView: 3, spaceBetween: 14.25},
                            1024: {slidesPerView: 4, spaceBetween: 14},
                        }}
                    >
                        {filterFilms.map((popular) => (
                            <SwiperSlide key={popular.id}>
                                <div className="flex flex-col gap-3 relative">
                                    <div className="w-full max-md:w-auto">
                                        <img className="w-full h-[462.91px] max-LaptopL:h-[275px] max-lg:h-[286px] max-md:h-[240.99px] rounded-[10px]" src={popular.poster} alt={popular.name} />
                                        <div className="w-full h-[462.91px] max-LaptopL:h-[275px] max-lg:h-[286px] max-md:h-[240.99px] absolute inset-0 bg-[#3657CBA6] rounded-[10px] opacity-0 hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                                            <button className="w-[224px] max-LaptopL:w-[160px] max-lg:w-[166.4px] max-md:w-[129.85px] h-[71px] max-LaptopL:h-[49px] max-lg:h-[50.96px] max-md:h-[43.13px] text-[#3657CB] font-bold text-[14px] leading-[21.31px] bg-white rounded-[10px]" onClick={() => handleFilmInfo(popular.name)}>
                                                Карточка фильма
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <h3 className="nameFilm">{popular.name}</h3>
                                        <p className="genres">{Array.isArray(popular.genres) ? popular.genres.join(', ') : 'Unknown'}</p>
                                    </div>
                                    <div className={`absolute max-w-[62.28px] max-lg:max-w-[44px] max-md:max-w-[38px] w-full rounded-[5px] h-[33.21px] max-lg:h-[24px] max-md:h-[21px] flex justify-center items-center right-2 max-md:right-1 top-2 max-md:top-1 ${popular.rating > 5 ? 'bg-[#4BCB36]' : 'bg-[#CB3F36]'}`}>
                                        <p className="RatingFilm">{popular.rating}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="flex justify-center w-full h-[50px] mt-4">
                        <div className="w-[130px] h-full flex items-center flex-row">
                            <div className="swiper-button-prev"><GrLinkPrevious /></div>
                            <div className="swiper-pagination mx-auto"></div>
                            <div className="swiper-button-next"><GrLinkNext /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
