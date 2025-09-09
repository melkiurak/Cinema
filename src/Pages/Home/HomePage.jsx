import React from "react";
import { NewFilm } from "../../Components/NewFilm/newFilm";
import { Trailer } from "../../Components/Trailer/trailer";
import { PopularFilm } from "../../Components/PopularFilm/popularFilm";
import { PopularActor } from "../../Components/PopularActor/PopularActor";
import { News } from "../../Components/News/News";
export function HomePage() {
    return <>
        <NewFilm/>
        <Trailer/>
        <PopularActor/>
        <PopularFilm/>
        <News/>
    </> 
}