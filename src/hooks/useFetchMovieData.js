import { useEffect } from "react";
import { API_OPTIONS,API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/features/movieSlice";



const useFetchMovieData = ()=>{
    const dispatch = useDispatch()

    const fetchMovieData = async ()=>{
        const data = await fetch(API_URL,API_OPTIONS)
        const json = await data.json();
        console.log(json.results)
        dispatch(addNowPlayingMovies(json.results))
    }
    
    useEffect(()=>{
     fetchMovieData();
    },[])
}

export default useFetchMovieData