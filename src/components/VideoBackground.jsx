import { useSelector } from "react-redux";
import useFetchMovieTrailer from "../hooks/useFetchMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((state) => state.movies.trailerVideo);

  useFetchMovieTrailer(movieId);

  if (!trailerVideo) return;
  return (
    <>
      <div className="">
        <iframe
          className="w-full aspect-video"
          src={"https://www.youtube.com/embed/" + trailerVideo[0].key + "?autoplay=1&mute=1&rel=0"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          
        
          
        ></iframe>
      </div>
    </>
  );
};

export default VideoBackground;
