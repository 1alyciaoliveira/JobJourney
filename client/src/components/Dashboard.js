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
  }, []);

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
