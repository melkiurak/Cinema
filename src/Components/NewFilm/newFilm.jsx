import React, { useEffect, useState } from "react";
import { fetchNewFilms } from "../../service/moviesService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilms, setFilterAction } from "../../Redux/actions/actions";

const getInitialVisibleCount = () => {
    if (window.innerWidth < 768) return 6;
    if (window.innerWidth < 1024) return 9;
    return 8;
};

export function NewFilm() {
    const [visibleCount, setVisibleCount] = useState(getInitialVisibleCount());
    const [menuFilter, setMenuFilter] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filterFromStore = useSelector(state => state.films.filter);
    const films = useSelector(state => state.films.films);
    
    const handleOpenMenuFilter = () => {
        setMenuFilter(!menuFilter);
    };

    const handleFilter = (filter) => {
        dispatch(setFilterAction(filter));
        setMenuFilter(false);
    };

    const handleFilmInfo = (filmName) => {
        navigate(`/movies/${filmName}`);
        window.scrollTo(0, 0);
    };

    const filterFilms = films.filter((film) => {
        if (!filterFromStore || filterFromStore === 'Все') {
            return true;
        }
        const genresArray = film.genres.map(genre => genre.trim());
        return genresArray.includes(filterFromStore);
    });

    const handleAllFilm = () => {
        setVisibleCount(prevCount => prevCount + 8);
    };
    
    useEffect(() => {
        async function fetchData() {
            const data = await fetchNewFilms();
            dispatch(setFilms(data));
        }
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getInitialVisibleCount());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="mt-[30px]">
            <div className="container flex flex-col items-center h-full max-md:gap-[10px]">
                <div className={`flex items-center max-LaptopL:items-start max-md:items-center max-LaptopL:max-w-[625px] w-full justify-between max-md:justify-center h-[83px] max-LaptopL:h-[75px] mb-[61px] max-LaptopL:mb-[28px] max-LaptopL:flex-col max-md:gap-4 self-start max-md:self-center ${menuFilter ? '' : 'flex-row'}`}>
                    <div className="max-md:h-[41px] flex items-center justify-center gap-[12px]">
                        <h2 className="max-md:leading-[31.71px]">Сейчас в кино</h2>
                        <button className="hidden w-[14px] h-[11px] flex-col justify-between items-center max-md:flex" onClick={handleOpenMenuFilter}>
                            <span className="bg-white h-[1px] w-full"></span>
                            <span className="bg-white h-[1px] w-full"></span>
                            <span className="bg-white h-[1px] w-full"></span>
                        </button>
                    </div>
                    <span className="block border-t-2 border-solid border-white w-[51.5px] rounded-sm max-LaptopL:hidden"></span>
                    <div className={`${menuFilter ? 'block' : 'max-md:hidden'}`}>
                        <ul className="flex flex-wrap gap-x-[30px] max-LaptopL:gap-x-[25px] max-lg:gap-x-[20px] max-md:gap-x-[15px] max-md:gap-y-[10px] max-md:justify-center items-center">
                            {['Все', 'Боевик', 'Приключения', 'Комедия', 'Фантастика', 'Триллеры', 'Драма'].map((filter) => (
                                <li key={filter} className={`filter ${filterFromStore === filter ? 'text-white' : 'text-[#6D707A]'}`}>
                                    <button onClick={() => handleFilter(filter)}>{filter}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 items-baseline gap-x-[22.85px] max-LaptopL:gap-x-[13.62px] max-lg:gap-x-[14.16px] max-md:gap-x-[11.99px] gap-y-[33px] max-LaptopL:gap-y-[48px] max-lg:gap-y-[54.56px] max-md:gap-y-[22.66px] mb-[51px] max-LaptopL:mb-[31px] md:self-start w-full max-md:w-auto">
                    {filterFilms.slice(0, visibleCount).map((film) =>
                        <div key={film.id} className="flex max-LaptopL:block max-LaptopL:w-[202.29px] max-md:w-[140px] flex-col gap-2 relative h-full">
                            <div className="relative w-full">
                                <img className="w-full h-[462.91px] max-LaptopL:h-[275.91px] max-md:h-[243.79px] rounded-[10px]" src={film.poster} alt={film.name} />
                                <div className="absolute inset-0 bg-[#3657CBA6] rounded-[10px] opacity-0 hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                                    <button className="w-[224px] max-LaptopL:w-[160px] max-lg:w-[166.4px] max-md:w-[129.85px] h-[71px] max-LaptopL:h-[49px] max-lg:h-[50.96px] max-md:h-[43.13px] text-[#3657CB] font-bold text-[14px] leading-[21.31px] bg-white rounded-[10px]" onClick={() => handleFilmInfo(film.name)}>
                                        Карточка фильма
                                    </button>
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <h3 className="nameFilm">{film.name}</h3>
                                <p className="genres">{Array.isArray(film.genres) ? film.genres.join(', ') : 'Unknown'}</p>
                            </div>
                            <div className={`absolute max-w-[62.28px] max-lg:max-w-[44px] max-md:max-w-[38px] w-full rounded-[5px] h-[33.21px] max-lg:h-[24px] max-md:h-[21px] flex justify-center items-center right-2 max-md:right-1 top-2 max-md:top-1 ${film.rating > 5 ? 'bg-[#4BCB36]' : 'bg-[#CB3F36]'}`}>
                                <p className="RatingFilm">{film.rating}</p>
                            </div>
                        </div>
                    )}
                </div>
                <button className="max-w-[200px] max-md:max-w-[160px] h-[71px] max-md:h-[53px] w-full rounded-xl border-solid border-2 border-white text-[18px] leading-[29.97px] font-bold text-white" onClick={handleAllFilm}>Все новинки</button>
            </div>
        </div>
    );
}
