import '../trending movies/trendingmovies.scss'
import { Img } from "../componentsIndex";

import noPoster from '../../assets/no-poster.png'

const Skeleton = () => {

  return (
    <>
      
     
              <div className="movies_section_image skeleton">
                <Img
                  src={
                    noPoster
                  }
                />
              </div>
              <div className="movies_section_details">
              
                <div className="movie_name skeleton">
                  <p></p>
                </div>
                <div className="release_date skeleton">
 
                </div>
              </div>
                
            
    </>
  );
};

export default Skeleton;
