import React, { Component } from "react";
import {Link}               from "react-router-dom";

import erro1Img             from "../../../assets/images/404.png"

class Error extends Component {
  render() {
    return (
        <>
            {/* ===============  breadcrumb area start =============== */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="breadcrumb-wrap">
                                <h2>404</h2>
                                <ul className="breadcrumb-links">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
                                        <i className="bx bx-chevron-right" />
                                    </li>
                                    <li>404</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===============  breadcrumb area end =============== */}
            <div className="error-wrapper pt-120">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Oops!</h1>
                        <div className="error-img">
                            <img src={erro1Img} alt="" className="img-fluid" />
                        </div>
                        <h2>That Page is Not Found.</h2>
                        <div className="error-btn">
                            <Link to={`${process.env.PUBLIC_URL}/`}>GO TO HOME</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }
}

export default Error;
