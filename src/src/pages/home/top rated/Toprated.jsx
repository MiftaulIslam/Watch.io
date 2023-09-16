import { useEffect, useState } from "react";
import {
  Contentwrapper,
  Trendingmovies,
  Switchtypetabs,
} from "../../../components/componentsIndex";
import { AiOutlineDown } from "react-icons/ai";
import "../trending/Trending.scss";
import "../../../components/trending movies/trendingmovies.scss";
import { fetchDataFromAPI } from "../../../utils/api";
import Skeleton from "../../../components/skeleton/Skeleton";
import { useNavigate } from "react-router-dom";

const Toprated = () => {
  const [type, settype] = useState("movie");

  const [pageno, setpageno] = useState(1);
  const [datas, setdatas] = useState([]);
const [loading, setloading] = useState(true);

  const navigate = useNavigate()
  const params = { apiKey: import.meta.env.VITE_TMDB_TOKEN };
  const fetching = async () => {
setloading(true)
    const response = await fetchDataFromAPI(
      `/${type}/top_rated?apiKey=${params}&page=${pageno}`
    );

    setloading(false)
    setdatas([...datas, ...response.results]);
  
  };
  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ["", type, pageno]);

  const ontypeChange = (trendingType) => {
    settype(trendingType.toLowerCase());

    setpageno(1);
    if(trendingType.toLowerCase()!==type){
      setdatas([]);
    }

  };
  const nagivatetoDetails = (id, mediaType)=>{
navigate(`/${mediaType}/${id}`)
  }
  return (
    <>
      <div className="trending_section">
        
        <Contentwrapper>
          <div className="tabs_section">
            <h2>Top rated</h2>
            <div className="tabs">
              <Switchtypetabs
                data={[ "Movie", "Tv"]}
                ontypeChange={ontypeChange}
              />
            </div>
          </div>
          {!loading?(
                 <div className="movies_section">
            
                 {datas?.map((data) => (
          <div className="movie" onClick={()=>nagivatetoDetails(data.id, type)} key={data.id}>
           <Trendingmovies  data={data} genresId = {data.genre_ids}/>
         </div>
       ))}</div>
              ):(
                <>
    <div className="movies_section">
<div className="movie">
                <Skeleton />
                </div>
<div className="movie">
                <Skeleton />
                </div>
<div className="movie">
                <Skeleton />
                </div>
<div className="movie">
                <Skeleton />
                </div>
<div className="movie">
                <Skeleton />
                </div>
<div className="movie">
                <Skeleton />
                </div>
<div className="movie">
                <Skeleton />
                </div>

                </div>
                </>
              )}
       <div className="more_button_section">
       <button className="more_button"
          onClick={() => {
            setpageno(pageno + 1);
          }}
        >
          <AiOutlineDown/>
        </button>
       </div>
        </Contentwrapper>
      </div>
    </>
  );
};

export default Toprated;
