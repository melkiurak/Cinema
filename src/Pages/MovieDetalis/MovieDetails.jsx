import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { MovieDetailsInfo } from "../MovieDetalis/MovieDetalisInfo/MovieDetalisInfo";
import { MovieComments } from "./Comments/MovieComments";
import { fetchAllFilms } from "../../service/moviesService";
import { useDispatch, useSelector } from "react-redux";
import { setFilms } from "../../Redux/actions/actions";
export function MovieDetails() {
    const { movieName } = useParams();
    const dispatch = useDispatch();
    const films = useSelector(state => state.films.films);
     const currentFilm = films.find(film => film.name === movieName);

     useEffect(() => {
         async function fetchData() {
             const data = await fetchAllFilms();
             dispatch(setFilms(data)); 
         }
         fetchData();
     }, [dispatch]);

    return (
        <div className="container relative ">
            { currentFilm ? (
                <>
                    <MovieDetailsInfo film={currentFilm}/>
                    <MovieComments film={currentFilm}/>
                </>
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
}