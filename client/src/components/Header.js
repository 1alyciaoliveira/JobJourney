import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import logo from '../image/logo.png';
import CheckoutButton from './checkoutButton';

function Header(props) {

    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Clear token and redirect to login page
        localStorage.removeItem('id_token');
        navigate('/'); // Redirect to the login page
    };

    return (
        <div className="container-fluid bg-light text-black align-middle">
            <div className="row py-3">
                <div className="col-12 text-center d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <button className="btn" onClick={() => window.location.reload()}>
                            <div className="d-flex align-items-center">
                                <img src={logo} alt="JobJourney Logo" className="logo-image" />
                                <h2 style={{ color: '#354f52' }} className="mb-4 mt-4 align-center">JobJourney</h2>
                            </div>
                        </button>
                    </div>
                <div className="d-flex align-items-center card-font">
                    <UserProfile />
                    <CheckoutButton />
                    <button className="btn"  onClick={handleLogout}><span><i className="fas fa-sign-out-alt"></i></span>   Logout</button>
                </div>

                </div>
            </div>
        </div>
    );
};
export default Header;
