import { Img } from "../componentsIndex";
import { AiFillStar } from "react-icons/ai";
import noPoster from '../../assets/no-poster.png'
import PropTypes from 'prop-types'; // Import PropTypes
import { useSelector } from "react-redux";

const Trendingmovies = ({data}) => {
  const {url, genres} = useSelector(state => state.home);

  // Check if data is defined before accessing its properties
  const voteAverage = data ? data?.vote_average?.toFixed(1) : '';

  // Check if data is defined before accessing its properties
  const movieName = data ? (
    (data.name?.length > 30 || data.title?.length > 30)
      ? `${(data.name || data.title).slice(0, 29)}...`
      : data.name || data.title
  ) : '';

  return (
    <>
      <div className="movies_section_image">
        <Img
          src={data && data.poster_path ? url.profileh632 + data.poster_path : noPoster}
        />
        <div className="genres">
          {data?.genre_ids?.map(item => (
            <p key={item}>{genres[item] ? genres[item]?.name : ''}</p>
          )) || []}
        </div>
      </div>
      <div className="movies_section_details">
        <div className="tiny_details">
          <div className="vote flex">
            <span>
              <AiFillStar
                color="yellow"
                size={"20px"}
              />
            </span>
            <span>{voteAverage}</span>
          </div>
          <div className={`adult_status flex ${data && data.adult ? "" : "none"}`}>
            <span>{data ? `${data.adult ? "18+" : ""}` : ''}</span>
          </div>
        </div>
        <div className="movie_name">
          <p>{movieName}</p>
        </div>
        <div className="release_date">
          {data ? (
            data.first_air_date || data.release_date || "NAN"
          ) : ''}
        </div>
      </div>
      <div className="view_button">
        <button>View More</button>
      </div>
    </>
  );
};

Trendingmovies.propTypes = {
  data: PropTypes.object.isRequired, // Define the expected prop type here
};

export default Trendingmovies;
