import { useState, useEffect } from "react"
import { fetchPopulateActor } from "../../service/moviesService";

export function PopularActor() {
    const [popularActor, setPopularActor] = useState([]);
    const [selecterFilter, setSelecterFilter] = useState('За год');
    const getAgeString = (age) => {
        if (age % 10 === 1 && age % 100 !== 11) {
          return `${age} год`;
        } else if ((age % 10 >= 2 && age % 10 <= 4) && (age % 100 < 12 || age % 100 > 14)) {
          return `${age} года`;
        } else {
          return `${age} лет`;
        }
    };
    const getTimeFrame = (filter) => {
        const now = new Date();
        switch (filter) {
            case 'За неделю':
                return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
            case 'За месяц':
                return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            case 'За год':
            default:
                return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        }
    };
    const filterActors = popularActor.filter((actor) => {
        const actorDate = new Date(actor.timestamp);
        const timeFrame = getTimeFrame(selecterFilter);
        return actorDate >= timeFrame;
    });
    const handleFilter = (filter) => {
        setSelecterFilter(filter);
    }
    useEffect(() => {
        async function fetchData() {
            const data = await fetchPopulateActor();
            setPopularActor(data);
        };
        fetchData();
    }, []);
    
    return (
    <div className="mt-[65px] max-LaptopL:mt-[34px] max-lg:mt-[21px] max-md:mt-[29px]">
        <div className="container flex flex-col justify-between gap-[63px] max-lg:gap-[30px]">
            <div className=" w-full flex max-LaptopL:flex-col max-md:flex-row items-center max-LaptopL:items-start max-md:items-center max-LaptopL:gap-[8px] justify-between">
                <div>
                    <h2 className="max-md:text-[23px]">Популярные персоны</h2>
                </div>
                <div className="max-w-[295px] w-full max-md:hidden flex">
                    <ul className="flex flex-wrap items-center justify-center gap-x-[30px] max-md:gap-x-[15px] w-full ">
                        {['За год', 'За месяц', 'За неделю'].map((filter) => (
                            <li key={filter} className={`filter ${selecterFilter === filter ? 'text-white' : 'text-[#6D707A]'}`}>
                                <button onClick={() => handleFilter(filter)}>
                                    {filter}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden w-[14px] h-[11px] flex-col justify-between items-center max-md:flex">
                    <span className="bg-white h-[1px] w-full"></span>
                    <span className="bg-white h-[1px] w-full"></span>
                    <span className="bg-white h-[1px] w-full"></span>
                </div>
            </div>
            <div className="w-full  flex max-lg:flex-col gap-4 ">
                <div className="flex  w-full gap-[22.69px]">
                    {filterActors.slice(0, 2).map((actor, index) => (
                    <div key={actor.id} className="w-[444px] max-LaptopL:w-[264.17px] max-lg:w-[321.09px] max-MobileL:w-[179px] h-[444px] max-LaptopL:h-[297.17px] max-lg:h-[321.09px] max-MobileL:h-[179px] relative">
                        <img src={actor.picture} alt={actor.name} className="w-full h-full rounded-[10px] brightness-75" />
                        <div className="flex flex-col gap-2 absolute bottom-[13px] left-[13px]">
                            <h4 className="text-white font-bold text-[27px]  max-LaptopL:text-[20px] max-md:text-[15px]  leading-[33.45px] max-LaptopL:leading-[24.78px] max-md:leading-[18.58px]">{actor.name}</h4>
                            <p className=" text-[20px] font-semibold max-LaptopL:text-[15px]  max-md:text-[11px] leading-[24.46px] max-LaptopL:leading-[18.35px] max-md:leading-[13.45px] text-[#FFFFFF59]">{actor.name_en}</p>
                            <p className="text-[15px] max-lg:text-[12px] max-md:text-[10px] leading-[20px] max-md:leading-[12.07px] font-medium text-[#F2F60F]">{getAgeString(actor.age)}</p>
                        </div>
                        <span className="text-[15px] max-lg:text-[12px] max-md:text-[10px] leading-[20px] max-md:leading-[12.07px] font-medium text-[#F2F60F] absolute top-[12px] left-[16px]">{index + 1 } место</span> {/* Нумерация начинается с 1 */}
                    </div>
                    ))}
                </div>
                <div className="flex flex-col justify-around gap-[14px] max-LaptopL:gap-[8.3px] w-full bg-[#1B2133] rounded-[10px]">
                    {filterActors.slice(2, 6).map((actor, index) => (
                    <div key={actor.id} className={`flex justify-between items-start gap-1 border-b border-solid border-[#1E2538] rounded-md mx-[29px] pb-[21px] max-LaptopL:pb-[10px] ${index === popularActor.slice(2).length - 1 ? 'border-b-0' : ''} ${index === 0 ? 'mt-[17px]' : ''}`}>
                        <div className="flex flex-col items-start gap-1 ">
                            <h5 className="text-white font-bold text-[20px] max-LaptopL:text-[15px] leading-[24.78px] max-LaptopL:leading-[18.58px]">{actor.name}</h5>
                            <p className="text-[#3B486B] font-semibold text-[15px] max-LaptopL:text-[13.45px] max-lg:text-[11px] leading-[18.35px] max-LaptopL:leading-[13.45px] max-lg:leading-[13.45px] ">{actor.name_en}</p>
                            <p className="text-sm max-LaptopL:text-[11px] leading-[16.66px] max-LaptopL:leading-[13.09px] text-[#F2F60F] font-normal">{getAgeString(actor.age)}</p>
                        </div>
                        <span className="text-[15px] leading-[18.35px] font-medium text-[#F2F60F] whitespace-nowrap">{index + 3} место</span> {/* Нумерация начинается с 1 */}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)}