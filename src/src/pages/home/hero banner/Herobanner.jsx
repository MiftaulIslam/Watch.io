import { useState, useEffect } from "react";
import "./herobanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { Img, Contentwrapper } from "../../../components/componentsIndex";
import noImage from '../../../assets/no-poster.png'
const Herobanner = () => {
  const [background, setbackground] = useState("");
  const [query, setquery] = useState("");

  const navigate = useNavigate();
  const { url } = useSelector((state) => {
    return state.home;
  });
  const params = { apiKey: import.meta.env.VITE_TMDB_TOKEN };
  const { data, loading } = useFetch("/movie/upcoming", params);

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setbackground(bg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const searchqueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <>
      <div className="herobanner">
        {!loading && (
          <div className="backdrop_image">
            <Img src={background ? background : noImage} />
          </div>
        )}
		<div className="opacity_layer"></div>
        <Contentwrapper>
          <div className="herobanner_content">
            <h1 className="herobanner_title">Welcome To Movix</h1>
            <p className="herobanner_sub_title">
              Millions of movies, TV shows to discover. Explore Now
            </p>
          </div>
          <div className="herobanner_search_input">
            <input
              type="text"
            //   onKeyUp={searchqueryHandler}
              onChange={(event) => setquery(event.target.value)}
              placeholder="Search for movies or tv shows..."
            />
            <button onClick={searchqueryHandler}>Search</button>
          </div>
        </Contentwrapper>
      </div>
    </>
  );
};

export default Herobanner;
