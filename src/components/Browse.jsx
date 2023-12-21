import useFetchMovieData from "../hooks/useFetchMovieData";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
const Browse = () => {
  useFetchMovieData();

  return (
    <>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
    </>
  );
};

export default Browse;
