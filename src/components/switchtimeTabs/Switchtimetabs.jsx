
import PropTypes from 'prop-types'; // Import PropTypes

import './switchtimetabs.scss';
import { useState } from 'react';

const Switchtimetabs = ({ data, ontimeChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [selectTab, setselectTab] = useState(0);
  const [left, setleft] = useState(0);
  const activeTab = (tab, index)=>{
setleft(index * 100)
ontimeChange(tab, index)
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
Switchtimetabs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired, // Assuming data is an array of strings
  ontimeChange: PropTypes.func, // You can specify this if it's required
};

export default Switchtimetabs;
