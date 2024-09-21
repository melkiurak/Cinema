import React, { useEffect, useState } from "react";
import { Header } from "./Components/header/header";
import { Footer } from "./Components/footer/footer";
import { HomePage } from "./Pages/Home/HomePage";
import { BillboardPage } from "./Pages/Billboard/BillboardPage";
import { Route, Routes, useLocation } from 'react-router-dom';
import { MovieDetails } from "./Pages/MovieDetalis/MovieDetails";
import backgroundMain from './assets/img/main_background.png';
import { fetchAllFilms } from "./service/moviesService";
import { Auth } from "./Pages/Auth/Auth";

export function Home() {
    const location = useLocation();
    const [films, setFilms] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(backgroundMain);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllFilms();
                setFilms(data);
            } catch (error) {
                console.error("Error fetching films:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        if (wrapper) {
            let opacity = '0.85';
          if (location.pathname === '/') {
            setBackgroundImage(backgroundMain);
          } else if (location.pathname.startsWith('/movies/')) {
            const encodedMovieName = location.pathname.split('/movies/')[1];
            const movieName = decodeURIComponent(encodedMovieName);
            const movie = films.find(film => film.name === movieName);
            if (movie) {
                setBackgroundImage(movie.background);
                opacity = '0.2'; 
            } else {
                console.error("Movie not found:", movieName);
                opacity = '0.85'; 
                setBackgroundImage(backgroundMain);
            }
          } else {
            setBackgroundImage('none');
          }
      
          wrapper.style.setProperty('--background-image', `url(${backgroundImage})`);
          wrapper.style.setProperty('--background-opacity', opacity);

        }
      }, [location.pathname, films, backgroundImage]);
      

    return (
        <div className={`wrapper`}>
            <Header/>
            <main className="mt-[51px] max-LaptopL:mt-[32px] max-lg:mt-[35px] max-md:mt-[20px] mb-[50px] max-LaptopL:mb-[46px] max-lg:mb-[28px] max-md:mb-[20px] ">
                <Routes>
                    <Route exact path="/" element={<HomePage/>} />
                    <Route path="/Billboard" element={<BillboardPage/>} />
                    <Route path="/movies/:movieName" element={<MovieDetails/>}/>
                    <Route path="/Auth" element={<Auth/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}
