import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types'; // Import PropTypes
import noPoster from "../../assets/no-poster.png";
import Img from "./../../components/lazyload/img";
import { useNavigate } from "react-router-dom";
const Recomendation = ({data}) => {
    const {url, genres} = useSelector(state=>{return state.home})
const navigate = useNavigate() 
const movieName = (data?.name?.length > 30 || data?.title?.length > 30 || data?.original_title?.length > 30)
// eslint-disable-next-line no-unsafe-optional-chaining
? `${(data?.name || data?.title).slice(0, 29)}...`
: data?.name || data?.title;
  return (
    <>
       <div className="reconmendation_item" onClick={()=>navigate(`/${data.media_type}/${data.id}`)}>
                      <div className="recomendation_item_image">
                        <Img
                          src={data?.poster_path?
                              url.profileh632 + 
                            data?.poster_path : noPoster
                          }
                        />
                         <div className="genres">
                   {data?.genre_ids.map((item)=>(
                <p key={item}>{genres[item]?genres[item]?.name:''}</p>
              ))}

                </div>
                      </div>
                     
                      <div className="recomendation_item_content">
                        <div className="tiny_details">
                          <div className="vote flex">
                            <AiFillStar color="yellow" /> <span>{data?.vote_average.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="recomendation_movie_name">
                          <p>{movieName}</p>
                          {/* <p>{data?.original_title || data?.title || data.name}</p> */}
                        </div>
                        <div className="date">{data.first_air_date || data.release_date ? data.first_air_date || data.release_date: "NAN"}</div>
                      </div>
                      <div className="view_button">
                        <button>View More</button>
                      </div>
                    </div>
    </>
  )
}
Recomendation.propTypes = {
    data: PropTypes.object.isRequired, // Define the expected prop type here
  };
export default Recomendation
