import React from 'react';

const Subscription = ({ onPricingClick }) => {
  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-success d-flex flex-column align-items-end" onClick={onPricingClick}>
        <div className="d-flex justify-content-center">
          <span>Become</span>
        </div>
        <div className="d-flex justify-content-center">
          <span>a member</span>
        </div>
      </button>
    </div>
  );
};

export default Subscription;
