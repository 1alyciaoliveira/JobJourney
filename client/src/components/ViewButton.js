import React, { useState, useEffect } from 'react';
import "../style/ViewButton.css";

const ViewButton = ({ setShowTableDash }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Check if the active view was stored and set it accordingly
    const storedView = localStorage.getItem('activeView');
    setIsChecked(storedView === 'tableDash');
    setShowTableDash(storedView === 'tableDash');
  }, [setShowTableDash]);

  const toggleSwitch = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    localStorage.setItem('activeView', newChecked ? 'tableDash' : 'board');
    setShowTableDash(newChecked);
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
        <span className="slider"></span>
        <span className={`text ${isChecked ? 'on' : 'off'}`}>
          {isChecked ? 'Table' : 'Board'}
        </span>
      </label>
    </div>
  );
};

export default ViewButton;

