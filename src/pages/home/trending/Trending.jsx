import { useEffect, useState } from "react";
import {
  Contentwrapper,
  Trendingmovies,
  Switchtimetabs,
  Switchtypetabs,
} from "../../../components/componentsIndex";
import { AiOutlineDown } from "react-icons/ai";
import "./Trending.scss";
import "../../../components/trending movies/trendingmovies.scss";
import { fetchDataFromAPI } from "../../../utils/api";
import Skeleton from "../../../components/skeleton/Skeleton";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  // For Type
  const [type, settype] = useState("all");
  // For time 
  const [time, setTime] = useState("day");
  // For increasing page
  const [pageno, setpageno] = useState(1);
  // For concatinate movies
  const [datas, setdatas] = useState([]);
// Loading bar
  const [loading, setloading] = useState(true);
  const navigate = useNavigate()
  // Secret api key
  const params = { apiKey: import.meta.env.VITE_TMDB_TOKEN };

// Function to lowercase 
function convertToLowerCase(inputString) {
    return inputString.toLowerCase();
  }
  // Fetching movies daccording to the time and type
  const fetching = async () => {
setloading(true)
    const response = await fetchDataFromAPI(
      `/trending/${type}/${time}?apiKey=${params}&page=${pageno}`
    );
    setloading(false)
    setdatas([...datas, ...response.results]);
  };
// Handle time change
  const ontimeChange = (timeType) => {
    setTime(convertToLowerCase(timeType));
    setpageno(1);
    if (timeType.toLowerCase() !== time) {
      setdatas([]);
    }
  };
  // Handle Type change
  const ontypeChange = (trendingType) => {
    settype(trendingType.toLowerCase());

    setpageno(1);
    if(trendingType.toLowerCase()!==type){
      setdatas([]);
    }

  };
  // Moving to another Page
  const nagivatetoDetails = (id, mediaType)=>{
navigate(`/${mediaType}/${id}`)
  }

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ["", type, time, pageno]);
  return (
    <>
      <div className="trending_section">
        
        <Contentwrapper>
          <div className="tabs_section">
            <h2>Trending</h2>
            <div className="tabs">
              <Switchtypetabs
                data={["All", "Movie", "Tv"]}
                ontypeChange={ontypeChange}
              />
              <Switchtimetabs
                data={["Day", "Week"]}
                ontimeChange={ontimeChange}
              />
            </div>
          </div>
          {!loading?(
                 <div className="movies_section">
            
                 {datas?.map((data) => (
          <div className="movie" onClick={()=>nagivatetoDetails(data.id, data.media_type)} key={data.id}>
           <Trendingmovies  data={data} />
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

export default Trending;
