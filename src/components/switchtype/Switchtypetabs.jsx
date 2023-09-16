
import PropTypes from 'prop-types'; // Import PropTypes

import './switchtypetabs.scss';
import { useState } from 'react';

const Switchtypetabs = ({ data, ontypeChange }) => {

  const [left, setleft] = useState(0);
  const activeTab = (tab, index)=>{
setleft(index * 100)
ontypeChange(tab, index)
  }
  return (
    <>
      <div className="time_tabs">
        <div className="tab_items">
          {data.map((tab, index) => (
            <button key={index} onClick={()=>{activeTab(tab, index)}}  className="tab_item">
              {tab}
            </button>
          ))}
          <div className="movingbg" style={{left}}/>
        </div>
      </div>
    </>
  );
};

// Add PropTypes validation for data and onstateChange
Switchtypetabs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired, // Assuming data is an array of strings
  ontypeChange: PropTypes.func, // You can specify this if it's required
};

export default Switchtypetabs;
