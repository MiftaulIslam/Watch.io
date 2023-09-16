import { useEffect } from "react";
import "./App.css";
// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// For api calling
import { fetchDataFromAPI } from "./utils/api";
// State Store
import { getapiconfiguration, getgenres } from "./store/homeSlice";
// State calling and retrive values.
import {useDispatch } from "react-redux";
// Components
import { Header, Footer } from "./components/componentsIndex";
// Pages
import {
  Pagenotfound,
  Details,
  Explore,
  Home,
  Searchresult,
} from "./pages/pagesIndex";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    fetchImages();
    callingGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Getting Genres. Using the promise.all method to get both movie and tv genres at a same time. and both of them will be stored to the allGenres variable
  const callingGenres = async () => {
    try {
      const params = { apiKey: import.meta.env.VITE_TMDB_TOKEN };
      const promises = [];
      const endpoints = ["movie", "tv"];
      const allGenres = {};
      endpoints.forEach((url) => {
        return promises.push(fetchDataFromAPI(`/genre/${url}/list`, params));
      });
      const data = await Promise.all(promises);
      data.map((genres) => {
        genres.genres.map((item)=>{
          allGenres[item?.id]=item
        })
      });
      dispatch(getgenres(allGenres))

    } catch (error) {
      if (error){console.log(error);}
    }
  
   
  };
  // Fetching default URL of image
  const fetchImages = async () => {
    try {
      const params = { apiKey: import.meta.env.VITE_TMDB_TOKEN };

      const response = await fetchDataFromAPI("/configuration", params);

      const url = {
        backdrop: response.images.secure_base_url + "original",
        poster: response.images.secure_base_url + "original",
        profile: response.images.secure_base_url + "original",
        profileh632: response.images.secure_base_url + "h632",
      };
      dispatch(getapiconfiguration(url));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<Searchresult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
