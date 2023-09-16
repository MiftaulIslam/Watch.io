import { useEffect, useState } from 'react';
import "../../pages/home/trending/Trending.scss";
import "../../components/trending movies/trendingmovies.scss";
import './searchresult.scss'
import './searchresult.scss'
import { fetchDataFromAPI } from '../../utils/api';
import ResponsivePagination from 'react-responsive-pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { Contentwrapper, Trendingmovies } from '../../components/componentsIndex';
import Skeleton from '../../components/skeleton/Skeleton';
const Searchresult = () => {
  const [datas, setdatas] = useState([]);
  const [loading, setloading] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
const {query} = useParams()
console.log(query);
  const searchresultFetch = async ()=>{
    setloading(true)
    const response =await fetchDataFromAPI(`/search/multi?query=${query}&api_key=66461bed76fe1c6befe815dfdc41b88e&page=${currentPage}`)
    setdatas(response)
setloading(false)
  }
  function handlePageChange(page) {
    setcurrentPage(page);
  }
  const totalPages = datas?.total_pages
  console.log(totalPages);
  useEffect(() => {
    searchresultFetch()
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentPage]);
  console.log(datas);
  const navigate = useNavigate()
  
  return (
    <>
        <div className="trending_section pt-10">
        
        <Contentwrapper>
            <h2 className='text-white'>Searched: {query}</h2>
              <div className="page">
      <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={page => handlePageChange(page)}
    />
      </div>
      
          {!loading?(
                 <div className="movies_section">

                 {datas?.results.map((data) => (
          <div className="movie"onClick={()=>navigate(`/${data?.media_type}/${data?.id}`)} key={data.id}>
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

        </Contentwrapper>
      </div>
  
    </>
  )
}

export default Searchresult
