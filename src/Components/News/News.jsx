import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { fetchNews } from "../../service/moviesService";

export function News() {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [windowWidth, setWindowWidth] = useState(() => {
        if(window.innerWidth < 768){
            return 2;
        } else if(window.innerWidth < 1024){
            return 3;
        } else {
            return 4;
        }
    });
    useEffect(() => {
        async function fetchData() {
            const data = await fetchNews();
            setNews(data);
        }
        fetchData();
    }, []);
    useEffect(() => {
        if(news.length > 0){
            setSelectedNews(news[0]);
        }
    }, [news]);
    useEffect(() => {
        function handleNews() {
            let widthCategory;
            if(window.innerWidth < 768){
                widthCategory = 2;
            } else if(window.innerWidth < 1024){
                widthCategory = 3;
            } else {
                widthCategory = 4;
            }
            setWindowWidth(widthCategory);
        }
        window.addEventListener("resize", handleNews);
        return () => window.removeEventListener("resize", handleNews);
    }, []);
    return (
        <div className="mt-[65px] max-LaptopL:mt-[43px] max-lg:mt-[33px] max-md:mt-[29px]">
            <div className="container flex flex-col gap-[76px] max-LaptopL:gap-[15px]">
                <div className="w-full flex max-md:flex-col justify-between items-center">
                    <h2 className="max-md:text-[28px]">Последние новости</h2>
                    <button className="text-white flex items-center max-w-[176px] max-LaptopL:max-w-[161px] max-lg:max-w-[150px] w-full justify-between h-[27px]">
                        <span className="font-bold text-[22px] max-LaptopL:text-[18px] leading-[27.26px] max-LaptopL:leading-[22.3px]">Все новости</span>
                        <GoArrowRight className="text-xl" />
                    </button>
                </div>
                <div className="w-full flex max-LaptopL:flex-col gap-[15px]">
                    <div>
                        {selectedNews && (
                            <div className="relative h-full">
                                <img src={selectedNews.img} alt={selectedNews.name} className="h-full rounded-[10px] brightness-[.8]" />
                                <div className="absolute h-full flex flex-col justify-between top-0 left-0 py-[37px] max-md:py-[20px] px-[34px] max-md:px-[10px]" >
                                    <time className="font-bold text-[15px] max-md:text-[12px] leading-[28.68px] max-md:leading-[22.94px] text-white" dateTime="2024-08-25">{selectedNews.data}</time>
                                    <div className="flex flex-col gap-[14px]">
                                        <h3 className="max-md:text-[20px]">{selectedNews.title}</h3>
                                        <p className="font-medium text-[20px] max-LaptopL:text-[18px] max-lg:text-[16px] text-white leading-[34.04px] max-LaptopL:leading-[30.64px] max-lg:leading-[25.55px] max-md:hidden">{selectedNews.content}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col  max-LaptopL:flex-row gap-[13.53px] relative">
                        {news.slice(0, windowWidth).map((news => 
                            <button key={news.id} onClick={() => setSelectedNews(news)} className="w-[254.8px] max-LaptopL:w-[205.84px] h-[182.65px] max-LaptopL:h-[147.55px] relative block">
                                <img src={news.img} alt={news.name}  className="w-full h-full object-cover rounded-[10px] brightness-50" />
                                {selectedNews === news && (
                                    <div className="absolute inset-0 z-30 rounded-[10px] flex justify-center items-center">
                                        <div className="absolute inset-0 bg-[#3657CB] opacity-[0.65] rounded-[10px]"></div>
                                        <button className="border-2 border-solid border-white bg-transparent rounded-[10px] text-[18px] max-LaptopL:text-[15px] max-md:text-[13px] leading-[29.97px] max-LaptopL:leading-[24.98px] max-md:leading-[21px] font-bold text-white px-[26px] max-LaptopL:px-[21px] max-md:px-[11px] py-[11px] max-LaptopL:py-[9px] max-md:py-[8px] z-40">
                                            Читать новость
                                        </button>
                                  </div>
                                )}
                                <div className={`h-full flex flex-col justify-between py-[20px] absolute top-[2px] left-[18px] bottom-5 items-start ${selectedNews === news ? 'hidden' : ''}`}>
                                    <time dateTime="2024-08-25" className="font-bold text-[15px] max-md:text-[12px] leading-[28.68px] max-md:leading-[22.94px] text-white truncate-lines">{news.data}</time>
                                    <h5 className="text-[18px] max-LaptopL:text-[15px] max-md:text-[13px] font-black leading-[22.93px] max-LaptopL:leading-[19.11px] max-md:leading-[16.56px] text-white ">{news.title}</h5>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}