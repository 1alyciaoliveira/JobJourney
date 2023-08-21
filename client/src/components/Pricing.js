import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/Pricing.css";

const Pricing = () => {
    return (
        <div id="generic_price_table"  className="d-flex align-items-center justify-content-center">
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="price-heading clearfix">
                                <h1>Bootstrap Pricing Table</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <div className="generic_content clearfix">
                                <div className="generic_head_price clearfix">
                                    <div className="generic_head_content clearfix">
                                        <div className="head_bg"></div>
                                        <div className="head">
                                            <span>Basic</span>
                                        </div>
                                    </div>
                                    <div className="generic_price_tag clearfix">
                                        <span className="price">
                                            <span className="sign">$</span>
                                            <span className="currency">9</span>
                                            <span className="cent">.99</span>
                                            <span className="month">/MON</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="generic_feature_list">
                                    <ul>
                                        <li><span>2GB</span> Bandwidth</li>
                                        <li><span>150GB</span> Storage</li>
                                        <li><span>12</span> Accounts</li>
                                        <li><span>7</span> Host Domain</li>
                                        <li><span>24/7</span> Support</li>
                                    </ul>
                                </div>
                                <div className="generic_price_btn clearfix">
                                    <a className="" href="">Sign up</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Pricing;