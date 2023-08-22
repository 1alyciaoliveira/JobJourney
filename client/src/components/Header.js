import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import logo from '../image/logo.png';
import CheckoutButton from './checkoutButton';


function Header(props) {

    const navigate = useNavigate();

    //Resizying style
    const [isIphone, setIsIphone] = useState(window.innerWidth <= 563);

    const handleResize = () => {
        setIsIphone(window.innerWidth <= 563);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, []);
    
    const handleLogout = () => {
        // Clear token and redirect to login page
        localStorage.removeItem('id_token');
        navigate('/'); // Redirect to the login page
    };

    // Check if screen width is less than or equal to iPhone width
    if (isIphone) {
        return (
            <div className="container-fluid bg-light text-black align-middle">
                <div className="row py-3">
                    <div className="col-12 text-center">
                        <div className="d-flex align-items-center justify-content-center mb-3">
                            <img src={logo} alt="JobJourney Logo" className="logo-image" />
                            <h2 className="mb-0 mt-2">JobJourney</h2>
                        </div>
                        <hr style={{ width: '100%', backgroundColor: '#ccc', margin: '20px 0' }} />
                        <div className="d-flex flex-row justify-content-center align-items-center card-font">
                            
                            
                            <UserProfile />
                            <CheckoutButton />
                            <button className="btn logout-btn" onClick={handleLogout}>
                                <span><i className="fas fa-sign-out-alt"></i></span> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

    } else {
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

    }




    
};
export default Header;


