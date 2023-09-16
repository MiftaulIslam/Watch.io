import PropTypes from "prop-types"; // Import PropTypes
import avatar from "../../assets/avatar.png";
import { useSelector } from "react-redux";
const Cast = ({ data }) => {
  const { url } = useSelector((state) => state.home);
  return (
    <>
      <div className="cast_contents">
        <div className="cast_image">
          <img
            src={
              data?.profile_path ? url.profileh632 + data.profile_path : avatar
            }
            alt=""
          />
        </div>

        <p>{`${data?.original_name || data?.name}`}</p>
      </div>
    </>
  );
};
Cast.propTypes = {
  data: PropTypes.object.isRequired, // Define the expected prop type here
};
export default Cast;
