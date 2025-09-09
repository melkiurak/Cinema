import { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { fetchAllFilms } from "../../service/moviesService";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { BiSolidUpArrow,BiSolidDownArrow } from "react-icons/bi";
import { IoIosCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilterAction, setFilms } from "../../Redux/actions/actions";

export function BillboardPage() {
    const [openFilter, setOpenFilter] = useState(false);
    const [openFilterDate, setOpenFilterDate] = useState(false);
    const [dateFilter, setDateFilter] = useState([]);
    const [genresFilter, setGenresFilter] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const films = useSelector(state => state.films.films);
    const createDateRange = (year, startMonth, endMonth) => ({
        start: new Date(year, startMonth, 1),
        end: new Date(year, endMonth + 1, 0)
    });
    const handleFilmInfo = (filmName) => {
        navigate(`/movies/${filmName}`);
        window.scrollTo(0, 0);
    };
    const generateMonthRanges = (years) => {
        const months = [
            { label: 'Декабря-Февраль', startMonth: 11, endMonth: 1 },
            { label: 'Март-Май', startMonth: 2, endMonth: 4 },
            { label: 'Июнь-Август', startMonth: 5, endMonth: 7 },
            { label: 'Сентябрь-Ноябрь', startMonth: 8, endMonth: 10 }
        ];

        return years.flatMap(year =>
            months.map(month => ({
                label: `${year} ${month.label}`,
                ...createDateRange(year, month.startMonth, month.endMonth)
            }))
        );
    };
    const monthRanges = generateMonthRanges([2024, 2023, 2022, 2021, 2020]);
    const filterFilmsByDateRange = (films, selectedRanges) => {
        return films.filter(film => {
            const filmDate = new Date(film.date);
            return selectedRanges.some(range => 
                filmDate >= range.start && filmDate <= range.end
            );
        });
    };
    const handleFilterChange = (value, type) => {
        if (type === 'genre') {
            setGenresFilter(prev => 
                prev.includes(value) ? prev.filter(d => d !== value) : [...prev, value]
            );
        } else if (type === 'date') {
            setDateFilter(prev => 
                prev.includes(value) ? prev.filter(d => d !== value) : [...prev, value]
            );
        }
    };    

    const filterFilms = (films) => {
        if (genresFilter.length === 0 && dateFilter.length === 0) {
            return films;
        }
    
        const filteredByGenre = genresFilter.length === 0 ? films : films.filter(film => {
            const genresArr = film.genres.map(genre => genre.trim());
            return genresFilter.some(filter => genresArr.includes(filter));
        });
    
        const selectedRanges = monthRanges.filter(range => dateFilter.includes(range.label));
        return dateFilter.length === 0 ? filteredByGenre : filterFilmsByDateRange(filteredByGenre, selectedRanges);
    };
    

    const groupedFilms = (films) => {
        return films.reduce((acc, film) => {
            const dateKey = format(new Date(film.date), 'd MMMM yyyy', { locale: ru });
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(film);
            return acc;
        }, {});
    };

    function getGenres(film) {
        if (Array.isArray(film.genres)) {
            return film.genres.join(', ');
        } else if (typeof film.genres === 'string') {
            return film.genres;
        } else {
            return 'Unknown';
        }
    }

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAllFilms();
            const sortData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            dispatch(setFilms(sortData));
        }
        fetchData();
    }, [dispatch]);

    const filteredFilms = filterFilms(films);
    const groupedFilteredFilms = groupedFilms(filteredFilms);

    return (
        <div className="container flex flex-col gap-[45px] max-lg:gap-[22px]">
            <div className="flex max-lg:flex-col items-baseline gap-[85px] max-lg:gap-[18px]">
                <div className="flex flex-col max-md:justify-center max-md:items-center gap-2 mb-6">
                    <h2 className="max-md:text-center">График премьер фильмов</h2>
                    <Breadcrumb />
                    <p className="text-[15px] max-md:text-[12px] max-md:text-center font-medium text-white leading-[25.31px] max-md:leading-[21.93px]">
                        Также как дальнейшее развитие различных форм деятельности, в своём классическом представлении, допускает внедрение первоочередных требований. Современные технологии достигли такого уровня, что внедрение современных методик предполагает независимые способы реализации стандартных подходов. Сторонники тоталитаризма в науке могут быть объявлены нарушающими общечеловеческие нормы этики и морали.
                    </p>
                </div>
                <div className="flex max-LaptopL:flex-col max-lg:flex-row gap-4 max-md:gap-[11px] mb-6">
                    <div className="w-[187px] max-md:w-[138.28px] h-full">
                        <button className={`bg-[#1B2133] w-full h-[52px] flex items-center justify-between gap-2 pl-5 pr-[21px] ${openFilter ? 'rounded-t-[10px]' : 'rounded-[10px]'}`} onClick={() => setOpenFilter(!openFilter)}>
                            <span className="text-white text-[15px] max-md:text-[12px] leading-[22px] max-md:leading-[14.68px] font-normal overflow-hidden text-ellipsis whitespace-nowrap">
                                {genresFilter.length > 0 ? genresFilter.join(', ') : 'Выберите жанры'}
                            </span>
                            {openFilter ? (
                                <BiSolidUpArrow className="text-white text-xl min-w-[12px] min-h-[12px]" />
                            ) : (
                                <BiSolidDownArrow className="text-white text-xl min-w-[12px] min-h-[12px]"/>
                            )}
                        </button>
                        {openFilter && (
                            <div className="bg-[#1B2133] rounded-b-[10px] w-full flex justify-center">
                                <div className="w-[132px] h-[240px] flex flex-col gap-y-3 pr-[10px] overflow-x:hidden overflow-y-auto custom-scrollbar-Fillter">
                                    {['Боевик', 'Приключения', 'Комедия', 'Фантастика', 'Триллеры', 'Драма', 'Чёрная комедия', 'Ужасы', 'Научная фантастика', 'Фэнтези', 'Экшен', 'Мультфильм', 'Семейный', 'Супергерой', 'Комикс', 'Роботы', 'Мелодрама', 'Полнометражный', 'Сюрреализм', 'Музыка', 'Криминал'].map((filter) => (
                                        <label key={filter} className="flex items-center gap-x-2">
                                            <input 
                                                type='checkbox' 
                                                checked={genresFilter.includes(filter)} 
                                                onChange={() => handleFilterChange(filter, 'genre')} 
                                                className="hidden"
                                            />
                                            <div className={`h-5 w-5 rounded-sm flex items-center justify-center ${genresFilter.includes(filter) ? 'bg-[#F2F60F] border-none' : 'bg-transparent border border-[#A6A6A6]'}`}>
                                                {genresFilter.includes(filter) && <IoIosCheckmark className="text-[#151A26] text-lg" />} 
                                            </div>
                                            <span className={`text-[15px] max-md:text-[12px] leading-[22px] max-md:leading-[14.68px] font-normal text-ellipsis whitespace-nowrap overflow-hidden ${genresFilter.includes(filter) ? 'text-white' : 'text-[#949597]'}`}>{filter}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-[187px] max-md:w-[138.28px] h-full">
                        <button className={`bg-[#1B2133] w-full h-[52px] flex items-center justify-between pl-5 pr-[10px] ${openFilterDate ? 'rounded-t-[10px]' : 'rounded-[10px]'}`} onClick={() => setOpenFilterDate(!openFilterDate)}>
                            <span className="text-white text-[14px] max-md:text-[12px] leading-[17.12px] max-md:leading-[14.68px] font-normal overflow-hidden text-ellipsis whitespace-nowrap">
                                {dateFilter.length > 0 ? dateFilter.join(', ') : 'Выберите Дату'}
                            </span>
                            {openFilterDate ? (
                                <BiSolidUpArrow className="text-white text-xl min-w-[12px] min-h-[12px]" />
                            ) : (
                                <BiSolidDownArrow className="text-white text-xl min-w-[12px] min-h-[12px]"/>
                            )}
                        </button>
                        {openFilterDate && (
                            <div className="bg-[#1B2133] rounded-b-[10px] w-full flex justify-center">
                                <div className="w-[132px] h-[240px] flex flex-col gap-y-3 overflow-x:hidden overflow-y-auto custom-scrollbar-Fillter">
                                    {monthRanges.map((range) => (
                                        <label key={range.label} className="flex items-center gap-x-2">
                                            <input 
                                                type='checkbox' 
                                                checked={dateFilter.includes(range.label)} 
                                                onChange={() => handleFilterChange(range.label, 'date')}
                                                className="hidden" 
                                            />
                                            <div className={`h-5 w-5 rounded-sm flex items-center justify-center ${dateFilter.includes(range.label) ? 'bg-[#F2F60F] border-none' : 'bg-transparent border border-[#A6A6A6]'}`}>
                                                {dateFilter.includes(range.label) && <IoIosCheckmark className="text-[#151A26] text-lg" />} 
                                            </div>
                                            <span className={`text-[14px] max-md:text-[12px] leading-[17.12px] max-md:leading-[14.68px] font-normal text-ellipsis whitespace-nowrap overflow-hidden ${dateFilter.includes(range.label) ? 'text-white' : 'text-[#949597]'}`}>{range.label}</span>                                    
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[35px]">
            {Object.entries(groupedFilteredFilms).map(([date, films]) => (
                <div key={date} className="flex flex-col gap-5">
                    <h4 className="text-[25px] font-semibold leading-[30.58px] text-white">{date}</h4>
                    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-x-[20px] max-LaptopL:gap-x-[17px] max-md:gap-x-[12px] max-lg:gap-x-[13px] gap-y-[59px] max-LaptopL:gap-y-[47px] max-lg:gap-y-[61px] max-md:gap-y-[20px]">
                        {films.map(film => (
                            <div key={film.id} className="flex flex-col gap-[5px] w-full h-full">
                                <div className="w-[339.39px] max-LaptopL:w-[202.29px] max-lg:w-[210.84px] max-md:w-[177.11px] h-[462.91px] max-LaptopL:h-[275.91px] max-lg:h-[287.57px] max-md:h-[241.57px] relative">
                                    <img src={film.poster} alt={film.name} className="w-full h-full rounded-[10px]" />
                                    <div className="w-full h-full absolute inset-0 bg-[#3657CBA6] rounded-[10px] opacity-0 hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                                        <button className="w-[224px] max-LaptopL:w-[160px] max-lg:w-[166.4px] max-md:w-[129.85px] h-[71px] max-LaptopL:h-[49px] max-lg:h-[50.96px] max-md:h-[43.13px] text-[#3657CB] font-bold text-[14px] leading-[21.31px] bg-white rounded-[10px]" onClick={() => handleFilmInfo(film.name)}>
                                            Карточка фильма
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <h3 className="nameFilm">{film.name}</h3>
                                    <p className="genres">{getGenres(film)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}