import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pricing from './Pricing';
import Payment from './Payment';

const Subscription = ({ onPricingClick }) => {
  return (

    <div className="container">
      <div className=" row">
        <button className="btn btn-warning" onClick={onPricingClick}>
          <div className="d-flex justify-content-center">
            <span>Subscribe</span>
          </div>
        </button>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Pricing />
        </div>
        <div className="col-md-6">
          <Payment />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
