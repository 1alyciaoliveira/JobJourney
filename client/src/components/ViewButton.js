import React, { useState } from 'react';
import "../style/ViewButton.css";
const ViewButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
      <span className="slider"></span>
      <span className={`text ${isChecked ? 'on' : 'off'}`}>
        {isChecked ? 'On' : 'Off'}
      </span>
    </label>
  );
};

export default ViewButton;
