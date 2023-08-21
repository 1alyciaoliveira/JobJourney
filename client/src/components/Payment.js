import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/Payment.css";
import React from 'react';
function Payment() {
    return (
        <div className="payment">
            <div className="payment-title">
                <h1>Payment Information</h1>
            </div>
            <div className="payment-container preload">
                <div className="creditcard">
                    <div className="front">
                        {/* SVG code for the front of the credit card */}
                    </div>
                    <div className="back">
                        {/* SVG code for the back of the credit card */}
                    </div>
                </div>
            </div>
            <div className="form-container">
                <div className="field-container">
                    <label htmlFor="name">Name</label>
                    <input id="name" maxLength="20" type="text" />
                </div>
                <div className="field-container">
                    <label htmlFor="cardnumber">Card Number</label>
                    <span id="generatecard">generate random</span>
                    <input id="cardnumber" type="text" pattern="[0-9]*" inputMode="numeric" />
                    <svg id="ccicon" className="ccicon" width="750" height="471" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        {/* Placeholder for credit card icon */}
                    </svg>
                </div>
                <div className="field-container">
                    <label htmlFor="expirationdate">Expiration (mm/yy)</label>
                    <input id="expirationdate" type="text" pattern="[0-9]*" inputMode="numeric" />
                </div>
                <div className="field-container">
                    <label htmlFor="securitycode">Security Code</label>
                    <input id="securitycode" type="text" pattern="[0-9]*" inputMode="numeric" />
                </div>
            </div>
        </div>
    );
}

export default Payment;
