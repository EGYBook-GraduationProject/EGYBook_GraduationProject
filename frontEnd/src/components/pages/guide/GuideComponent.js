import React, { Component } from "react";
import {Link} from "react-router-dom";

import guide2Img from "../../../assets/images/guide/guide-2.png"
import guide3Img from "../../../assets/images/guide/guide-3.png"
import guide4Img from "../../../assets/images/guide/guide-4.png"
import guide5Img from "../../../assets/images/guide/guide-5.png"
import guide6Img from "../../../assets/images/guide/guide-6.png"
import guide7Img from "../../../assets/images/guide/guide-7.png"
import guide8Img from "../../../assets/images/guide/guide-8.png"
import guide9Img from "../../../assets/images/guide/guide-9.png"
import guide10Img from "../../../assets/images/guide/guide-10.png"
import guide11Img from "../../../assets/images/guide/guide-11.png"
import guide12Img from "../../../assets/images/guide/guide-12.png"

class GuideComponent extends Component {
  render() {
    return (
        <>
            {/* ===============  breadcrumb area start =============== */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="breadcrumb-wrap">
                                <h2>Tour Guide</h2>
                                <ul className="breadcrumb-links">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
                                        <i className="bx bx-chevron-right" />
                                    </li>
                                    <li>Tour Guide</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===============  breadcrumb area end =============== */}
            <div className="guide-wrapper pt-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide2Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>Ahmed Mohamed</strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide3Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>Ghina Mohamed</strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide4Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>Mark Hany</strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide6Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>David Nashaat </strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide7Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>Zain Youssef</strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide8Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>Maria Ibrahim</strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide9Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>Adam Ahmed</strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide10Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>Aysel Khaled</strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="guide-card">
                                <div className="guide-thumb">
                                    <img src={guide12Img} alt="" className="img-fluid" />
                                    <div className="guide-info">
                                        <strong>Youssef Ali</strong>
                                        <p>Tour Guide</p>
                                        <ul className="guide-links">
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-instagram" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-twitter" /></Link>
                                            </li>
                                            <li>
                                                <Link to={"#"}><i className="bx bxl-whatsapp" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }
}

export default GuideComponent;
