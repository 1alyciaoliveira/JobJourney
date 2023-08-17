import React, { useState }  from 'react';
import UserProfile from './UserProfile';
import logo from '../image/logo.png';

function Header(props) {

    const [showDashboard, setShowDashboard] = useState(false);
    const handleDashboardClick = () => {
        setShowDashboard(true);
    };

    return (
        <div className="container-fluid bg-dheader text-white">
            <div className="row py-3">
            <div className="col-12 text-center">
            <div className="d-flex align-items-center">
                <img src={logo} alt="JobJourney Logo" className="logo-image" />
                <h1 className="mb-4">JobJourney</h1>
            </div>
            </div>
            </div>
            
            <div className="row pb-3">
                <div className="col-4">
                    <button className="btn btn-warning me-2" onClick={() => props.setShowDashboard(true)}>Dashboard</button>
                </div>
                <div className="col-4 d-flex justify-content-center ">
                    
                        <UserProfile />                    
                    
                </div>
                <div className="col-4 d-flex justify-content-end ">
                    <button className="btn btn-warning me-2">Logout</button>
                </div>
            </div>
        </div>
    );
};
export default Header;