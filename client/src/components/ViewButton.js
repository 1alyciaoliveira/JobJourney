import React, { useState } from 'react';
import "../style/ViewButton.css";

const ViewButton = ({ setShowTableDash }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    setShowTableDash(!isChecked); 
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
        <span className="slider"></span>
        <span className={`text ${isChecked ? 'on' : 'off'}`}>
          {isChecked ? 'Board' : 'Table'}
        </span>
      </label>
    </div>
  );
};

export default ViewButton;
