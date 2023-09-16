import { useParams } from "react-router-dom";
import "./details.scss";
import { useSelector } from "react-redux";
import { Cast, Moviedetailscontent,  Contentwrapper, Recomendation  } from "../../components/componentsIndex";

import ReactPlayer from "react-player";
import Img from "./../../components/lazyload/img";
import useFetch from "../../hooks/useFetch";
import noPoster from "../../assets/no-poster.png";

const Details = () => {

  const params = { apiKey: import.meta.env.VITE_TMDB_TOKEN };
  const movieId = useParams();
  // Taking image from redux for backdrop
  const { url } = useSelector((state) => state.home);

  // Fetch movie details from TMDB
  const { data } = useFetch(`/${movieId.mediaType}/${movieId.id}`, params);


  // Fetch Credits details from TMDB
  const credits = useFetch(
    `/${movieId.mediaType}/${movieId.id}/credits`,
    params
  );
    // Slicing the best casts
  const topCast = credits.data?.cast.slice(0, 50);
  // Get videos from TMDB
  const youtubeEndpoint = "https://www.youtube.com/watch?v=";
  const videos = useFetch(`/${movieId.mediaType}/${movieId.id}/videos`, params);
  // Fetch Recomendations from TMDB
  const recomendation = useFetch(`/${movieId.mediaType}/${movieId.id}/recommendations`);

  return (
    <>
      <div className="get_details">
        <div className="backdrop_image">
          <Img
            src={data?.backdrop_path ? url.backdrop + data.backdrop_path : noPoster}
          />
        </div>
        <div className="movie_details_section">
          <Contentwrapper>
            <div className="get_details_content">
              <div className="all_contents">
                <div className="movie_details">
                  <div className="movie_poster">
                    <img
                      src={
                        data?.backdrop_path
                          ? url.profileh632 + data.poster_path
                          : noPoster
                      }
                      alt=""
                    />
                  </div>
                  <div className="movie_contents">
                    <Moviedetailscontent data={data} movieid={movieId} />
                  </div>
                </div>

                <div className="top_casts">
                  <h4 className="py-3">Casts</h4>
                  {topCast &&
                    topCast.map((cast, index) => (
                      <div className="cast_details" key={index}>
                        <Cast data={cast} />
                      </div>
                    ))}
                </div>
              </div>
              <div className="movie_video_section">
                <h4>Check Videos</h4>
                {videos &&
                  videos?.data?.results.map((video, index) => (
                    <div key={index} className="movie_videos">
                      <ReactPlayer
                        url={`${youtubeEndpoint}${video.key}`}
                        style={{ display: "inline-block" }}
                        controls={true}
                        light={false}
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>
                  ))}
              </div>
              <div className="recomendation_section">
                <h4>Recomendation</h4>
                {recomendation.data &&
                  recomendation.data?.results.map((datas) => (
                   <Recomendation key={datas?.id} data = {datas}/>
                  ))}
              </div>
            </div>
          </Contentwrapper>
        </div>
      </div>
    </>
  );
};

export default Details;
