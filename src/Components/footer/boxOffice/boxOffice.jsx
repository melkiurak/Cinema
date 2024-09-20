import { useEffect, useState } from "react"
import { fetchBoxOffice } from "../../../service/moviesService";
import { useNavigate } from "react-router-dom";

export function BoxOffice() {
    const [boxOffice, setBoxOffice] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth < 768 ? 4 : 5);
    const [boxOfficeFilter, setBoxOfficeFilter] = useState('Весь мир');
    const navigate = useNavigate();

    const handleFilter = (filter) => {
        setBoxOfficeFilter(filter);
    };
    const handleFilmInfo = (filmName) => {
        navigate(`/movies/${filmName}`);
        window.scrollTo(0, 0);
    };
    const filterFilms = boxOffice.filter((film) => {
        if(boxOffice == 'Весь мир'){
            return true;
        }
        const boxOfficeData = {
            'Укарина': film.boxOfficeUkraine,
            'Сша и Канада': film.boxOfficeUSCanada,
        } [boxOfficeFilter] || film.boxOfficeWorld;
        return boxOfficeData && boxOfficeData.totalBoxOffice > 0;
    });
    function getTotalBoxOffice(film,filter) {
        if(filter === 'Весь мир'){
           return film.boxOfficeWorld?.totalBoxOffice;
        } else if( boxOfficeFilter === 'Сша и Канада'){
            return film.boxOfficeUSCanada?.totalBoxOffice;
        } else {
            return film.boxOfficeUkraine?.totalBoxOffice;
        }
    }
    const sortedFilms = [...filterFilms].sort((a, b) => {
        return getTotalBoxOffice(b, boxOfficeFilter) - getTotalBoxOffice(a, boxOfficeFilter); 
    });
    function formatNumber(value) {
        if (value === undefined || value === null) {
            return 'N/A'; 
        }
        if (value >= 1000000) {
            return (value / 1000000).toFixed(2) + ' млн';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(2) + ' тыс';
        } else {
            return value.toString();
        }
    }
    useEffect(() => {
        async function fetchData() {
            const data = await fetchBoxOffice();
            setBoxOffice(data);
        }
        fetchData();
    }, []);
    useEffect(() => {
        function handleNews() {
            setWindowWidth(window.innerWidth < 768 ? 4 : 5 );
        }
        window.addEventListener("resize", handleNews);
        return () => window.removeEventListener("resize", handleNews);
    }, []);
    const filters = ['Весь мир', 'Украина', 'Сша и Канада'];

    return <div className="flex flex-col gap-[60px]">
        <div className="w-full flex justify-between max-md:justify-center items-center flex-wrap max-LaptopL:gap-x-[23px]  max-LaptopL:gap-y-[9px]">
            <h2>Кассовые сборы</h2>
            <p className="text-[20px] leading-[24.14px] text-white font-medium ">1 мая - 1 октября</p>
            <span className="block border-t-2 border-solid border-white w-[51.5px] rounded-sm max-LaptopL:hidden"></span>
            <div className="w-full max-w-[340px] max-LaptopL: max-md:hidden">
                <ul className="w-full flex justify-between items-center">
                    {filters.map(filter => (
                        <li key={filter} className={`filter ${boxOfficeFilter === filter ? 'text-white' : 'text-[#6D707A]'}`}>
                            <button onClick={() => handleFilter(filter)}>
                                {filter}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="flex w-full justify-between max-LaptopL:grid grid-cols-3 max-md:grid-cols-2 gap-y-[31px] max-md:gap-y-[21px] max-md:gap-x-[10px]"> 
            {sortedFilms.slice(0, windowWidth).map((boxOffice => 
                <div key={boxOffice.id} className=" relative h-[141.2px] max-LaptopL:h-[143.83px] max-lg:h-[128.78px] max-md:h-[109.82px] w-[256px] max-LaptopL:w-[260.77px] max-lg:w-[226px] max-md:w-full flex gap-[11.3px] max-md:gap-[8px]">
                    <img src={boxOffice.poster} className=" h-full rounded-[10px] cursor-pointer" alt=""/>
                    <div className="flex flex-col justify-center gap-[10px] max-lg:gap-[4px] max-md:gap-[2px]">
                        <h5 className="text-[15px] max-LaptopL:text-[13px] max-md:text-[7px] leading-[22.3px] max-md:leading-[9.23px] font-bold text-white">{boxOffice.name}</h5>
                        <p className="text-[#F2F60F] text-[15px] max-lg:text-[13px] max-md:text-[8px] leading-[18.11px] max-lg:leading-[15.69px] max-md:leading-[12px] font-medium">
                            ${formatNumber(getTotalBoxOffice(boxOffice, boxOfficeFilter))}</p>
                        <p className="text-[14px] max-lg:text-[12px] max-md:text-[7px] font-medium leading-[16.9px] max-lg:leading-[14.48px] max-md:leading-[8.48px] text-[#FFFFFF69]">
                            ${formatNumber(getTotalBoxOffice(boxOffice, boxOfficeFilter))} за 4 недели
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
}