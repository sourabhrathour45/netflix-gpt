import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addVideoTrailer } from "../utils/features/movieSlice";
import { useDispatch } from "react-redux";

const useFetchMovieTrailer = (movieId)=>{

    const dispatch = useDispatch()
    const fetchMovieTrailer = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/"+movieId+"/videos",
          API_OPTIONS
        );
        const json = await data.json();
        console.log(json?.results);
        const videoList = json?.results;
        const trailerList = videoList.filter(
          (video) => video.type === "Trailer" || video.type === "Official Trailer"
        );
        dispatch(addVideoTrailer(trailerList))
      
       
      };
    
      useEffect(() => {
        fetchMovieTrailer();
      }, []);

}

export default useFetchMovieTrailer;

