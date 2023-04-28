import React, { Component } from "react";
import {Link} from "react-router-dom";
class Faq extends Component {
  render() {
    return (
        <div>
            {/* ===============  breadcrumb area start =============== */}
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="breadcrumb-wrap">
                                <h2>FAQ</h2>
                                <ul className="breadcrumb-links">
                                    <li>
                                        <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
                                        <i className="bx bx-chevron-right" />
                                    </li>
                                    <li>FAQ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===============  breadcrumb area end =============== */}
            {/* ===============  faq wrapper start =============== */}
            <div className="faq-wrapper pt-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="faq-wrap">
                                <div className="accordion-box">
                                    <h5>General Question</h5>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                How do I report an error?<i className="bx bx-chevron-down" />

                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                If the accommodation, location, or room type you have received is incorrect, or you are experiencing any other issues regarding your booking that you believe are an error, please <a href={`${process.env.PUBLIC_URL}/contact`}>contact us</a>.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                How can I submit a review or feedback on my stay? <i className="bx bx-chevron-down" />
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                You can share your experience with other travelers and review the property directly at the booking site.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                What payment methods are accepted? <i className="bx bx-chevron-down" />

                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                Credit cards, Master cards, Skrill, Stripe and Paypal.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-box pt-40">
                                    <h5>Financial Topics</h5>
                                    <div className="accordion" id="accordionExample2">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingFive">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                                How to cancel or change my reservation? <i className="bx bx-chevron-down" />
                                                </button>
                                            </h2>
                                            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample2">
                                                <div className="accordion-body">
                                                    To cancel or change your reservation, please contact the booking site directly. You can find the booking sites contact details in your verification email.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <form>
                                <div className="ask-inputs">
                                    <h5>Ask Any Question</h5>
                                    <input type="text" placeholder="Your Full Name" />
                                    <input type="email" placeholder="Your Email" />
                                    <input type="text" placeholder="Phone" />
                                    <textarea cols={30} rows={7} placeholder="Message" defaultValue={""} />
                                    <input type="submit" defaultValue="Ask Question" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* ===============  faq wrapper end =============== */}
        </div>
    );
  }
}

export default Faq;
