import './explore.scss'
import { Contentwrapper, Trendingmovies } from '../../components/componentsIndex';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from '../../components/skeleton/Skeleton';
import { AiOutlineDown } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../../utils/api';
const Explore = () => {

 // For increasing page
 const [pageno, setpageno] = useState(1);
 // For concatinate movies
 const [moviesdata, setmoviesdata] = useState([]);
 const [tvdata, settvdata] = useState([]);
// Loading bar
 const [loading, setloading] = useState(true);
 const navigate = useNavigate()
 // Secret api key
 const params = { apiKey: import.meta.env.VITE_TMDB_TOKEN };
const {mediaType} = useParams()

 // Fetching movies daccording to the time and type
 const fetching = async () => {
setloading(true) 
setmoviesdata([])
settvdata([])
const response = await fetchDataFromAPI(
  `/discover/${mediaType}?apiKey=${params}&page=${pageno}`
);
setloading(false)
if (mediaType === 'movie') {
  setmoviesdata([...moviesdata, ...response.results]);
} else {
  settvdata([...tvdata, ...response.results]); // Update tvdata
}

  };
  console.log(`movie data is: ${moviesdata}`);
  console.log(`tv data is ${tvdata}`);


 useEffect(() => {
   fetching();
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, ["", pageno, mediaType]);
  return (
    <>
        <div className="trending_section" style={{padding:"4rem"}}>
        
        <Contentwrapper>
 
          {!loading?(
                 <div className="movies_section">
            {console.log(moviesdata)}
                 {mediaType === 'movie'?moviesdata.map((data) => (
          <div className="movie" onClick={()=>navigate(`/${mediaType}/${data.id}`)} key={data.id}>
           <Trendingmovies  data={data} />
         </div>
       )): tvdata.map((data)=>( <div className="movie" onClick={()=>navigate(`/${mediaType}/${data.id}`)} key={data.id}>
           <Trendingmovies  data={data} />
         </div>))}</div>
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
  )
}

export default Explore
