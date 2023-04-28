import React, { Component } from "react";
import { Link } from "react-router-dom";

//Load Image

class Plan extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  goPlan() {
    window.location.assign(`${process.env.PUBLIC_URL}/PlanGenerator`);
  }

  render() {
    return (
      <>
        {/* ===============  Package  area start =============== */}
        <div className="offer-area pt-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div class="section-head pb-45">
                  <h2> Customize your Trip based on your Schedule</h2>
                </div>
                <div class="homePagePlan">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <h3 class="plan-title" style={{ fontsize:"60px" }}>The new way to plan your next trip</h3>
                      <p class="plan-text">Create a fully customized day by day
                        itinerary for free</p>
                      <button class="plan-button" onClick={() => this.goPlan()}>Start Planning</button>
                    </div>
                  </div>
                  <div>


                  

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        {/* ===============  Package  area end =============== */}
      </>
    );
  }
}

export default Plan;
