import { ImEqualizer2 } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";

import logo from '../../../assets/img/logo.png';
import { useEffect, useState } from "react";
import { fetchAllActor, fetchAllFilms } from "../../../service/moviesService";
import { useNavigate } from "react-router-dom";
export function Search({onClose}) {
    const [film, setFilm] = useState([]);
    const [actors, setActors] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [filteredActors, setFilteredActors] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);

        const filteredFilmsList = film.filter(f =>
            f.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        const filteredActorsList = actors.filter(a =>
            a.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        setFilteredFilms(filteredFilmsList);
        setFilteredActors(filteredActorsList);
    }
    const handleFilmInfo = (filmName) => {
        navigate(`/movies/${filmName}`);
        window.scrollTo(0, 0);
        onClose();
    };
    useEffect(() => {
        async function fetchData() {
            const data = await fetchAllFilms();
            setFilm(data);
            setFilteredFilms(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchDataActors() {
            const data = await fetchAllActor();
            setActors(data);
            setFilteredActors(data);
        }
        fetchDataActors();
    }, []);
    useEffect(() => {
        if(search){
            document.body.classList.add('fixed-position');
        } else {
            document.body.classList.remove('fixed-position');
        }
        return () => {
            document.body.classList.remove('fixef-position');
        };
    }, [search])
    return <div className="w-[874px] max-lg:w-[584px] max-md:w-[340px] h-full relative mt-2  flex justify-center">
        <div className="w-[815px] max-lg:w-[530px] max-md:w-[265px] flex flex-col items-center gap-[70px]">
            <div className="w-[148px] h-[31px]">
                <img src={logo} alt='' className="w-full h-full" />
            </div>
            <div className="w-full h-[71px] max-md:h-[50px] relative ">
                <input  className="w-full h-full rounded-[10px] text-[20px] leading-[33.3px] font-medium text-[#151A26] focus:outline-none pl-3"  type="text" value={search} onChange={handleInputChange} />
                <div  className="absolute right-[10px] top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <button className="w-6  max-md:w-4 h-6 max-md:h-4"><ImEqualizer2 className="h-full w-full"/></button>
                    <button className="w-[55px]  max-md:w-[30px] h-[52px] max-md:h-[30px] bg-[#F2F60F] rounded-[10px] flex items-center justify-center"><IoIosSearch className="h-[20px] max-md:h-[10px] w-[28px] max-md:w-[10px]"/></button>
                </div>
            </div>
            {search && (
                <div className="w-full  overflow-y-auto custom-scrollbar  pr-2">
                        <div className="flex flex-col gap-2">
                            <h5 className="text-[22px] max-md:text-[18px] leading-[26.91px] max-md:leading-[22.91px] font-semibold text-white">Фильмы</h5>
                            {filteredFilms.map(film => (
                                <div key={film} className="bg-[#1E2538] relative rounded-[10px] w-full flex justify-between items-center pl-3 pr-[30px] h-[137px] max-md:gap-2" onClick={() => handleFilmInfo(film.name)} onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      handleFilmInfo(film.name);
                                    }
                                  }}>
                                    <div className="flex items-center gap-5">
                                        <img className="w-[78px] max-md:w-[50px] h-[107px] max-md:h-[81px] rounded-[10px]" src={film.poster} alt="" />
                                        <div className=" flex flex-col gap-[5px] max-md:gap-[2px]">
                                            <h6 className="text-[20px] max-md:text-[10px] font-bold  text-white">{film.name}</h6>
                                            <p className="text-[14px] max-md:text-[8px] font-medium  text-[#FFFFFFB2]">{film.name}</p>
                                            <p className="text-[12px] max-md:text-[6px]  text-[#F2F60F]">   {Array.isArray(film.genres) ? film.genres.join(', ') : 'Unknown'}</p>
                                        </div>
                                    </div>
                                    <div className={` max-w-[62.28px] max-lg:max-w-[44px] max-md:max-w-[28px] w-full rounded-[5px] h-[33.21px] max-lg:h-[24px] max-md:h-[18px] flex justify-center items-center   ${film.rating > 5 ? 'bg-[#4BCB36]' : 'bg-[#CB3F36]'}`}>
                                        <p className="RatingFilm max-md:text-[12px]">{film.rating}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="text-[22px] max-md:text-[18px] leading-[26.91px] max-md:leading-[22.91px] font-semibold text-white">Фильмы</h5>
                            {filteredActors.map(actors => (
                                <div key={actors} className="bg-[#1E2538] relative rounded-[10px] w-full flex justify-between items-center pl-3 pr-[30px] h-[137px]">
                                    <div className="flex items-center gap-5">
                                        <img className="w-[78px] max-md:w-[50px] h-[107px] max-md:h-[81px] rounded-[10px] object-cover" src={actors.img} alt="" />
                                        <div className=" flex flex-col gap-[5px]  max-md:gap-[2px]">
                                            <h6 className="text-[20px] max-md:text-[10px] font-bold  text-white">{actors.name}</h6>
                                            <p className="text-[14px] max-md:text-[8px] font-medium  text-[#FFFFFFB2]">{actors.name}</p>
                                            <p className="text-[12px] max-md:text-[6px]  text-[#F2F60F]">{actors.type}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
            )}
        </div>
        <button className="absolute top-[133px] max-md:top-[118px] right-0 max-md:right-1 w-5 h-5" onClick={() => onClose()}><RxCross1 className="w-full h-full text-white"/></button>
    </div>
}