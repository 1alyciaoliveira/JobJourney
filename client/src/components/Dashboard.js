import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Board from './Board';
import ViewButton from './ViewButton';
import TableDash from './TableDash';
import Auth from '../utils/auth';
import Pricing from './Pricing';
import Payment from './Payment';
import Subscription from './Subscription';

function Dashboard() {
  const navigate = useNavigate();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showTableDash, setShowTableDash] = useState(false);

  useEffect(() => {
    const token = Auth.getToken();

    if (!token) {
      // Redirect to login if user is not logged in
      navigate('/');
    } else {
      setShowDashboard(true);

      // Check if the view was stored in local storage and set it accordingly
      const storedView = localStorage.getItem('activeView');
      if (storedView === 'tableDash') {
        setShowTableDash(true);
      } else {
        setShowTableDash(false);
      }
    }
  }, [navigate]);

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
          <Subscription/>
          <Pricing/>
          <Payment/>
          <ViewButton setShowTableDash={setShowTableDash} />
          {showTableDash ? <TableDash /> : <Board />}
        </>
      ) : null}
    </div>
  );
}

export default Dashboard;
