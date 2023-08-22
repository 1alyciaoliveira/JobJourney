import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pricing from './Pricing';
import Payment from './Payment';

const Donnations = () => {
  return (

    <div className="container">
      <div className=" row">
        <button className="btn btn-warning">
          <div className="d-flex justify-content-center">
            <span>Support us!</span>
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

export default Donnations;
