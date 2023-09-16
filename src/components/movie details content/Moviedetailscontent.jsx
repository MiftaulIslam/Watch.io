import PropTypes from 'prop-types'; // Import PropTypes
import { AiFillStar } from "react-icons/ai";
import { useSelector } from 'react-redux';

const Moviedetailscontent = ({data, movieid}) => {
  const {genres} = useSelector(state => state.home)

  return (
    <>
      <h3>{data?.original_title || data?.name}</h3>
                  <div className="tiny_info py-1">
                    <button>{data?.status}</button>
                    <button>Trailer</button>
                    <button>
                      <AiFillStar /> {data?.vote_average}
                    </button>
                    <button>{data?.runtime}</button>
                  </div>
                  <p>{data?.overview}</p>
                  <div className="details_of_movie">
                    <p>Release: {data?.release_date || data?.first_air_date}</p>
                    <p>
                      {movieid.mediaType === "tv"
                        ? `Seasons: ${data?.number_of_seasons}`
                        : " "}
                    </p>
                    <p>
                      {movieid.mediaType === "tv"
                        ? `Episods: ${data?.number_of_episodes}`
                        : " "}
                    </p>
                    <p>Genres: {data?.genres && data?.genres.map(item => (
            <span key={item?.id}>{genres[item?.id] ? genres[item?.id]?.name : ''} </span>
          ))} </p>
                    <p>
                      Country: {data?.production_countries.map((contry, index) => (
                        <span key={index}>{contry.name} </span>
                      ))}
                    </p>
                    <p>
                      Production: {data?.production_companies.map((contry, index) => (
                        <span key={index}>{contry.name} </span>
                      ))}
                    </p>
                  </div>
    </>
  )
}
Moviedetailscontent.propTypes = {
    data: PropTypes.object, // Define the expected prop type here
    movieid: PropTypes.object, // Define the expected prop type here
  };
export default Moviedetailscontent
