import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Board from './Board';
import ViewButton from './ViewButton';
import TableDash from './TableDash';

function Dashboard() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showTableDash, setShowTableDash] = useState(false);

  useEffect(() => {
    setShowDashboard(true);
    
    // Check if the view was stored in local storage and set it accordingly
    const storedView = localStorage.getItem('activeView');
    if (storedView === 'tableDash') {
      setShowTableDash(true);
    } else {
      setShowTableDash(false);
    }

  }, []);

  // Handle toggle view function
  const handleViewToggle = (view) => {
    if (view === 'tableDash') {
      setShowTableDash(true);
      localStorage.setItem('activeView', 'tableDash');
    } else {
      setShowTableDash(false);
      localStorage.setItem('activeView', 'board');
    }
  };

  

  return (
    <div>
      <Header setShowDashboard={setShowDashboard} />
      {showDashboard ? (
        <>
          <Main />
          <ViewButton setShowTableDash={setShowTableDash} />
          {showTableDash ? <TableDash /> : <Board />}
        </>
      ) : null}
    </div>
  );
}

export default Dashboard;
