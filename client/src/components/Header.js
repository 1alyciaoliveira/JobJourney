import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import logo from '../image/logo.png';

function Header(props) {

    const navigate = useNavigate();

    return (
        <div className="container-fluid bg-light text-black align-middle">
            <div className="row py-3">
                <div className="col-12 text-center d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="JobJourney Logo" className="logo-image" />
                        <h1 className="mb-4 mt-4 align-center">JobJourney</h1>
                    </div>
                <div className="d-flex align-items-center">
                    <button className="btn" onClick={() => props.setShowDashboard(true)}><span><i class="fas fa-home"></i></span>   Dashboard</button>
                    <UserProfile />
                    <button className="btn"  onClick={handleLogout}><span><i class="fas fa-sign-out-alt"></i></span>   Logout</button>
                </div>
                </div>
            </div>
        </div>
    );
};
export default Header;
